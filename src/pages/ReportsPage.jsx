import { Box, Card, CardContent, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import PageHeader from '../components/PageHeader.jsx'
import RiskChip from '../components/RiskChip.jsx'
import { useOkr } from '../context/OkrContext.jsx'
import { calcObjectiveProgress, getLevelLabel } from '../utils/okrUtils.js'

export default function ReportsPage() {
  const { objectives, departments, activeCycle, getDepartment, getUser } = useOkr()
  const cycleObjectives = objectives.filter((objective) => objective.cycleId === activeCycle.id)

  const byDepartment = departments
    .filter((department) => department.type !== 'company')
    .map((department) => {
      const list = cycleObjectives.filter((objective) => objective.departmentId === department.id)
      const avg = list.length ? Math.round(list.reduce((sum, item) => sum + calcObjectiveProgress(item), 0) / list.length) : 0
      return { ...department, count: list.length, avg }
    })

  const byLevel = ['company', 'department', 'personal'].map((level) => {
    const list = cycleObjectives.filter((objective) => objective.level === level)
    const avg = list.length ? Math.round(list.reduce((sum, item) => sum + calcObjectiveProgress(item), 0) / list.length) : 0
    return { level, count: list.length, avg }
  })

  const risks = cycleObjectives.filter((objective) => objective.risk !== 'green')

  return (
    <Box>
      <PageHeader
        title="报表中心"
        description="第一版先用简化条形图和统计卡片展示 OKR 进度、部门对比和风险目标。"
        breadcrumbs={['OKR', '报表中心']}
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                部门进度对比
              </Typography>
              <Stack spacing={2}>
                {byDepartment.map((item) => (
                  <Box key={item.id}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                      <Typography sx={{ fontWeight: 800 }}>{item.name}</Typography>
                      <Typography color="text.secondary">
                        {item.avg}% · {item.count} 个目标
                      </Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={item.avg} sx={{ height: 10, borderRadius: 99 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                目标层级分布
              </Typography>
              <Stack spacing={2}>
                {byLevel.map((item) => (
                  <Box key={item.level}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                      <Typography sx={{ fontWeight: 800 }}>{getLevelLabel(item.level)}</Typography>
                      <Typography color="text.secondary">
                        {item.avg}% · {item.count} 个目标
                      </Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={item.avg} color="secondary" sx={{ height: 10, borderRadius: 99 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                风险目标清单
              </Typography>
              <Grid container spacing={2}>
                {risks.map((objective) => (
                  <Grid item xs={12} md={6} key={objective.id}>
                    <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 3 }}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <RiskChip risk={objective.risk} />
                        <Typography variant="h6" color="primary.main">
                          {calcObjectiveProgress(objective)}%
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        {objective.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {getDepartment(objective.departmentId)?.name} · {getUser(objective.ownerId)?.name}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
