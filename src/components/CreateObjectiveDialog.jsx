import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useOkr } from '../context/OkrContext.jsx'

const defaultForm = {
  title: '',
  description: '',
  level: 'personal',
  ownerId: '',
  alignedToObjectiveId: '',
  priority: 'P1',
  visibility: 'department',
  tags: '',
  krTitle: '',
  krType: 'increase',
  unit: '%',
  startValue: 0,
  targetValue: 100,
  currentValue: 0
}

export default function CreateObjectiveDialog({ open, onClose }) {
  const navigate = useNavigate()
  const { users, objectives, currentUser, createObjective } = useOkr()
  const [form, setForm] = React.useState({ ...defaultForm, ownerId: currentUser?.id || '' })

  React.useEffect(() => {
    if (open) {
      setForm({ ...defaultForm, ownerId: currentUser?.id || '' })
    }
  }, [open, currentUser])

  const change = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const submit = () => {
    if (!form.title.trim()) return
    const objectiveId = createObjective(form)
    onClose()
    navigate(`/okr/${objectiveId}`)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>创建 OKR</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12}>
            <TextField label="Objective 目标标题" value={form.title} onChange={change('title')} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="目标描述"
              value={form.description}
              onChange={change('description')}
              fullWidth
              multiline
              minRows={2}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>目标层级</InputLabel>
              <Select label="目标层级" value={form.level} onChange={change('level')}>
                <MenuItem value="company">公司级</MenuItem>
                <MenuItem value="department">部门级</MenuItem>
                <MenuItem value="personal">个人级</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>负责人</InputLabel>
              <Select label="负责人" value={form.ownerId} onChange={change('ownerId')}>
                {users.map((user) => (
                  <MenuItem value={user.id} key={user.id}>
                    {user.name} · {user.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>优先级</InputLabel>
              <Select label="优先级" value={form.priority} onChange={change('priority')}>
                <MenuItem value="P0">P0</MenuItem>
                <MenuItem value="P1">P1</MenuItem>
                <MenuItem value="P2">P2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <InputLabel>对齐上级目标</InputLabel>
              <Select label="对齐上级目标" value={form.alignedToObjectiveId} onChange={change('alignedToObjectiveId')}>
                <MenuItem value="">不对齐</MenuItem>
                {objectives.map((objective) => (
                  <MenuItem value={objective.id} key={objective.id}>
                    {objective.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="标签，英文逗号分隔" value={form.tags} onChange={change('tags')} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="第一个 KR" value={form.krTitle} onChange={change('krTitle')} fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>KR 类型</InputLabel>
              <Select label="KR 类型" value={form.krType} onChange={change('krType')}>
                <MenuItem value="increase">增长型</MenuItem>
                <MenuItem value="decrease">降低型</MenuItem>
                <MenuItem value="milestone">里程碑型</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="单位" value={form.unit} onChange={change('unit')} fullWidth />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField label="起始值" type="number" value={form.startValue} onChange={change('startValue')} fullWidth />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField label="当前值" type="number" value={form.currentValue} onChange={change('currentValue')} fullWidth />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField label="目标值" type="number" value={form.targetValue} onChange={change('targetValue')} fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" onClick={submit} disabled={!form.title.trim()}>
          创建并查看
        </Button>
      </DialogActions>
    </Dialog>
  )
}
