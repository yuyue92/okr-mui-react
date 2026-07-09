export const departments = [
  {
    id: 'company',
    name: '星河科技',
    type: 'company',
    parentId: null,
    leaderId: 'u1',
    description: '公司级战略与经营目标'
  },
  {
    id: 'sales',
    name: '销售部',
    type: 'department',
    parentId: 'company',
    leaderId: 'u2',
    description: '负责销售增长、重点客户突破、回款与市场机会管理'
  },
  {
    id: 'product',
    name: '产品部',
    type: 'department',
    parentId: 'company',
    leaderId: 'u3',
    description: '负责产品规划、客户价值验证、体验改进和需求优先级'
  },
  {
    id: 'tech',
    name: '技术部',
    type: 'department',
    parentId: 'company',
    leaderId: 'u4',
    description: '负责平台架构、交付质量、性能稳定性和工程效率'
  },
  {
    id: 'cs',
    name: '客户成功部',
    type: 'department',
    parentId: 'company',
    leaderId: 'u5',
    description: '负责续费、客户健康度、交付满意度和风险客户挽回'
  }
]

export const users = [
  {
    id: 'u1',
    name: '林总',
    email: 'ceo@example.com',
    title: 'CEO',
    departmentId: 'company',
    role: 'admin',
    managerId: null,
    avatar: '林'
  },
  {
    id: 'u2',
    name: '陈晓',
    email: 'sales.lead@example.com',
    title: '销售总监',
    departmentId: 'sales',
    role: 'manager',
    managerId: 'u1',
    avatar: '陈'
  },
  {
    id: 'u3',
    name: '周宁',
    email: 'product.lead@example.com',
    title: '产品负责人',
    departmentId: 'product',
    role: 'manager',
    managerId: 'u1',
    avatar: '周'
  },
  {
    id: 'u4',
    name: '王宇',
    email: 'tech.lead@example.com',
    title: '技术负责人',
    departmentId: 'tech',
    role: 'manager',
    managerId: 'u1',
    avatar: '王'
  },
  {
    id: 'u5',
    name: '赵敏',
    email: 'cs.lead@example.com',
    title: '客户成功负责人',
    departmentId: 'cs',
    role: 'manager',
    managerId: 'u1',
    avatar: '赵'
  },
  {
    id: 'u6',
    name: '李航',
    email: 'frontend@example.com',
    title: '前端工程师',
    departmentId: 'tech',
    role: 'employee',
    managerId: 'u4',
    avatar: '李'
  },
  {
    id: 'u7',
    name: '孙雅',
    email: 'pm@example.com',
    title: '高级产品经理',
    departmentId: 'product',
    role: 'employee',
    managerId: 'u3',
    avatar: '孙'
  },
  {
    id: 'u8',
    name: '何川',
    email: 'sales@example.com',
    title: '企业客户经理',
    departmentId: 'sales',
    role: 'employee',
    managerId: 'u2',
    avatar: '何'
  }
]

export const cycles = [
  {
    id: 'cycle-2026-q3',
    name: '2026 Q3 OKR',
    type: 'quarter',
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    checkInFrequency: 'weekly',
    status: 'executing',
    description: '聚焦企业客户增长、续费质量、产品自助化和系统稳定性。'
  },
  {
    id: 'cycle-2026-q2',
    name: '2026 Q2 OKR',
    type: 'quarter',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    checkInFrequency: 'weekly',
    status: 'archived',
    description: '已归档周期，用于展示历史 OKR。'
  }
]

