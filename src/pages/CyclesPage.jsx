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
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PageHeader from '../components/PageHeader.jsx'
import { useOkr } from '../context/OkrContext.jsx'
import { formatDate, getStatusLabel } from '../utils/okrUtils.js'

const defaultForm = {
  name: '',
  type: 'quarter',
  startDate: '2026-10-01',
  endDate: '2026-12-31',
  checkInFrequency: 'weekly',
  description: ''
}

export default function CyclesPage() {
  const { cycles, addCycle } = useOkr()
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState(defaultForm)

  const change = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))
  const submit = () => {
    if (!form.name.trim()) return
    addCycle(form)
    setOpen(false)
    setForm(defaultForm)
  }

  return (
    <Box>
      <PageHeader
        title="周期管理"
        description="OKR 按周期运转。这里用于管理年度、季度、月度或项目制 OKR 周期。"
        breadcrumbs={['OKR', '周期管理']}
        action={
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpen(true)}>
            新建周期
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        {cycles.map((cycle) => (
          <Grid item xs={12} md={6} key={cycle.id}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="h6">{cycle.name}</Typography>
                  <Typography color={cycle.status === 'executing' ? 'success.main' : 'text.secondary'} sx={{ fontWeight: 800 }}>
                    {getStatusLabel(cycle.status)}
                  </Typography>
                </Stack>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {cycle.description}
                </Typography>
                <Stack spacing={1}>
                  <InfoLine label="周期类型" value={cycle.type} />
                  <InfoLine label="起止日期" value={`${formatDate(cycle.startDate)} - ${formatDate(cycle.endDate)}`} />
                  <InfoLine label="Check-in 频率" value={cycle.checkInFrequency} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>新建 OKR 周期</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="周期名称" value={form.name} onChange={change('name')} fullWidth required placeholder="例如：2026 Q4 OKR" />
            <TextField select label="周期类型" value={form.type} onChange={change('type')} fullWidth>
              <MenuItem value="year">年度</MenuItem>
              <MenuItem value="quarter">季度</MenuItem>
              <MenuItem value="month">月度</MenuItem>
              <MenuItem value="project">项目周期</MenuItem>
            </TextField>
            <Stack direction="row" spacing={2}>
              <TextField label="开始日期" type="date" value={form.startDate} onChange={change('startDate')} fullWidth InputLabelProps={{ shrink: true }} />
              <TextField label="结束日期" type="date" value={form.endDate} onChange={change('endDate')} fullWidth InputLabelProps={{ shrink: true }} />
            </Stack>
            <TextField select label="Check-in 频率" value={form.checkInFrequency} onChange={change('checkInFrequency')} fullWidth>
              <MenuItem value="weekly">每周</MenuItem>
              <MenuItem value="biweekly">每两周</MenuItem>
              <MenuItem value="monthly">每月</MenuItem>
            </TextField>
            <TextField label="周期说明" value={form.description} onChange={change('description')} fullWidth multiline minRows={2} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button variant="contained" onClick={submit} disabled={!form.name.trim()}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
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
