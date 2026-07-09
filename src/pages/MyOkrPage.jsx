import React from 'react'
import { Box, Button, Grid, Tab, Tabs } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PageHeader from '../components/PageHeader.jsx'
import ObjectiveCard from '../components/ObjectiveCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import CreateObjectiveDialog from '../components/CreateObjectiveDialog.jsx'
import { useOkr } from '../context/OkrContext.jsx'

export default function MyOkrPage() {
  const { objectives, currentUser, activeCycle } = useOkr()
  const [tab, setTab] = React.useState('owned')
  const [open, setOpen] = React.useState(false)

  const filtered = objectives.filter((objective) => {
    const inCycle = objective.cycleId === activeCycle.id
    if (!inCycle) return false
    if (tab === 'owned') return objective.ownerId === currentUser.id
    if (tab === 'participated') return objective.participantIds?.includes(currentUser.id)
    return objective.departmentId === currentUser.departmentId
  })

  return (
    <Box>
      <PageHeader
        title="我的 OKR"
        description="查看自己负责、参与或本部门相关的目标，并快速进入详情更新 KR 进度。"
        breadcrumbs={['OKR', '我的 OKR']}
        action={
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpen(true)}>
            创建我的 OKR
          </Button>
        }
      />

      <Tabs value={tab} onChange={(_, next) => setTab(next)} sx={{ mb: 2 }}>
        <Tab value="owned" label="我负责的" />
        <Tab value="participated" label="我参与的" />
        <Tab value="department" label="本部门相关" />
      </Tabs>

      {filtered.length ? (
        <Grid container spacing={2.5}>
          {filtered.map((objective) => (
            <Grid item xs={12} md={6} xl={4} key={objective.id}>
              <ObjectiveCard objective={objective} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState title="当前筛选下没有 OKR" description="可以新建一个目标，或切换到其他视图查看。" actionText="创建 OKR" onAction={() => setOpen(true)} />
      )}

      <CreateObjectiveDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}
