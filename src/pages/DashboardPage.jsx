import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FlagIcon from '@mui/icons-material/Flag'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import React from 'react'
import PageHeader from '../components/PageHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import ObjectiveCard from '../components/ObjectiveCard.jsx'
import RiskChip from '../components/RiskChip.jsx'
import CreateObjectiveDialog from '../components/CreateObjectiveDialog.jsx'
import { useOkr } from '../context/OkrContext.jsx'
import { calcObjectiveProgress, formatDate } from '../utils/okrUtils.js'

export default function DashboardPage() {
  const { objectives, activeCycle, dashboardStats, getUser, getDepartment } = useOkr()
  const [open, setOpen] = React.useState(false)
  const cycleObjectives = objectives.filter((objective) => objective.cycleId === activeCycle.id)
  const riskObjectives = cycleObjectives.filter((objective) => objective.risk !== 'green').slice(0, 4)
  const topObjectives = [...cycleObjectives]
    .sort((a, b) => calcObjectiveProgress(b) - calcObjectiveProgress(a))
    .slice(0, 3)

  return (
    <Box>
      <PageHeader
        title="首页 Dashboard"
        description="快速查看当前 OKR 周期的总体进展、风险目标、近期 Check-in 和重点目标。"
        breadcrumbs={['OKR', 'Dashboard']}
        action={
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpen(true)}>
            创建 OKR
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={3}>
          <StatCard title="当前目标数" value={dashboardStats.total} helper={activeCycle.name} icon={<FlagIcon />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="平均进度" value={`${dashboardStats.avgProgress}%`} helper="按 KR 权重计算" icon={<TrendingUpIcon />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="风险目标"
            value={dashboardStats.redRisks}
            helper={`${dashboardStats.yellowRisks} 个目标需要关注`}
            icon={<WarningAmberIcon />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Check-in 记录" value={dashboardStats.checkIns} helper="当前周期累计更新" icon={<FactCheckIcon />} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
        <Grid item xs={12} lg={8}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                重点目标进展
              </Typography>
              <Grid container spacing={2}>
                {topObjectives.map((objective) => (
                  <Grid item xs={12} md={4} key={objective.id}>
                    <ObjectiveCard objective={objective} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                风险与协同提醒
              </Typography>
              <Stack spacing={2}>
                {riskObjectives.map((objective) => {
                  const owner = getUser(objective.ownerId)
                  const department = getDepartment(objective.departmentId)
                  return (
                    <Box key={objective.id} sx={{ p: 1.5, borderRadius: 3, bgcolor: 'action.hover' }}>
                      <Stack direction="row" justifyContent="space-between" gap={1} sx={{ mb: 1 }}>
                        <RiskChip risk={objective.risk} />
                        <Typography variant="caption" color="text.secondary">
                          {calcObjectiveProgress(objective)}%
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {objective.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {department?.name} · {owner?.name}
                      </Typography>
                    </Box>
                  )
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                近期 Check-in 动态
              </Typography>
              <Grid container spacing={2}>
                {cycleObjectives.flatMap((objective) =>
                  (objective.checkIns || []).slice(0, 1).map((checkIn) => (
                    <Grid item xs={12} md={4} key={checkIn.id}>
                      <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 3 }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800 }} noWrap>
                            {objective.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                            {formatDate(checkIn.date)}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {checkIn.summary}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                          更新人：{getUser(checkIn.authorId)?.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <CreateObjectiveDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}
