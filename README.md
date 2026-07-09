# OKR Center - React.js 非 TS + MUI 第一版

这是一个使用 **React.js 非 TypeScript + MUI + Vite** 实现的 OKR 系统第一版演示项目。

当前版本只使用 `mock data`，不连接后端，适合先展示页面效果、业务流程和组件结构。后续可以把 `src/context/OkrContext.jsx` 中的数据操作替换成 Supabase、REST API 或其他后端服务。

## 已实现功能

- 模拟登录：选择不同用户身份进入系统
- 首页 Dashboard：目标数量、平均进度、风险目标、Check-in 动态
- 我的 OKR：我负责、我参与、本部门相关 OKR
- 部门 OKR：按部门查看目标、负责人、平均进度和风险
- OKR 详情页：
  - Objective 基础信息
  - Key Results 进度条
  - KR 当前值更新
  - 行动项 Initiative
  - Check-in 提交
  - Check-in 历史
  - 评论协作
- Check-in 更新页：集中更新本周进展、风险和信心指数
- 周期管理：展示周期、新建周期
- 组织架构：公司、部门、用户列表
- 报表中心：部门进度、层级分布、风险目标
- 系统配置：OKR 规则、评分方式、Check-in 默认日期
- 响应式布局：PC 优先，兼容窄屏 Drawer

## 技术栈

- React 18
- React Router 6
- MUI 5
- Vite 5
- JavaScript / JSX，非 TypeScript
- Mock Data + React Context

## 安装与启动

项目内已包含 `.npmrc`：

```bash
package-lock=false
```

所以执行安装时不会生成 `package-lock.json`。

```bash
npm install
npm run dev
```

默认访问：

```txt
http://localhost:5173
```

## 构建

```bash
npm run build
npm run preview
```

## 自检

项目内置了一个轻量文件结构自检脚本：

```bash
npm run check:files
```

它会检查关键文件是否存在、是否没有打包 `package-lock.json`、核心页面和 mock 数据是否齐全。

## 目录结构

```txt
src/
 ├── App.jsx
 ├── main.jsx
 ├── components/
 │   ├── ConfidenceChip.jsx
 │   ├── CreateObjectiveDialog.jsx
 │   ├── EmptyState.jsx
 │   ├── KrProgress.jsx
 │   ├── ObjectiveCard.jsx
 │   ├── PageHeader.jsx
 │   ├── RiskChip.jsx
 │   └── StatCard.jsx
 ├── context/
 │   └── OkrContext.jsx
 ├── data/
 │   └── mockData.js
 ├── layouts/
 │   └── MainLayout.jsx
 ├── pages/
 │   ├── CheckInPage.jsx
 │   ├── CyclesPage.jsx
 │   ├── DashboardPage.jsx
 │   ├── DepartmentOkrPage.jsx
 │   ├── LoginPage.jsx
 │   ├── MyOkrPage.jsx
 │   ├── NotFoundPage.jsx
 │   ├── OkrDetailPage.jsx
 │   ├── OrgPage.jsx
 │   ├── ReportsPage.jsx
 │   └── SettingsPage.jsx
 ├── theme/
 │   └── index.js
 └── utils/
     └── okrUtils.js
```

## 后续连接后端建议

第一步可以保留页面和组件，只替换数据层：

1. 新建 `src/services/okrApi.js`
2. 把 `OkrContext.jsx` 里的 mock state 改成接口请求
3. 按业务对象建表：
   - users
   - departments
   - okr_cycles
   - objectives
   - key_results
   - initiatives
   - checkins
   - comments
   - system_settings
4. 后端返回的数据结构尽量保持和 mock data 一致，前端改动最小

## 说明

当前版本用于演示 OKR 系统第一版效果，不包含真实认证、数据库、权限校验和持久化。刷新页面后，OKR 修改会恢复为 mock 初始数据。
