import { useOpLogStore } from '@/features/logs/stores/useOpLogStore'
import type { OpLogDraft } from '@/features/logs/types'

/**
 * 供其他模块轻量写入操作日志，无需订阅 React。
 */
export function appendOpLog(draft: OpLogDraft) {
  useOpLogStore.getState().appendLog(draft)
}