export const objectives = [
  {
    id: 'obj-company-growth',
    cycleId: 'cycle-2026-q3',
    title: '提升企业客户收入质量，形成可复制的增长闭环',
    description: '从线索、成交、交付、续费四个环节提升企业客户经营质量。',
    level: 'company',
    departmentId: 'company',
    ownerId: 'u1',
    participantIds: ['u2', 'u3', 'u4', 'u5'],
    alignedToObjectiveId: null,
    priority: 'P0',
    status: 'executing',
    visibility: 'company',
    tags: ['增长', '企业客户', '经营质量'],
    confidence: 'medium',
    risk: 'yellow',
    score: null,
    review: '',
    keyResults: [
      {
        id: 'kr-growth-1',
        title: '企业客户季度新增 ARR 从 500 万提升到 800 万',
        type: 'increase',
        unit: '万元',
        startValue: 500,
        targetValue: 800,
        currentValue: 650,
        weight: 40,
        ownerId: 'u2',
        confidence: 'medium',
        risk: 'yellow',
        dataSource: '销售 CRM 月度汇总'
      },
      {
        id: 'kr-growth-2',
        title: '重点客户续费率从 82% 提升到 90%',
        type: 'increase',
        unit: '%',
        startValue: 82,
        targetValue: 90,
        currentValue: 86,
        weight: 35,
        ownerId: 'u5',
        confidence: 'medium',
        risk: 'yellow',
        dataSource: '客户成功续费台账'
      },
      {
        id: 'kr-growth-3',
        title: '企业客户 NPS 从 36 提升到 50',
        type: 'increase',
        unit: '分',
        startValue: 36,
        targetValue: 50,
        currentValue: 41,
        weight: 25,
        ownerId: 'u3',
        confidence: 'low',
        risk: 'red',
        dataSource: '客户满意度问卷'
      }
    ],
    initiatives: [
      {
        id: 'init-growth-1',
        title: '建立企业客户健康度评分模型',
        ownerId: 'u5',
        status: 'doing',
        dueDate: '2026-08-15',
        relatedKrId: 'kr-growth-2'
      },
      {
        id: 'init-growth-2',
        title: '输出 Top 50 重点客户续费作战地图',
        ownerId: 'u2',
        status: 'todo',
        dueDate: '2026-08-01',
        relatedKrId: 'kr-growth-1'
      }
    ],
    checkIns: [
      {
        id: 'ci-growth-1',
        date: '2026-07-05',
        authorId: 'u5',
        summary: '续费风险客户已识别 12 家，其中 3 家需要销售总监介入。',
        confidence: 'medium',
        risk: 'yellow',
        nextPlan: '完成健康度模型第一版，并同步客户分层策略。'
      }
    ],
    comments: [
      {
        id: 'c-growth-1',
        authorId: 'u1',
        date: '2026-07-06',
        content: 'Q3 要优先盯住重点客户续费，不要只看新增收入。'
      }
    ]
  },
  {
    id: 'obj-sales-pipeline',
    cycleId: 'cycle-2026-q3',
    title: '提升重点行业客户成交率，沉淀行业打法',
    description: '围绕金融、制造、零售三类重点行业建立可复用销售方案。',
    level: 'department',
    departmentId: 'sales',
    ownerId: 'u2',
    participantIds: ['u8'],
    alignedToObjectiveId: 'obj-company-growth',
    priority: 'P0',
    status: 'executing',
    visibility: 'company',
    tags: ['销售', '行业方案'],
    confidence: 'high',
    risk: 'green',
    score: null,
    review: '',
    keyResults: [
      {
        id: 'kr-sales-1',
        title: '重点行业商机成交率从 21% 提升到 30%',
        type: 'increase',
        unit: '%',
        startValue: 21,
        targetValue: 30,
        currentValue: 26,
        weight: 50,
        ownerId: 'u2',
        confidence: 'high',
        risk: 'green',
        dataSource: '销售漏斗看板'
      },
      {
        id: 'kr-sales-2',
        title: '沉淀 3 套重点行业解决方案并完成销售培训',
        type: 'milestone',
        unit: '套',
        startValue: 0,
        targetValue: 3,
        currentValue: 2,
        weight: 30,
        ownerId: 'u8',
        confidence: 'high',
        risk: 'green',
        dataSource: '方案库与培训记录'
      },
      {
        id: 'kr-sales-3',
        title: '销售回款预测准确率达到 85%',
        type: 'increase',
        unit: '%',
        startValue: 65,
        targetValue: 85,
        currentValue: 73,
        weight: 20,
        ownerId: 'u2',
        confidence: 'medium',
        risk: 'yellow',
        dataSource: '财务回款数据'
      }
    ],
    initiatives: [
      {
        id: 'init-sales-1',
        title: '完成金融行业标杆客户复盘材料',
        ownerId: 'u8',
        status: 'done',
        dueDate: '2026-07-20',
        relatedKrId: 'kr-sales-2'
      },
      {
        id: 'init-sales-2',
        title: '建立回款预测周会机制',
        ownerId: 'u2',
        status: 'doing',
        dueDate: '2026-07-28',
        relatedKrId: 'kr-sales-3'
      }
    ],
    checkIns: [
      {
        id: 'ci-sales-1',
        date: '2026-07-07',
        authorId: 'u2',
        summary: '金融行业方案已成型，制造行业方案还需要产品支持补充案例。',
        confidence: 'high',
        risk: 'green',
        nextPlan: '推动产品部补充制造行业案例，并安排销售培训。'
      }
    ],
    comments: []
  },
  {
    id: 'obj-product-self-service',
    cycleId: 'cycle-2026-q3',
    title: '提升产品自助化能力，减少客户交付依赖',
    description: '重点优化企业客户从配置、使用到问题排查的自助能力。',
    level: 'department',
    departmentId: 'product',
    ownerId: 'u3',
    participantIds: ['u7', 'u4'],
    alignedToObjectiveId: 'obj-company-growth',
    priority: 'P1',
    status: 'risk',
    visibility: 'company',
    tags: ['产品体验', '自助化'],
    confidence: 'low',
    risk: 'red',
    score: null,
    review: '',
    keyResults: [
      {
        id: 'kr-product-1',
        title: '企业客户自助配置完成率达到 70%',
        type: 'increase',
        unit: '%',
        startValue: 35,
        targetValue: 70,
        currentValue: 48,
        weight: 45,
        ownerId: 'u7',
        confidence: 'low',
        risk: 'red',
        dataSource: '产品埋点'
      },
      {
        id: 'kr-product-2',
        title: '配置类支持工单数量降低 40%',
        type: 'decrease',
        unit: '单',
        startValue: 180,
        targetValue: 108,
        currentValue: 155,
        weight: 35,
        ownerId: 'u7',
        confidence: 'medium',
        risk: 'yellow',
        dataSource: '工单系统'
      },
      {
        id: 'kr-product-3',
        title: '完成 5 个高频配置向导上线',
        type: 'milestone',
        unit: '个',
        startValue: 0,
        targetValue: 5,
        currentValue: 2,
        weight: 20,
        ownerId: 'u3',
        confidence: 'medium',
        risk: 'yellow',
        dataSource: '发布记录'
      }
    ],
    initiatives: [
      {
        id: 'init-product-1',
        title: '梳理配置失败 Top 10 场景',
        ownerId: 'u7',
        status: 'doing',
        dueDate: '2026-07-25',
        relatedKrId: 'kr-product-1'
      },
      {
        id: 'init-product-2',
        title: '上线权限配置向导',
        ownerId: 'u4',
        status: 'blocked',
        dueDate: '2026-08-05',
        relatedKrId: 'kr-product-3'
      }
    ],
    checkIns: [
      {
        id: 'ci-product-1',
        date: '2026-07-08',
        authorId: 'u7',
        summary: '自助配置链路埋点已补齐，但权限配置向导依赖技术排期。',
        confidence: 'low',
        risk: 'red',
        nextPlan: '和技术部确认权限配置向导交付时间。'
      }
    ],
    comments: [
      {
        id: 'c-product-1',
        authorId: 'u5',
        date: '2026-07-08',
        content: '客户成功侧可以提供最近 30 天配置失败工单清单。'
      }
    ]
  },
  {
    id: 'obj-tech-stability',
    cycleId: 'cycle-2026-q3',
    title: '提升核心系统稳定性和交付质量',
    description: '降低线上事故和响应时间波动，为企业客户增长提供稳定底座。',
    level: 'department',
    departmentId: 'tech',
    ownerId: 'u4',
    participantIds: ['u6'],
    alignedToObjectiveId: 'obj-company-growth',
    priority: 'P0',
    status: 'executing',
    visibility: 'company',
    tags: ['稳定性', '工程效率'],
    confidence: 'medium',
    risk: 'yellow',
    score: null,
    review: '',
    keyResults: [
      {
        id: 'kr-tech-1',
        title: '核心接口 P95 响应时间从 900ms 降低到 350ms',
        type: 'decrease',
        unit: 'ms',
        startValue: 900,
        targetValue: 350,
        currentValue: 620,
        weight: 40,
        ownerId: 'u4',
        confidence: 'medium',
        risk: 'yellow',
        dataSource: 'APM 监控平台'
      },
      {
        id: 'kr-tech-2',
        title: '线上 P1/P2 故障数量从 8 次降低到 3 次以内',
        type: 'decrease',
        unit: '次',
        startValue: 8,
        targetValue: 3,
        currentValue: 5,
        weight: 35,
        ownerId: 'u4',
        confidence: 'medium',
        risk: 'yellow',
        dataSource: '故障复盘记录'
      },
      {
        id: 'kr-tech-3',
        title: '核心模块自动化测试覆盖率达到 70%',
        type: 'increase',
        unit: '%',
        startValue: 38,
        targetValue: 70,
        currentValue: 54,
        weight: 25,
        ownerId: 'u6',
        confidence: 'high',
        risk: 'green',
        dataSource: 'CI 覆盖率报告'
      }
    ],
    initiatives: [
      {
        id: 'init-tech-1',
        title: '完成核心接口慢查询治理',
        ownerId: 'u4',
        status: 'doing',
        dueDate: '2026-07-31',
        relatedKrId: 'kr-tech-1'
      },
      {
        id: 'init-tech-2',
        title: '补齐结算模块自动化测试',
        ownerId: 'u6',
        status: 'doing',
        dueDate: '2026-08-12',
        relatedKrId: 'kr-tech-3'
      }
    ],
    checkIns: [
      {
        id: 'ci-tech-1',
        date: '2026-07-06',
        authorId: 'u4',
        summary: '慢查询治理完成 60%，自动化测试覆盖率提升明显。',
        confidence: 'medium',
        risk: 'yellow',
        nextPlan: '继续压缩报表查询链路，并排查定时任务峰值。'
      }
    ],
    comments: []
  },
  {
    id: 'obj-my-frontend-quality',
    cycleId: 'cycle-2026-q3',
    title: '提升前端交付质量，降低企业客户配置成本',
    description: '围绕配置向导、错误提示、性能优化，提高前端交付稳定性。',
    level: 'personal',
    departmentId: 'tech',
    ownerId: 'u6',
    participantIds: [],
    alignedToObjectiveId: 'obj-tech-stability',
    priority: 'P1',
    status: 'executing',
    visibility: 'department',
    tags: ['前端', '质量', '体验'],
    confidence: 'high',
    risk: 'green',
    score: null,
    review: '',
    keyResults: [
      {
        id: 'kr-fe-1',
        title: '核心配置页面 JS 错误率降低 60%',
        type: 'decrease',
        unit: '次/千会话',
        startValue: 12,
        targetValue: 4.8,
        currentValue: 7.1,
        weight: 40,
        ownerId: 'u6',
        confidence: 'high',
        risk: 'green',
        dataSource: '前端监控'
      },
      {
        id: 'kr-fe-2',
        title: '配置向导页面首屏加载时间从 2.8s 降低到 1.5s',
        type: 'decrease',
        unit: 's',
        startValue: 2.8,
        targetValue: 1.5,
        currentValue: 1.9,
        weight: 35,
        ownerId: 'u6',
        confidence: 'high',
        risk: 'green',
        dataSource: 'Lighthouse + RUM'
      },
      {
        id: 'kr-fe-3',
        title: '完成 4 个高频配置组件复用改造',
        type: 'milestone',
        unit: '个',
        startValue: 0,
        targetValue: 4,
        currentValue: 3,
        weight: 25,
        ownerId: 'u6',
        confidence: 'high',
        risk: 'green',
        dataSource: '代码合并记录'
      }
    ],
    initiatives: [
      {
        id: 'init-fe-1',
        title: '接入配置页错误边界与异常上报',
        ownerId: 'u6',
        status: 'done',
        dueDate: '2026-07-12',
        relatedKrId: 'kr-fe-1'
      },
      {
        id: 'init-fe-2',
        title: '拆分配置向导首屏包体积',
        ownerId: 'u6',
        status: 'doing',
        dueDate: '2026-07-30',
        relatedKrId: 'kr-fe-2'
      }
    ],
    checkIns: [
      {
        id: 'ci-fe-1',
        date: '2026-07-05',
        authorId: 'u6',
        summary: '错误边界已上线，配置向导包体积拆分完成一半。',
        confidence: 'high',
        risk: 'green',
        nextPlan: '继续压缩图表组件异步加载体积。'
      }
    ],
    comments: []
  }
]

export const systemSettings = {
  enablePersonalOkr: true,
  requireManagerConfirm: true,
  enableKrWeight: true,
  defaultCheckInDay: 'Friday',
  scoreMethod: '0-1',
  riskWarningThreshold: 50,
  allowEditAfterPublish: true,
  forceReviewBeforeArchive: true
}
