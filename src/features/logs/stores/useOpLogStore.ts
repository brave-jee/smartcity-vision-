import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OP_LOG_MAX, OP_LOG_STORAGE_KEY } from '@/features/logs/constants'
import { buildSeedOpLogs } from '@/features/logs/data/seedLogs'
import type { OpLogDraft, OpLogEntry } from '@/features/logs/types'

type OpLogState = {
  entries: OpLogEntry[]
  /** 追加一条操作日志（新→旧） */
  appendLog: (draft: OpLogDraft) => void
  clearLogs: () => void
}

let seq = 0

/**
 * 操作日志本地队列：演示环境持久化，便于跨刷新审计。
 */
export const useOpLogStore = create<OpLogState>()(
  persist(
    (set) => ({
      entries: buildSeedOpLogs(),

      appendLog(draft) {
        seq += 1
        const entry: OpLogEntry = {
          ...draft,
          id: `log-${Date.now()}-${seq}`,
          createdAt: Date.now(),
        }
        set((state) => ({
          entries: [entry, ...state.entries].slice(0, OP_LOG_MAX),
        }))
      },

      clearLogs() {
        set({ entries: buildSeedOpLogs() })
      },
    }),
    {
      name: OP_LOG_STORAGE_KEY,
      partialize: (state) => ({ entries: state.entries }),
    },
  ),
)
