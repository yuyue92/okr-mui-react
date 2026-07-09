import { Button, Paper, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Paper variant="outlined" sx={{ p: 5, textAlign: 'center', borderRadius: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        页面不存在
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        你访问的 OKR 页面不存在，可能是路径写错了。
      </Typography>
      <Button component={RouterLink} to="/dashboard" variant="contained">
        回到首页
      </Button>
    </Paper>
  )
}
