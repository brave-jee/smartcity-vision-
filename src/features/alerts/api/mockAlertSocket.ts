import {
  ALERT_PUSH_MAX_MS,
  ALERT_PUSH_MIN_MS,
  ALERT_RECONNECT_MS,
} from '@/features/alerts/constants'
import { createMockAlert } from '@/features/alerts/data/alertTemplates'
import type { AlertConnectionStatus, AlertSocketPacket } from '@/features/alerts/types'

type MessageHandler = (packet: AlertSocketPacket) => void
type StatusHandler = (status: AlertConnectionStatus) => void

/**
 * 前端 Mock「类 WebSocket」告警通道。
 * 接口刻意贴近原生 WebSocket（connect / close / onMessage），
 * 日后可替换为 `new WebSocket(url)`，业务层几乎不用改。
 */
export class MockAlertSocket {
  private messageHandlers = new Set<MessageHandler>()
  private statusHandlers = new Set<StatusHandler>()
  private pushTimer: number | null = null
  private reconnectTimer: number | null = null
  private heartbeatTimer: number | null = null
  private status: AlertConnectionStatus = 'idle'
  private intentionallyClosed = false

  get connectionStatus() {
    return this.status
  }

  onMessage(handler: MessageHandler) {
    this.messageHandlers.add(handler)
    return () => {
      this.messageHandlers.delete(handler)
    }
  }

  onStatus(handler: StatusHandler) {
    this.statusHandlers.add(handler)
    handler(this.status)
    return () => {
      this.statusHandlers.delete(handler)
    }
  }

  /** 建立连接：短暂 connecting 后进入 connected，并开始推流 */
  connect() {
    this.intentionallyClosed = false
    this.clearReconnect()
    this.setStatus('connecting')

    window.setTimeout(() => {
      if (this.intentionallyClosed) return
      this.setStatus('connected')
      this.scheduleNextPush()
      this.startHeartbeat()
      // 入场先推一条，避免空白列表
      this.emit({ type: 'alert', payload: createMockAlert() })
    }, 420)
  }

  /** 主动关闭（不会自动重连） */
  close() {
    this.intentionallyClosed = true
    this.clearTimers()
    this.setStatus('disconnected')
  }

  /** 模拟掉线后自动重连（可暴露给「重连」按钮） */
  reconnect() {
    this.close()
    this.intentionallyClosed = false
    this.setStatus('connecting')
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null
      this.connect()
    }, ALERT_RECONNECT_MS)
  }

  private scheduleNextPush() {
    this.clearPush()
    if (this.status !== 'connected') return

    const wait = ALERT_PUSH_MIN_MS + Math.random() * (ALERT_PUSH_MAX_MS - ALERT_PUSH_MIN_MS)

    this.pushTimer = window.setTimeout(() => {
      this.pushTimer = null
      if (this.status !== 'connected') return
      this.emit({ type: 'alert', payload: createMockAlert() })
      this.scheduleNextPush()
    }, wait)
  }

  private startHeartbeat() {
    this.clearHeartbeat()
    this.heartbeatTimer = window.setInterval(() => {
      if (this.status !== 'connected') return
      this.emit({ type: 'heartbeat', serverTime: Date.now() })
    }, 12000)
  }

  private emit(packet: AlertSocketPacket) {
    this.messageHandlers.forEach((handler) => {
      handler(packet)
    })
  }

  private setStatus(status: AlertConnectionStatus) {
    this.status = status
    this.statusHandlers.forEach((handler) => {
      handler(status)
    })
  }

  private clearPush() {
    if (this.pushTimer !== null) {
      window.clearTimeout(this.pushTimer)
      this.pushTimer = null
    }
  }

  private clearHeartbeat() {
    if (this.heartbeatTimer !== null) {
      window.clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  private clearReconnect() {
    if (this.reconnectTimer !== null) {
      window.clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
  }

  private clearTimers() {
    this.clearPush()
    this.clearHeartbeat()
    this.clearReconnect()
  }
}
