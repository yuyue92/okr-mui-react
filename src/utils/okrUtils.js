export function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value))
}

export function calcKrProgress(kr) {
  if (!kr) return 0
  const { type, startValue, targetValue, currentValue } = kr

  if (type === 'decrease') {
    const distance = startValue - targetValue
    if (distance === 0) return currentValue <= targetValue ? 100 : 0
    return clamp(((startValue - currentValue) / distance) * 100)
  }

  const distance = targetValue - startValue
  if (distance === 0) return currentValue >= targetValue ? 100 : 0
  return clamp(((currentValue - startValue) / distance) * 100)
}

export function calcObjectiveProgress(objective) {
  if (!objective?.keyResults?.length) return 0
  const totalWeight = objective.keyResults.reduce((sum, kr) => sum + Number(kr.weight || 0), 0) || 100
  const weighted = objective.keyResults.reduce((sum, kr) => {
    return sum + calcKrProgress(kr) * (Number(kr.weight || 0) / totalWeight)
  }, 0)
  return Math.round(weighted)
}

export function getRiskLabel(risk) {
  const map = {
    green: '正常',
    yellow: '关注',
    red: '高风险'
  }
  return map[risk] || '未知'
}

export function getConfidenceLabel(confidence) {
  const map = {
    high: '高信心',
    medium: '中信心',
    low: '低信心'
  }
  return map[confidence] || '未设置'
}

export function getStatusLabel(status) {
  const map = {
    draft: '草稿',
    pending: '待确认',
    published: '已发布',
    executing: '执行中',
    risk: '有风险',
    scoring: '评分中',
    reviewing: '复盘中',
    archived: '已归档',
    cancelled: '已取消',
    todo: '未开始',
    doing: '进行中',
    blocked: '阻塞',
    done: '已完成'
  }
  return map[status] || status
}

export function getLevelLabel(level) {
  const map = {
    company: '公司级',
    department: '部门级',
    personal: '个人级'
  }
  return map[level] || level
}

export function formatPercent(value) {
  return `${Math.round(value)}%`
}

export function formatDate(dateString) {
  if (!dateString) return '-'
  return dateString.replaceAll('-', '/')
}

export function findObjectiveById(objectives, objectiveId) {
  return objectives.find((item) => item.id === objectiveId) || null
}

export function getObjectiveStats(objectives) {
  const active = objectives.filter((item) => item.status !== 'archived')
  const total = active.length
  const avgProgress = total
    ? Math.round(active.reduce((sum, item) => sum + calcObjectiveProgress(item), 0) / total)
    : 0
  const riskCount = active.filter((item) => item.risk === 'red' || item.status === 'risk').length
  const yellowCount = active.filter((item) => item.risk === 'yellow').length
  const checkInCount = active.reduce((sum, item) => sum + (item.checkIns?.length || 0), 0)

  return {
    total,
    avgProgress,
    riskCount,
    yellowCount,
    checkInCount
  }
}
