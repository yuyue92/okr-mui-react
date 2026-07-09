import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import PageHeader from '../components/PageHeader.jsx'
import { useOkr } from '../context/OkrContext.jsx'

export default function OrgPage() {
  const { departments, users, getUser } = useOkr()
  const company = departments.find((item) => item.type === 'company')
  const children = departments.filter((item) => item.parentId === company?.id)

  return (
    <Box>
      <PageHeader
        title="组织架构"
        description="当前版本为 mock 组织数据，用于支撑 OKR 权限、部门视图和目标对齐。"
        breadcrumbs={['系统', '组织架构']}
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                组织树
              </Typography>
              <OrgNode department={company} leader={getUser(company?.leaderId)} />
              <Stack spacing={1.5} sx={{ ml: 3, mt: 1.5 }}>
                {children.map((department) => (
                  <OrgNode key={department.id} department={department} leader={getUser(department.leaderId)} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card variant="outlined" sx={{ mb: 2.5 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                部门概览
              </Typography>
              <Grid container spacing={2}>
                {children.map((department) => {
                  const memberCount = users.filter((user) => user.departmentId === department.id).length
                  return (
                    <Grid item xs={12} sm={6} key={department.id}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                          <Typography variant="h6">{department.name}</Typography>
                          <Chip label={`${memberCount} 人`} size="small" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                          {department.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          负责人：{getUser(department.leaderId)?.name || '-'}
                        </Typography>
                      </Paper>
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                用户列表
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>用户</TableCell>
                      <TableCell>部门</TableCell>
                      <TableCell>职位</TableCell>
                      <TableCell>角色</TableCell>
                      <TableCell>上级</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => {
                      const department = departments.find((item) => item.id === user.departmentId)
                      const manager = getUser(user.managerId)
                      return (
                        <TableRow key={user.id} hover>
                          <TableCell>
                            <Stack direction="row" spacing={1.25} alignItems="center">
                              <Avatar>{user.avatar}</Avatar>
                              <Box>
                                <Typography sx={{ fontWeight: 800 }}>{user.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {user.email}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>{department?.name}</TableCell>
                          <TableCell>{user.title}</TableCell>
                          <TableCell>
                            <Chip label={user.role} size="small" />
                          </TableCell>
                          <TableCell>{manager?.name || '-'}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

function OrgNode({ department, leader }) {
  if (!department) return null
  return (
    <Box>
      <List dense disablePadding>
        <ListItem sx={{ border: 1, borderColor: 'divider', borderRadius: 3 }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: department.type === 'company' ? 'primary.main' : 'secondary.main' }}>
              {department.name.slice(0, 1)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 800 }}>{department.name}</Typography>}
            secondary={`负责人：${leader?.name || '-'}`}
          />
        </ListItem>
      </List>
      {department.type === 'company' && <Divider sx={{ ml: 3, height: 16, width: 1, borderLeft: 1, borderColor: 'divider' }} />}
    </Box>
  )
}
