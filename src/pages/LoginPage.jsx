import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import { useNavigate } from 'react-router-dom'
import { useOkr } from '../context/OkrContext.jsx'

export default function LoginPage() {
  const { users, login, currentUser } = useOkr()
  const [userId, setUserId] = React.useState('u6')
  const navigate = useNavigate()

  React.useEffect(() => {
    if (currentUser) navigate('/dashboard', { replace: true })
  }, [currentUser, navigate])

  const handleLogin = () => {
    login(userId)
    navigate('/dashboard', { replace: true })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at top left, rgba(37,99,235,.20), transparent 32%), radial-gradient(circle at bottom right, rgba(124,58,237,.18), transparent 28%)'
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={0} sx={{ borderRadius: 5, border: 1, borderColor: 'divider' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                <TrackChangesIcon fontSize="large" />
              </Avatar>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4">OKR Center</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  第一版 Mock 演示系统 · 选择身份即可进入
                </Typography>
              </Box>
            </Stack>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>演示用户</InputLabel>
              <Select label="演示用户" value={userId} onChange={(event) => setUserId(event.target.value)}>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} · {user.title} · {user.role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button fullWidth size="large" variant="contained" onClick={handleLogin}>
              进入 OKR 系统
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
              当前版本不连接后端，数据保存在内存中；刷新后会恢复 mock 初始数据。
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
