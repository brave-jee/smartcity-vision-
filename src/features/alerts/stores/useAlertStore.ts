import { create } from 'zustand'
import { ALERT_LIST_MAX } from '@/features/alerts/constants'
import type { AlertConnectionStatus, CityAlert } from '@/features/alerts/types'

type AlertState = {
  /** 实时告警列表（新 → 旧） */
  alerts: CityAlert[]
  /** 未读条数（新推送累加，确认/全部已读清零） */
  unreadCount: number
  /** 模拟 WS 连接状态 */
  connectionStatus: AlertConnectionStatus
  /** 最近一次心跳时间戳 */
  lastHeartbeatAt: number | null
  /** 写入一条推送告警 */
  pushAlert: (alert: CityAlert) => void
  /** 确认单条告警 */
  acknowledgeAlert: (id: string) => void
  /** 全部标为已读并清零角标 */
  markAllRead: () => void
  /** 更新连接状态 */
  setConnectionStatus: (status: AlertConnectionStatus) => void
  /** 记录心跳 */
  setHeartbeat: (serverTime: number) => void
  /** 清空列表（断开时可选） */
  resetAlerts: () => void
}

/**
 * 实时告警状态：由 MockAlertSocket 推送驱动。
 */
export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  unreadCount: 0,
  connectionStatus: 'idle',
  lastHeartbeatAt: null,

  pushAlert(alert) {
    set((state) => ({
      alerts: [alert, ...state.alerts].slice(0, ALERT_LIST_MAX),
      unreadCount: state.unreadCount + 1,
    }))
  },

  acknowledgeAlert(id) {
    set((state) => {
      const next = state.alerts.map((item) =>
        item.id === id ? { ...item, acknowledged: true } : item,
      )
      const wasUnread = state.alerts.some((item) => item.id === id && !item.acknowledged)
      return {
        alerts: next,
        unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
      }
    })
  },

  markAllRead() {
    set((state) => ({
      alerts: state.alerts.map((item) => ({ ...item, acknowledged: true })),
      unreadCount: 0,
    }))
  },

  setConnectionStatus(status) {
    set({ connectionStatus: status })
  },

  setHeartbeat(serverTime) {
    set({ lastHeartbeatAt: serverTime })
  },

  resetAlerts() {
    set({
      alerts: [],
      unreadCount: 0,
      lastHeartbeatAt: null,
    })
  },
}))
