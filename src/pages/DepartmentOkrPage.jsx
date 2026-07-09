import React from 'react'
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'
import PageHeader from '../components/PageHeader.jsx'
import ObjectiveCard from '../components/ObjectiveCard.jsx'
import RiskChip from '../components/RiskChip.jsx'
import { useOkr } from '../context/OkrContext.jsx'
import { calcObjectiveProgress } from '../utils/okrUtils.js'

export default function DepartmentOkrPage() {
  const { departments, objectives, activeCycle, getUser } = useOkr()
  const availableDepartments = departments.filter((department) => department.type !== 'company')
  const [departmentId, setDepartmentId] = React.useState(availableDepartments[0]?.id || '')
  const department = departments.find((item) => item.id === departmentId)
  const departmentObjectives = objectives.filter(
    (objective) => objective.cycleId === activeCycle.id && objective.departmentId === departmentId
  )

  const avg = departmentObjectives.length
    ? Math.round(departmentObjectives.reduce((sum, item) => sum + calcObjectiveProgress(item), 0) / departmentObjectives.length)
    : 0

  return (
    <Box>
      <PageHeader
        title="部门 OKR"
        description="从部门视角查看目标承接、进度、风险和负责人，适合部门负责人日常追踪。"
        breadcrumbs={['OKR', '部门 OKR']}
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>选择部门</InputLabel>
                <Select label="选择部门" value={departmentId} onChange={(event) => setDepartmentId(event.target.value)}>
                  {availableDepartments.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {department?.name}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {department?.description}
              </Typography>
              <Stack spacing={1.5}>
                <InfoLine label="部门负责人" value={getUser(department?.leaderId)?.name || '-'} />
                <InfoLine label="目标数量" value={`${departmentObjectives.length} 个`} />
                <InfoLine label="平均进度" value={`${avg}%`} />
                <InfoLine
                  label="风险目标"
                  value={`${departmentObjectives.filter((item) => item.risk === 'red').length} 个`}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ mb: 2.5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                部门目标健康度
              </Typography>
              <Stack spacing={1.5}>
                {departmentObjectives.map((objective) => (
                  <Box key={objective.id} sx={{ p: 1.5, borderRadius: 3, bgcolor: 'action.hover' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }} noWrap>
                          {objective.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          负责人：{getUser(objective.ownerId)?.name}
                        </Typography>
                      </Box>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <RiskChip risk={objective.risk} />
                        <Typography variant="h6" color="primary.main">
                          {calcObjectiveProgress(objective)}%
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Grid container spacing={2.5}>
            {departmentObjectives.map((objective) => (
              <Grid item xs={12} key={objective.id}>
                <ObjectiveCard objective={objective} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

function InfoLine({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography sx={{ fontWeight: 800 }}>{value}</Typography>
    </Stack>
  )
}
