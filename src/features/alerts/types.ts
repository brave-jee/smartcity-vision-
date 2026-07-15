/** 实时告警领域类型 */

export type AlertLevel = 'info' | 'warning' | 'critical'

/** 模拟 WebSocket 连接状态 */
export type AlertConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected'

/** 单条城市告警 */
export type CityAlert = {
  id: string
  level: AlertLevel
  /** 告警标题 */
  title: string
  /** 所属片区 */
  district: string
  /** 告警来源系统 */
  source: string
  /** 创建时间戳（毫秒） */
  createdAt: number
  /** 是否已确认处置 */
  acknowledged: boolean
}

/** 客户端收到的推送报文（便于日后换成真实 WS 协议） */
export type AlertSocketPacket =
  { type: 'alert'; payload: CityAlert } | { type: 'heartbeat'; serverTime: number }
