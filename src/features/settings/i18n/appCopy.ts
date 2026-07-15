import type { AlertConnectionStatus, AlertLevel } from '@/features/alerts/types'
import type { OpLogCategory } from '@/features/logs/types'
import type { AppLocale } from '@/features/settings/types'
import type { DayPhase, WeatherKind } from '@/features/weather/types'

type ShellCopy = {
  loggedIn: string
  navOverview: string
  navLogs: string
  navSettings: string
  navAria: string
  logout: string
}

type DashboardCopy = {
  title: string
  loadingMetrics: string
  waitingData: string
  simulating: (time: string) => string
  refresh: string
  metricsLoading: string
  chartsLoading: string
  alertsHint: string
  alarmPending: (n: number) => string
  alarmClear: string
  alarmRealtime: string
  metricPopulation: string
  metricEnergy: string
  metricTraffic: string
  metricAlarms: string
}

type SceneCopy = {
  loading: string
  hint: string
  controls: string
}

type AlertsCopy = {
  waiting: string
  analyze: string
  analyzing: string
  confirm: string
  confirmed: string
  markAllRead: string
  reconnect: string
  levelCritical: string
  levelWarning: string
  levelInfo: string
  statusConnected: string
  statusConnecting: string
  statusDisconnected: string
  statusIdle: string
  justNow: string
  secondsAgo: (n: number) => string
  minutesAgo: (n: number) => string
}

type AiCopy = {
  simulated: string
  gathering: string
  failed: string
  retry: string
  summary: string
  risks: string
  actions: string
  reanalyze: string
  close: string
  confidence: (pct: string) => string
}

type LogsCopy = {
  title: string
  subtitle: string
  total: (n: number) => string
  searchPlaceholder: string
  searchAria: string
  empty: string
  page: (page: number, totalPages: number) => string
  prev: string
  next: string
  colTime: string
  colCategory: string
  colAction: string
  colActor: string
  colTarget: string
  categoryAll: string
  categoryAuth: string
  categoryAlert: string
  categoryAi: string
  categoryScene: string
  categorySystem: string
}

type WeatherCopy = {
  simTime: string
  clear: string
  cloudy: string
  rain: string
  fog: string
  autoOn: string
  autoOff: string
  phaseDawn: string
  phaseDay: string
  phaseDusk: string
  phaseNight: string
}

type BuildingCopy = {
  close: string
  statusCritical: string
  statusWarning: string
  statusNormal: string
  floors: (n: number) => string
  energy: string
  occupancy: string
}

type SettingsCopy = {
  title: string
  subtitle: string
  sectionRender: string
  sectionScene: string
  sectionPrefs: string
  quality: string
  qualityHint: string
  fx: string
  vehicles: string
  autoDayNight: string
  autoDayNightHint: string
  sound: string
  soundHint: string
  locale: string
  localeHint: string
  reset: string
  on: string
  off: string
}

export type AppCopy = {
  shell: ShellCopy
  dashboard: DashboardCopy
  scene: SceneCopy
  alerts: AlertsCopy
  ai: AiCopy
  logs: LogsCopy
  weather: WeatherCopy
  building: BuildingCopy
  settings: SettingsCopy
}

