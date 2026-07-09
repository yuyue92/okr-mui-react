import { Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export default function PageHeader({ title, description, breadcrumbs = [], action }) {
  return (
    <Box sx={{ mb: 3 }}>
      {!!breadcrumbs.length && (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 1 }}>
          {breadcrumbs.map((item) => (
            <Typography key={item} variant="body2" color="text.secondary">
              {item}
            </Typography>
          ))}
        </Breadcrumbs>
      )}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}>
        <Box>
          <Typography variant="h4" sx={{ mb: 0.75 }}>
            {title}
          </Typography>
          {description && (
            <Typography color="text.secondary" sx={{ maxWidth: 880 }}>
              {description}
            </Typography>
          )}
        </Box>
        {action && <Box>{action}</Box>}
      </Stack>
    </Box>
  )
}
