import React from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FlagIcon from '@mui/icons-material/Flag'
import GroupsIcon from '@mui/icons-material/Groups'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useOkr } from '../context/OkrContext.jsx'

const drawerWidth = 268

const menuItems = [
  { label: '首页 Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: '我的 OKR', path: '/my-okr', icon: <FlagIcon /> },
  { label: '部门 OKR', path: '/department-okr', icon: <GroupsIcon /> },
  { label: 'Check-in 更新', path: '/check-in', icon: <FactCheckIcon /> },
  { label: '周期管理', path: '/cycles', icon: <CalendarMonthIcon /> },
  { label: '组织架构', path: '/org', icon: <AccountTreeIcon /> },
  { label: '报表中心', path: '/reports', icon: <AnalyticsIcon /> },
  { label: '系统配置', path: '/settings', icon: <SettingsIcon /> }
]

export default function MainLayout() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { currentUser, getDepartment, activeCycle, logout } = useOkr()
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const department = getDepartment(currentUser?.departmentId)

  const handleLogout = () => {
    setAnchorEl(null)
    logout()
    navigate('/login', { replace: true })
  }

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              color: 'white',
              bgcolor: 'primary.main',
              fontWeight: 900
            }}
          >
            O
          </Box>
          <Box>
            <Typography variant="h6">OKR Center</Typography>
            <Typography variant="caption" color="text.secondary">
              目标对齐与执行追踪
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'action.hover' }}>
          <Typography variant="caption" color="text.secondary">
            当前周期
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
            {activeCycle?.name}
          </Typography>
        </Box>
      </Box>
      <List sx={{ px: 1.5, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            component={NavLink}
            to={item.path}
            key={item.path}
            sx={{
              mb: 0.75,
              borderRadius: 3,
              '&.active': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': { color: 'primary.contrastText' }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Avatar sx={{ bgcolor: 'secondary.main' }}>{currentUser?.avatar}</Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              {currentUser?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {department?.name} · {currentUser?.title}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 1, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              OKR 系统第一版 Mock Demo
            </Typography>
            <Typography variant="caption" color="text.secondary">
              React.js 非 TS + MUI · 后续可替换为真实后端
            </Typography>
          </Box>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main' }}>{currentUser?.avatar}</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem disabled>{currentUser?.email}</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              退出登录
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: 1,
              borderColor: 'divider'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: { xs: 2, md: 3 }, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
