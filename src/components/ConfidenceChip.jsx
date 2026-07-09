import { Chip } from '@mui/material'
import { getConfidenceLabel } from '../utils/okrUtils.js'

const colorMap = {
  high: 'success',
  medium: 'warning',
  low: 'error'
}

export default function ConfidenceChip({ confidence, size = 'small' }) {
  return (
    <Chip color={colorMap[confidence] || 'default'} label={getConfidenceLabel(confidence)} size={size} />
  )
}
