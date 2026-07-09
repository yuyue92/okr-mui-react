import React from 'react'
import { cycles as initialCycles, departments, objectives as initialObjectives, systemSettings, users } from '../data/mockData.js'
import { calcObjectiveProgress } from '../utils/okrUtils.js'

const OkrContext = React.createContext(null)

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
}

function getStoredUserId() {
  return localStorage.getItem('okr-current-user-id') || ''
}

export function OkrProvider({ children }) {
  const [currentUserId, setCurrentUserId] = React.useState(getStoredUserId)
  const [cycles, setCycles] = React.useState(initialCycles)
  const [objectives, setObjectives] = React.useState(initialObjectives)
  const [settings, setSettings] = React.useState(systemSettings)

  const currentUser = React.useMemo(
    () => users.find((user) => user.id === currentUserId) || null,
    [currentUserId]
  )

  const activeCycle = React.useMemo(
    () => cycles.find((cycle) => cycle.status === 'executing') || cycles[0],
    [cycles]
  )

  const login = (userId) => {
    localStorage.setItem('okr-current-user-id', userId)
    setCurrentUserId(userId)
  }

  const logout = () => {
    localStorage.removeItem('okr-current-user-id')
    setCurrentUserId('')
  }

  const getUser = React.useCallback((userId) => users.find((user) => user.id === userId) || null, [])
  const getDepartment = React.useCallback(
    (departmentId) => departments.find((department) => department.id === departmentId) || null,
    []
  )

  const updateKrValue = (objectiveId, krId, nextValue) => {
    setObjectives((prev) =>
      prev.map((objective) => {
        if (objective.id !== objectiveId) return objective
        return {
          ...objective,
          keyResults: objective.keyResults.map((kr) =>
            kr.id === krId ? { ...kr, currentValue: Number(nextValue) } : kr
          )
        }
      })
    )
  }

  const updateObjectiveRisk = (objectiveId, risk, confidence) => {
    setObjectives((prev) =>
      prev.map((objective) =>
        objective.id === objectiveId
          ? {
              ...objective,
              risk,
              confidence,
              status: risk === 'red' ? 'risk' : objective.status === 'risk' ? 'executing' : objective.status
            }
          : objective
      )
    )
  }

  const addCheckIn = (objectiveId, payload) => {
    setObjectives((prev) =>
      prev.map((objective) => {
        if (objective.id !== objectiveId) return objective
        const checkIn = {
          id: makeId('ci'),
          date: new Date().toISOString().slice(0, 10),
          authorId: currentUserId,
          summary: payload.summary,
          confidence: payload.confidence,
          risk: payload.risk,
          nextPlan: payload.nextPlan
        }
        return {
          ...objective,
          confidence: payload.confidence,
          risk: payload.risk,
          status: payload.risk === 'red' ? 'risk' : 'executing',
          checkIns: [checkIn, ...(objective.checkIns || [])]
        }
      })
    )
  }

  const addComment = (objectiveId, content) => {
    if (!content.trim()) return
    setObjectives((prev) =>
      prev.map((objective) => {
        if (objective.id !== objectiveId) return objective
        const comment = {
          id: makeId('comment'),
          authorId: currentUserId,
          date: new Date().toISOString().slice(0, 10),
          content: content.trim()
        }
        return {
          ...objective,
          comments: [comment, ...(objective.comments || [])]
        }
      })
    )
  }

  const createObjective = (payload) => {
    const owner = users.find((user) => user.id === payload.ownerId) || currentUser
    const objective = {
      id: makeId('obj'),
      cycleId: activeCycle.id,
      title: payload.title,
      description: payload.description,
      level: payload.level,
      departmentId: owner?.departmentId || 'company',
      ownerId: payload.ownerId || currentUserId,
      participantIds: [],
      alignedToObjectiveId: payload.alignedToObjectiveId || null,
      priority: payload.priority || 'P1',
      status: 'executing',
      visibility: payload.visibility || 'company',
      tags: payload.tags ? payload.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
      confidence: 'medium',
      risk: 'yellow',
      score: null,
      review: '',
      keyResults: [
        {
          id: makeId('kr'),
          title: payload.krTitle || '请补充第一个关键结果',
          type: payload.krType || 'increase',
          unit: payload.unit || '%',
          startValue: Number(payload.startValue || 0),
          targetValue: Number(payload.targetValue || 100),
          currentValue: Number(payload.currentValue || 0),
          weight: 100,
          ownerId: payload.ownerId || currentUserId,
          confidence: 'medium',
          risk: 'yellow',
          dataSource: '手动更新'
        }
      ],
      initiatives: [],
      checkIns: [],
      comments: []
    }
    setObjectives((prev) => [objective, ...prev])
    return objective.id
  }

  const addCycle = (payload) => {
    const cycle = {
      id: makeId('cycle'),
      name: payload.name,
      type: payload.type || 'quarter',
      startDate: payload.startDate,
      endDate: payload.endDate,
      checkInFrequency: payload.checkInFrequency || 'weekly',
      status: 'draft',
      description: payload.description || ''
    }
    setCycles((prev) => [cycle, ...prev])
  }

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const dashboardStats = React.useMemo(() => {
    const activeObjectives = objectives.filter((objective) => objective.cycleId === activeCycle.id)
    const total = activeObjectives.length
    const avgProgress = total
      ? Math.round(activeObjectives.reduce((sum, item) => sum + calcObjectiveProgress(item), 0) / total)
      : 0
    const redRisks = activeObjectives.filter((item) => item.risk === 'red').length
    const yellowRisks = activeObjectives.filter((item) => item.risk === 'yellow').length
    const checkIns = activeObjectives.reduce((sum, item) => sum + (item.checkIns?.length || 0), 0)

    return { total, avgProgress, redRisks, yellowRisks, checkIns }
  }, [objectives, activeCycle])

  const value = {
    users,
    departments,
    cycles,
    objectives,
    settings,
    currentUser,
    activeCycle,
    dashboardStats,
    login,
    logout,
    getUser,
    getDepartment,
    updateKrValue,
    updateObjectiveRisk,
    addCheckIn,
    addComment,
    createObjective,
    addCycle,
    updateSetting
  }

  return <OkrContext.Provider value={value}>{children}</OkrContext.Provider>
}

export function useOkr() {
  const ctx = React.useContext(OkrContext)
  if (!ctx) {
    throw new Error('useOkr must be used within OkrProvider')
  }
  return ctx
}
