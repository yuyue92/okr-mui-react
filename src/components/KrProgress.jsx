import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import { calcKrProgress } from '../utils/okrUtils.js'

export default function KrProgress({ kr, dense = false }) {
  const progress = Math.round(calcKrProgress(kr))
  return (
    <Box sx={{ py: dense ? 0.75 : 1.25 }}>
      <Stack direction="row" justifyContent="space-between" gap={2} sx={{ mb: 0.75 }}>
        <Typography variant={dense ? 'body2' : 'subtitle2'} sx={{ fontWeight: 700 }}>
          {kr.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
          {progress}%
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={progress >= 80 ? 'success' : progress >= 50 ? 'warning' : 'error'}
        sx={{ height: dense ? 7 : 9, borderRadius: 99 }}
      />
      {!dense && (
        <Typography color="text.secondary" variant="caption" sx={{ display: 'block', mt: 0.75 }}>
          当前值：{kr.currentValue}{kr.unit} / 目标值：{kr.targetValue}{kr.unit} · 权重：{kr.weight}% · 数据源：{kr.dataSource}
        </Typography>
      )}
    </Box>
  )
}
