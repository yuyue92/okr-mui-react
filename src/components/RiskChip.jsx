import { Chip } from '@mui/material'
import { getRiskLabel } from '../utils/okrUtils.js'

const colorMap = {
  green: 'success',
  yellow: 'warning',
  red: 'error'
}

export default function RiskChip({ risk, size = 'small' }) {
  return <Chip color={colorMap[risk] || 'default'} label={getRiskLabel(risk)} size={size} variant="outlined" />
}