const ZH: AppCopy = {
  shell: {
    loggedIn: '已登录',
    navOverview: '态势总览',
    navLogs: '操作日志',
    navSettings: '系统设置',
    navAria: '主导航',
    logout: '退出登录',
  },
  dashboard: {
    title: '城市态势总览',
    loadingMetrics: '正在加载指标…',
    waitingData: '等待数据',
    simulating: (time) => `指标模拟中 · 更新于 ${time}`,
    refresh: '刷新指标',
    metricsLoading: '指标加载中…',
    chartsLoading: '统计图表加载中…',
    alertsHint: '点「AI 分析」查看模拟研判',
    alarmPending: (n) => `待处置 ${n}`,
    alarmClear: '全部清空',
    alarmRealtime: '实时',
    metricPopulation: '实时人流',
    metricEnergy: '区域能耗',
    metricTraffic: '路网畅通',
    metricAlarms: '待处置告警',
  },
  scene: {
    loading: '三维场景加载中…',
    hint: '告警飞线联动 · 点击建筑查看详情',
    controls: '拖拽旋转 · 滚轮缩放 · 再点取消',
  },
  alerts: {
    waiting: '等待告警推送…',
    analyze: 'AI 分析',
    analyzing: '分析中…',
    confirm: '确认',
    confirmed: '已确认',
    markAllRead: '全部已读',
    reconnect: '重连',
    levelCritical: '严重',
    levelWarning: '警告',
    levelInfo: '提示',
    statusConnected: '实时推送中',
    statusConnecting: '连接中…',
    statusDisconnected: '已断开',
    statusIdle: '未连接',
    justNow: '刚刚',
    secondsAgo: (n) => `${n} 秒前`,
    minutesAgo: (n) => `${n} 分钟前`,
  },
  ai: {
    simulated: '模拟推理 · 非真实模型',
    gathering: '正在汇聚多源信号…',
    failed: '分析失败',
    retry: '重试',
    summary: '摘要',
    risks: '风险研判',
    actions: '处置建议',
    reanalyze: '重新分析',
    close: '关闭',
    confidence: (pct) => `置信度 ${pct}`,
  },
  logs: {
    title: '操作日志',
    subtitle: '谁做了什么 · 本地演示队列（可筛选分页）',
    total: (n) => ` · 共 ${n} 条`,
    searchPlaceholder: '搜索操作人 / 标题 / 对象',
    searchAria: '搜索日志',
    empty: '暂无匹配的操作日志',
    page: (page, totalPages) => `第 ${page} / ${totalPages} 页`,
    prev: '上一页',
    next: '下一页',
    colTime: '时间',
    colCategory: '分类',
    colAction: '操作',
    colActor: '操作人',
    colTarget: '对象 / 说明',
    categoryAll: '全部',
    categoryAuth: '登录鉴权',
    categoryAlert: '告警处置',
    categoryAi: 'AI 分析',
    categoryScene: '场景交互',
    categorySystem: '系统',
  },
  weather: {
    simTime: '仿真时刻',
    clear: '晴朗',
    cloudy: '多云',
    rain: '降雨',
    fog: '雾霾',
    autoOn: '自动流逝中 · 点击暂停',
    autoOff: '开启自动昼夜流逝',
    phaseDawn: '黎明',
    phaseDay: '白昼',
    phaseDusk: '黄昏',
    phaseNight: '夜晚',
  },
  building: {
    close: '关闭',
    statusCritical: '危急',
    statusWarning: '预警',
    statusNormal: '正常',
    floors: (n) => `${n} 层`,
    energy: '实时能耗',
    occupancy: '入住率',
  },
  settings: {
    title: '系统设置',
    subtitle: '画质、特效与本地偏好 · 自动保存到本机',
    sectionRender: '渲染与性能',
    sectionScene: '场景图层',
    sectionPrefs: '偏好',
    quality: '渲染画质',
    qualityHint: '低档可减轻笔记本压力；高档细节更清晰',
    fx: '飞线与粒子特效',
    vehicles: '车辆巡航',
    autoDayNight: '昼夜自动流逝',
    autoDayNightHint: '与天气面板联动，开启后场景时间自动推进',
    sound: '界面音效',
    soundHint: '演示阶段暂无音频资源，开关仅作预留',
    locale: '界面语言',
    localeHint: '切换后顶栏、大屏壳层、日志与设置文案会立即更新；模拟告警内容仍为演示数据',
    reset: '恢复默认',
    on: '开',
    off: '关',
  },
}

