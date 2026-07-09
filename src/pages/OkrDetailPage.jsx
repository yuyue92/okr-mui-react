import React from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import RiskChip from '../components/RiskChip.jsx'
import ConfidenceChip from '../components/ConfidenceChip.jsx'
import KrProgress from '../components/KrProgress.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useOkr } from '../context/OkrContext.jsx'
import {
  calcObjectiveProgress,
  findObjectiveById,
  formatDate,
  getLevelLabel,
  getStatusLabel
} from '../utils/okrUtils.js'

export default function OkrDetailPage() {
  const { objectiveId } = useParams()
  const {
    objectives,
    getUser,
    getDepartment,
    updateKrValue,
    updateObjectiveRisk,
    addCheckIn,
    addComment
  } = useOkr()
  const objective = findObjectiveById(objectives, objectiveId)
  const [checkIn, setCheckIn] = React.useState({ summary: '', nextPlan: '', confidence: 'medium', risk: 'yellow' })
  const [comment, setComment] = React.useState('')

  if (!objective) {
    return <EmptyState title="没有找到这个 OKR" description="可能是 mock 数据已刷新，或链接中的目标 ID 不存在。" />
  }

  const owner = getUser(objective.ownerId)
  const department = getDepartment(objective.departmentId)
  const aligned = findObjectiveById(objectives, objective.alignedToObjectiveId)
  const progress = calcObjectiveProgress(objective)

  const updateCheckInField = (field) => (event) => {
    setCheckIn((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const submitCheckIn = () => {
    if (!checkIn.summary.trim()) return
    addCheckIn(objective.id, checkIn)
    updateObjectiveRisk(objective.id, checkIn.risk, checkIn.confidence)
    setCheckIn({ summary: '', nextPlan: '', confidence: 'medium', risk: 'yellow' })
  }

  const submitComment = () => {
    addComment(objective.id, comment)
    setComment('')
  }

  return (
    <Box>
      <PageHeader
        title="OKR 详情"
        description="在详情页完成 KR 当前值更新、Check-in 风险暴露、行动项追踪和评论协作。"
        breadcrumbs={['OKR', department?.name || '-', owner?.name || '-']}
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={8}>
          <Card variant="outlined" sx={{ mb: 2.5 }}>
            <CardContent>
              <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 2 }}>
                <Chip color="primary" variant="outlined" label={getLevelLabel(objective.level)} />
                <Chip label={objective.priority} />
                <Chip variant="outlined" label={getStatusLabel(objective.status)} />
                <RiskChip risk={objective.risk} size="medium" />
                <ConfidenceChip confidence={objective.confidence} size="medium" />
              </Stack>
              <Typography variant="h4" sx={{ mb: 1.5 }}>
                {objective.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {objective.description}
              </Typography>
              {aligned && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  对齐上级目标：{aligned.title}
                </Alert>
              )}
              <Stack direction="row" gap={1} flexWrap="wrap">
                {objective.tags.map((tag) => (
                  <Chip key={tag} label={`#${tag}`} size="small" />
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ mb: 2.5 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Key Results</Typography>
                <Typography variant="h5" color="primary.main">
                  {progress}%
                </Typography>
              </Stack>
              <Stack spacing={2.5}>
                {objective.keyResults.map((kr) => (
                  <Box key={kr.id} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 3 }}>
                    <KrProgress kr={kr} />
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={8}>
                        <Slider
                          value={Number(kr.currentValue)}
                          min={Math.min(kr.startValue, kr.targetValue) * 0.8}
                          max={Math.max(kr.startValue, kr.targetValue) * 1.2}
                          step={kr.unit === '%' ? 1 : 0.1}
                          valueLabelDisplay="auto"
                          onChange={(_, value) => updateKrValue(objective.id, kr.id, value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="当前值"
                          type="number"
                          value={kr.currentValue}
                          onChange={(event) => updateKrValue(objective.id, kr.id, event.target.value)}
                          fullWidth
                          size="small"
                          helperText={`${getUser(kr.ownerId)?.name || '-'} · ${kr.unit}`}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ mb: 2.5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                行动项 Initiative
              </Typography>
              <Stack spacing={1.5}>
                {objective.initiatives.map((item) => (
                  <Box key={item.id} sx={{ p: 1.5, borderRadius: 3, bgcolor: 'action.hover' }}>
                    <Stack direction="row" justifyContent="space-between" gap={2}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          负责人：{getUser(item.ownerId)?.name} · 截止：{formatDate(item.dueDate)}
                        </Typography>
                      </Box>
                      <Chip label={getStatusLabel(item.status)} color={item.status === 'blocked' ? 'error' : item.status === 'done' ? 'success' : 'default'} />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card variant="outlined" sx={{ mb: 2.5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                基础信息
              </Typography>
              <Stack spacing={1.5}>
                <InfoLine label="负责人" value={owner?.name || '-'} />
                <InfoLine label="所属部门" value={department?.name || '-'} />
                <InfoLine label="可见范围" value={objective.visibility} />
                <InfoLine label="KR 数量" value={`${objective.keyResults.length} 个`} />
                <InfoLine label="行动项" value={`${objective.initiatives.length} 个`} />
                <InfoLine label="Check-in" value={`${objective.checkIns.length} 次`} />
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ mb: 2.5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                新增 Check-in
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="本次进展"
                  value={checkIn.summary}
                  onChange={updateCheckInField('summary')}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label="下步计划 / 需要支持"
                  value={checkIn.nextPlan}
                  onChange={updateCheckInField('nextPlan')}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <Stack direction="row" spacing={1.5}>
                  <FormControl fullWidth>
                    <InputLabel>信心</InputLabel>
                    <Select label="信心" value={checkIn.confidence} onChange={updateCheckInField('confidence')}>
                      <MenuItem value="high">高信心</MenuItem>
                      <MenuItem value="medium">中信心</MenuItem>
                      <MenuItem value="low">低信心</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>风险</InputLabel>
                    <Select label="风险" value={checkIn.risk} onChange={updateCheckInField('risk')}>
                      <MenuItem value="green">正常</MenuItem>
                      <MenuItem value="yellow">关注</MenuItem>
                      <MenuItem value="red">高风险</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Button variant="contained" onClick={submitCheckIn} disabled={!checkIn.summary.trim()}>
                  提交 Check-in
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ mb: 2.5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Check-in 历史
              </Typography>
              <Stack spacing={2}>
                {objective.checkIns.map((item) => (
                  <Box key={item.id} sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 1.5 }}>
                    <Stack direction="row" justifyContent="space-between" gap={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {getUser(item.authorId)?.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(item.date)}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {item.summary}
                    </Typography>
                    {item.nextPlan && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
                        下步：{item.nextPlan}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                评论协作
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <TextField size="small" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="输入评论或 @同事" fullWidth />
                <Button variant="contained" onClick={submitComment} disabled={!comment.trim()}>
                  <SendIcon fontSize="small" />
                </Button>
              </Stack>
              <Stack spacing={2}>
                {objective.comments.length === 0 && (
                  <Typography color="text.secondary" variant="body2">
                    暂无评论。
                  </Typography>
                )}
                {objective.comments.map((item) => {
                  const author = getUser(item.authorId)
                  return (
                    <Box key={item.id}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                        <Avatar sx={{ width: 28, height: 28 }}>{author?.avatar}</Avatar>
                        <Typography variant="subtitle2">{author?.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(item.date)}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {item.content}
                      </Typography>
                      <Divider sx={{ mt: 1.5 }} />
                    </Box>
                  )
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

function InfoLine({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography sx={{ fontWeight: 800, textAlign: 'right' }}>{value}</Typography>
    </Stack>
  )
}
