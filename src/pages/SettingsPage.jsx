import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import PageHeader from '../components/PageHeader.jsx'
import { useOkr } from '../context/OkrContext.jsx'

export default function SettingsPage() {
  const { settings, updateSetting } = useOkr()

  const toggle = (key) => (_, checked) => updateSetting(key, checked)
  const change = (key) => (event) => updateSetting(key, event.target.value)

  return (
    <Box>
      <PageHeader
        title="系统配置"
        description="用于展示 OKR 规则配置，后续连接后端时可以持久化为公司级配置。"
        breadcrumbs={['系统', '配置']}
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                OKR 规则
              </Typography>
              <Stack spacing={2}>
                <SettingSwitch label="启用个人 OKR" checked={settings.enablePersonalOkr} onChange={toggle('enablePersonalOkr')} />
                <SettingSwitch label="需要上级确认" checked={settings.requireManagerConfirm} onChange={toggle('requireManagerConfirm')} />
                <SettingSwitch label="启用 KR 权重" checked={settings.enableKrWeight} onChange={toggle('enableKrWeight')} />
                <SettingSwitch label="允许发布后修改" checked={settings.allowEditAfterPublish} onChange={toggle('allowEditAfterPublish')} />
                <SettingSwitch label="归档前强制复盘" checked={settings.forceReviewBeforeArchive} onChange={toggle('forceReviewBeforeArchive')} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                周期与评分
              </Typography>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>默认 Check-in 日期</InputLabel>
                  <Select label="默认 Check-in 日期" value={settings.defaultCheckInDay} onChange={change('defaultCheckInDay')}>
                    <MenuItem value="Monday">周一</MenuItem>
                    <MenuItem value="Wednesday">周三</MenuItem>
                    <MenuItem value="Friday">周五</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>评分方式</InputLabel>
                  <Select label="评分方式" value={settings.scoreMethod} onChange={change('scoreMethod')}>
                    <MenuItem value="0-1">0 - 1 分制</MenuItem>
                    <MenuItem value="0-100">0 - 100 分制</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="风险预警阈值"
                  type="number"
                  value={settings.riskWarningThreshold}
                  onChange={change('riskWarningThreshold')}
                  helperText="当目标进度低于阈值时，可在后端任务中触发风险提醒。"
                  fullWidth
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

function SettingSwitch({ label, checked, onChange }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
      <Typography>{label}</Typography>
      <Switch checked={checked} onChange={onChange} />
    </Stack>
  )
}