const EN: AppCopy = {
  shell: {
    loggedIn: 'Signed in',
    navOverview: 'Overview',
    navLogs: 'Op Logs',
    navSettings: 'Settings',
    navAria: 'Main navigation',
    logout: 'Sign out',
  },
  dashboard: {
    title: 'City Situation Overview',
    loadingMetrics: 'Loading metrics…',
    waitingData: 'Waiting for data',
    simulating: (time) => `Live simulation · updated ${time}`,
    refresh: 'Refresh metrics',
    metricsLoading: 'Loading metrics…',
    chartsLoading: 'Loading charts…',
    alertsHint: 'Tap “AI Analyze” for simulated insight',
    alarmPending: (n) => `${n} pending`,
    alarmClear: 'All clear',
    alarmRealtime: 'Live',
    metricPopulation: 'Live footfall',
    metricEnergy: 'District energy',
    metricTraffic: 'Road fluency',
    metricAlarms: 'Open alerts',
  },
  scene: {
    loading: 'Loading 3D scene…',
    hint: 'Alert flylines · click a building for details',
    controls: 'Drag to orbit · scroll to zoom · click again to clear',
  },
  alerts: {
    waiting: 'Waiting for alerts…',
    analyze: 'AI Analyze',
    analyzing: 'Analyzing…',
    confirm: 'Ack',
    confirmed: 'Acked',
    markAllRead: 'Mark all read',
    reconnect: 'Reconnect',
    levelCritical: 'Critical',
    levelWarning: 'Warning',
    levelInfo: 'Info',
    statusConnected: 'Live stream',
    statusConnecting: 'Connecting…',
    statusDisconnected: 'Disconnected',
    statusIdle: 'Idle',
    justNow: 'Just now',
    secondsAgo: (n) => `${n}s ago`,
    minutesAgo: (n) => `${n}m ago`,
  },
  ai: {
    simulated: 'Simulated · not a real model',
    gathering: 'Aggregating multi-source signals…',
    failed: 'Analysis failed',
    retry: 'Retry',
    summary: 'Summary',
    risks: 'Risk assessment',
    actions: 'Recommended actions',
    reanalyze: 'Re-analyze',
    close: 'Close',
    confidence: (pct) => `Confidence ${pct}`,
  },
  logs: {
    title: 'Operation Logs',
    subtitle: 'Who did what · local demo queue with filters',
    total: (n) => ` · ${n} total`,
    searchPlaceholder: 'Search actor / title / target',
    searchAria: 'Search logs',
    empty: 'No matching logs',
    page: (page, totalPages) => `Page ${page} / ${totalPages}`,
    prev: 'Previous',
    next: 'Next',
    colTime: 'Time',
    colCategory: 'Category',
    colAction: 'Action',
    colActor: 'Actor',
    colTarget: 'Target / note',
    categoryAll: 'All',
    categoryAuth: 'Auth',
    categoryAlert: 'Alerts',
    categoryAi: 'AI',
    categoryScene: 'Scene',
    categorySystem: 'System',
  },
  weather: {
    simTime: 'Simulated hour',
    clear: 'Clear',
    cloudy: 'Cloudy',
    rain: 'Rain',
    fog: 'Fog',
    autoOn: 'Auto cycling · tap to pause',
    autoOff: 'Enable auto day-night',
    phaseDawn: 'Dawn',
    phaseDay: 'Day',
    phaseDusk: 'Dusk',
    phaseNight: 'Night',
  },
  building: {
    close: 'Close',
    statusCritical: 'Critical',
    statusWarning: 'Warning',
    statusNormal: 'Normal',
    floors: (n) => `${n} floors`,
    energy: 'Live energy',
    occupancy: 'Occupancy',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Quality, effects and preferences · saved locally',
    sectionRender: 'Render & Performance',
    sectionScene: 'Scene Layers',
    sectionPrefs: 'Preferences',
    quality: 'Render quality',
    qualityHint: 'Use Low on laptops; High for sharper detail',
    fx: 'Flylines & particles',
    vehicles: 'Vehicle patrol',
    autoDayNight: 'Auto day-night cycle',
    autoDayNightHint: 'Syncs with the weather panel clock',
    sound: 'UI sound',
    soundHint: 'No audio assets yet — toggle is reserved',
    locale: 'Language',
    localeHint:
      'Updates chrome, dashboard shell, logs and settings immediately; mock alert payloads stay demo Chinese',
    reset: 'Reset defaults',
    on: 'On',
    off: 'Off',
  },
}

const BY_LOCALE: Record<AppLocale, AppCopy> = {
  'zh-CN': ZH,
  en: EN,
}

export function getAppCopy(locale: AppLocale): AppCopy {
  return BY_LOCALE[locale]
}

export function getOpLogCategoryLabel(copy: AppCopy, category: OpLogCategory | 'all') {
  if (category === 'all') return copy.logs.categoryAll
  if (category === 'auth') return copy.logs.categoryAuth
  if (category === 'alert') return copy.logs.categoryAlert
  if (category === 'ai') return copy.logs.categoryAi
  if (category === 'scene') return copy.logs.categoryScene
  return copy.logs.categorySystem
}

export function getAlertLevelLabel(copy: AppCopy, level: AlertLevel) {
  if (level === 'critical') return copy.alerts.levelCritical
  if (level === 'warning') return copy.alerts.levelWarning
  return copy.alerts.levelInfo
}

export function getAlertStatusLabel(copy: AppCopy, status: AlertConnectionStatus) {
  if (status === 'connected') return copy.alerts.statusConnected
  if (status === 'connecting') return copy.alerts.statusConnecting
  if (status === 'disconnected') return copy.alerts.statusDisconnected
  return copy.alerts.statusIdle
}

export function getWeatherLabel(copy: AppCopy, kind: WeatherKind) {
  if (kind === 'clear') return copy.weather.clear
  if (kind === 'cloudy') return copy.weather.cloudy
  if (kind === 'rain') return copy.weather.rain
  return copy.weather.fog
}

export function getDayPhaseCopy(copy: AppCopy, phase: DayPhase) {
  if (phase === 'dawn') return copy.weather.phaseDawn
  if (phase === 'day') return copy.weather.phaseDay
  if (phase === 'dusk') return copy.weather.phaseDusk
  return copy.weather.phaseNight
}

export function formatAlertRelativeTimeLocalized(
  copy: AppCopy,
  locale: AppLocale,
  createdAt: number,
  now = Date.now(),
) {
  const diffSec = Math.max(0, Math.floor((now - createdAt) / 1000))
  if (diffSec < 5) return copy.alerts.justNow
  if (diffSec < 60) return copy.alerts.secondsAgo(diffSec)
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return copy.alerts.minutesAgo(diffMin)
  return new Date(createdAt).toLocaleTimeString(locale, { hour12: false })
}

export function getMetricLabel(copy: AppCopy, id: string) {
  if (id === 'population') return copy.dashboard.metricPopulation
  if (id === 'energy') return copy.dashboard.metricEnergy
  if (id === 'traffic') return copy.dashboard.metricTraffic
  if (id === 'alarms') return copy.dashboard.metricAlarms
  return id
}
