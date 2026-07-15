import type { OpLogCategory, OpLogEntry } from '@/features/logs/types'

const SEED: Array<{
  actor: string
  action: string
  title: string
  category: OpLogCategory
  target?: string
  detail?: string
  minutesAgo: number
}> = [
  {
    actor: '城市指挥员',
    action: 'login',
    title: '登录平台',
    category: 'auth',
    detail: '账号 admin',
    minutesAgo: 180,
  },
  {
    actor: '城市指挥员',
    action: 'view_dashboard',
    title: '进入态势总览',
    category: 'system',
    minutesAgo: 178,
  },
  {
    actor: '城市指挥员',
    action: 'acknowledge',
    title: '确认告警',
    category: 'alert',
    target: '滨河路车流拥堵加剧',
    detail: '片区：滨江走廊',
    minutesAgo: 95,
  },
  {
    actor: '城市指挥员',
    action: 'ai_analyze',
    title: '发起 AI 事件分析',
    category: 'ai',
    target: '东城变电站功率超限',
    detail: '模拟模型 SCV-Sim-1.0',
    minutesAgo: 88,
  },
  {
    actor: '系统巡检',
    action: 'seed_sync',
    title: '同步演示日志种子',
    category: 'system',
    detail: '初始化操作审计队列',
    minutesAgo: 240,
  },
  {
    actor: '城市指挥员',
    action: 'select_building',
    title: '查看建筑详情',
    category: 'scene',
    target: '滨江塔',
    minutesAgo: 70,
  },
  {
    actor: '城市指挥员',
    action: 'weather_adjust',
    title: '调整仿真天气',
    category: 'scene',
    target: '雨天',
    detail: '手动切换天气模式',
    minutesAgo: 55,
  },
  {
    actor: '值班席 B',
    action: 'acknowledge',
    title: '确认告警',
    category: 'alert',
    target: '星港广场烟感误报待核验',
    minutesAgo: 42,
  },
  {
    actor: '城市指挥员',
    action: 'ai_analyze',
    title: '发起 AI 事件分析',
    category: 'ai',
    target: '轨道 2 号线换乘厅人流预警',
    minutesAgo: 36,
  },
  {
    actor: '值班席 B',
    action: 'login',
    title: '登录平台',
    category: 'auth',
    detail: '只读巡检会话（演示）',
    minutesAgo: 300,
  },
  {
    actor: '系统',
    action: 'ws_reconnect',
    title: '告警通道重连',
    category: 'system',
    detail: 'Mock WebSocket 恢复推送',
    minutesAgo: 28,
  },
  {
    actor: '城市指挥员',
    action: 'acknowledge',
    title: '确认告警',
    category: 'alert',
    target: '南区环境监测正常',
    minutesAgo: 18,
  },
  {
    actor: '城市指挥员',
    action: 'logout',
    title: '退出登录',
    category: 'auth',
    minutesAgo: 400,
  },
  {
    actor: '城市指挥员',
    action: 'login',
    title: '登录平台',
    category: 'auth',
    detail: '账号 admin',
    minutesAgo: 398,
  },
  {
    actor: '城市指挥员',
    action: 'refresh_metrics',
    title: '刷新大屏指标',
    category: 'system',
    minutesAgo: 12,
  },
]

/**
 * 生成演示用历史操作日志（按时间新→旧）。
 */
export function buildSeedOpLogs(now = Date.now()): OpLogEntry[] {
  return SEED.map((item, index) => ({
    id: `seed-log-${index + 1}`,
    actor: item.actor,
    action: item.action,
    title: item.title,
    category: item.category,
    target: item.target,
    detail: item.detail,
    createdAt: now - item.minutesAgo * 60_000,
  })).sort((a, b) => b.createdAt - a.createdAt)
}
