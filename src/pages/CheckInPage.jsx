import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import PageHeader from '../components/PageHeader.jsx'
import RiskChip from '../components/RiskChip.jsx'
import ConfidenceChip from '../components/ConfidenceChip.jsx'
import KrProgress from '../components/KrProgress.jsx'
import { useOkr } from '../context/OkrContext.jsx'
import { calcObjectiveProgress, formatDate } from '../utils/okrUtils.js'

export default function CheckInPage() {
  const { objectives, activeCycle, currentUser, getUser, addCheckIn } = useOkr()
  const [selected, setSelected] = React.useState(null)
  const [form, setForm] = React.useState({ summary: '', nextPlan: '', confidence: 'medium', risk: 'yellow' })

  const visibleObjectives = objectives.filter(
    (objective) =>
      objective.cycleId === activeCycle.id &&
      (objective.ownerId === currentUser.id || objective.participantIds?.includes(currentUser.id) || objective.departmentId === currentUser.departmentId)
  )

  const openDialog = (objective) => {
    setSelected(objective)
    setForm({ summary: '', nextPlan: '', confidence: objective.confidence, risk: objective.risk })
  }

  const submit = () => {
    if (!selected || !form.summary.trim()) return
    addCheckIn(selected.id, form)
    setSelected(null)
  }

  const change = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))

  return (
    <Box>
      <PageHeader
        title="Check-in 更新"
        description="每周更新目标进展、风险和下步计划。这个模块是 OKR 过程管理的心跳。"
        breadcrumbs={['OKR', 'Check-in']}
      />

      <Grid container spacing={2.5}>
        {visibleObjectives.map((objective) => {
          const last = objective.checkIns?.[0]
          return (
            <Grid item xs={12} md={6} xl={4} key={objective.id}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <RiskChip risk={objective.risk} />
                    <Typography variant="h6" color="primary.main">
                      {calcObjectiveProgress(objective)}%
                    </Typography>
                  </Stack>
                  <Typography variant="h6" sx={{ mb: 1, lineHeight: 1.35 }}>
                    {objective.title}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <ConfidenceChip confidence={objective.confidence} />
                    <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
                      负责人：{getUser(objective.ownerId)?.name}
                    </Typography>
                  </Stack>
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    {objective.keyResults.slice(0, 2).map((kr) => (
                      <KrProgress key={kr.id} kr={kr} dense />
                    ))}
                  </Stack>
                  <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'action.hover', mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      最近更新：{last ? formatDate(last.date) : '暂无'}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {last?.summary || '还没有 Check-in，建议本周完成一次进展更新。'}
                    </Typography>
                  </Box>
                  <Button fullWidth variant="contained" onClick={() => openDialog(objective)}>
                    更新本周进展
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} fullWidth maxWidth="sm">
        <DialogTitle>提交 Check-in</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
            {selected?.title}
          </Typography>
          <Stack spacing={2}>
            <TextField label="本周进展" value={form.summary} onChange={change('summary')} fullWidth multiline minRows={3} required />
            <TextField label="下周计划 / 需要支持" value={form.nextPlan} onChange={change('nextPlan')} fullWidth multiline minRows={2} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>信心指数</InputLabel>
                <Select label="信心指数" value={form.confidence} onChange={change('confidence')}>
                  <MenuItem value="high">高信心</MenuItem>
                  <MenuItem value="medium">中信心</MenuItem>
                  <MenuItem value="low">低信心</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>风险状态</InputLabel>
                <Select label="风险状态" value={form.risk} onChange={change('risk')}>
                  <MenuItem value="green">正常</MenuItem>
                  <MenuItem value="yellow">关注</MenuItem>
                  <MenuItem value="red">高风险</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>取消</Button>
          <Button variant="contained" onClick={submit} disabled={!form.summary.trim()}>
            提交
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
