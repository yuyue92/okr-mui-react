import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const requiredFiles = [
  'package.json',
  '.npmrc',
  'index.html',
  'vite.config.js',
  'src/main.jsx',
  'src/App.jsx',
  'src/context/OkrContext.jsx',
  'src/data/mockData.js',
  'src/layouts/MainLayout.jsx',
  'src/pages/LoginPage.jsx',
  'src/pages/DashboardPage.jsx',
  'src/pages/MyOkrPage.jsx',
  'src/pages/DepartmentOkrPage.jsx',
  'src/pages/OkrDetailPage.jsx',
  'src/pages/CheckInPage.jsx',
  'src/pages/CyclesPage.jsx',
  'src/pages/OrgPage.jsx',
  'src/pages/ReportsPage.jsx',
  'src/pages/SettingsPage.jsx',
  'src/utils/okrUtils.js'
]

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))

if (missing.length) {
  console.error('缺少关键文件：')
  for (const file of missing) console.error(`- ${file}`)
  process.exit(1)
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const deps = packageJson.dependencies || {}
const requiredDeps = ['react', 'react-dom', 'vite', '@vitejs/plugin-react', '@mui/material', '@emotion/react', '@emotion/styled', 'react-router-dom']
const missingDeps = requiredDeps.filter((dep) => !deps[dep])

if (missingDeps.length) {
  console.error('缺少关键依赖：')
  for (const dep of missingDeps) console.error(`- ${dep}`)
  process.exit(1)
}

const forbiddenLocks = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'].filter((file) => fs.existsSync(path.join(root, file)))
if (forbiddenLocks.length) {
  console.error('发现锁文件，当前模板要求不打包锁文件：')
  for (const file of forbiddenLocks) console.error(`- ${file}`)
  process.exit(1)
}

const mockData = fs.readFileSync(path.join(root, 'src/data/mockData.js'), 'utf8')
for (const token of ['export const departments', 'export const users', 'export const cycles', 'export const objectives']) {
  if (!mockData.includes(token)) {
    console.error(`mockData.js 缺少：${token}`)
    process.exit(1)
  }
}

console.log('OKR Center 自检通过：关键文件、依赖声明、mock 数据和锁文件规则均正常。')
