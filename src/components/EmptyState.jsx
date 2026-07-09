import { Box, Button, Paper, Typography } from '@mui/material'

export default function EmptyState({ title = '暂无数据', description, actionText, onAction }) {
  return (
    <Paper variant="outlined" sx={{ p: 5, textAlign: 'center', borderRadius: 4 }}>
      <Box sx={{ fontSize: 48, mb: 1 }}>📌</Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      {actionText && <Button onClick={onAction}>{actionText}</Button>}
    </Paper>
  )
}
