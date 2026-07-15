import type { OpLogCategory } from '@/features/logs/types'

export const OP_LOG_STORAGE_KEY = 'smartcity-op-logs'

/** 本地队列上限 */
export const OP_LOG_MAX = 200

export const OP_LOG_PAGE_SIZE = 10

export const OP_LOG_CATEGORY_LABEL: Record<OpLogCategory | 'all', string> = {
  all: '全部',
  auth: '登录鉴权',
  alert: '告警处置',
  ai: 'AI 分析',
  scene: '场景交互',
  system: '系统',
}

export const OP_LOG_CATEGORY_OPTIONS: Array<OpLogCategory | 'all'> = [
  'all',
  'auth',
  'alert',
  'ai',
  'scene',
  'system',
]
