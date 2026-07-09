import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link as RouterLink } from 'react-router-dom'
import { useOkr } from '../context/OkrContext.jsx'
import { calcObjectiveProgress, getLevelLabel, getStatusLabel } from '../utils/okrUtils.js'
import RiskChip from './RiskChip.jsx'
import ConfidenceChip from './ConfidenceChip.jsx'
import KrProgress from './KrProgress.jsx'

export default function ObjectiveCard({ objective }) {
  const { getUser, getDepartment, objectives } = useOkr()
  const owner = getUser(objective.ownerId)
  const department = getDepartment(objective.departmentId)
  const aligned = objectives.find((item) => item.id === objective.alignedToObjectiveId)
  const progress = calcObjectiveProgress(objective)

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" gap={2} sx={{ mb: 1 }}>
          <Stack direction="row" gap={1} flexWrap="wrap">
            <Chip size="small" label={getLevelLabel(objective.level)} color="primary" variant="outlined" />
            <Chip size="small" label={objective.priority} />
            <Chip size="small" label={getStatusLabel(objective.status)} variant="outlined" />
          </Stack>
          <Typography variant="h6" color="primary.main" sx={{ whiteSpace: 'nowrap' }}>
            {progress}%
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ lineHeight: 1.35, mb: 1 }}>
          {objective.title}
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ minHeight: 42 }}>
          {objective.description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2, rowGap: 1 }}>
          <RiskChip risk={objective.risk} />
          <ConfidenceChip confidence={objective.confidence} />
          <Chip size="small" label={department?.name || '-'} />
          <Chip size="small" label={owner?.name || '-'} variant="outlined" />
        </Stack>

        {aligned && (
          <Box sx={{ mt: 2, p: 1.25, borderRadius: 2, bgcolor: 'action.hover' }}>
            <Typography variant="caption" color="text.secondary">
              对齐上级目标
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
              {aligned.title}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />
        <Stack spacing={1}>
          {objective.keyResults.slice(0, 2).map((kr) => (
            <KrProgress key={kr.id} kr={kr} dense />
          ))}
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Typography color="text.secondary" variant="caption">
            {objective.keyResults.length} 个 KR · {objective.initiatives.length} 个行动项
          </Typography>
          <Button
            component={RouterLink}
            to={`/okr/${objective.id}`}
            endIcon={<ArrowForwardIcon />}
            size="small"
          >
            查看详情
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
