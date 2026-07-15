import type { OpLogCategory } from '@/features/logs/types'

export const OP_LOG_STORAGE_KEY = 'smartcity-op-logs'

/** 本地队列上限 */
export const OP_LOG_MAX = 200

export const OP_LOG_PAGE_SIZE = 10

export const OP_LOG_CATEGORY_OPTIONS: Array<OpLogCategory | 'all'> = [
  'all',
  'auth',
  'alert',
  'ai',
  'scene',
  'system',
]
