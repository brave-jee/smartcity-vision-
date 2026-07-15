import { useEffect, useRef } from 'react'
import { MockAlertSocket } from '@/features/alerts/api/mockAlertSocket'
import { useAlertStore } from '@/features/alerts/stores/useAlertStore'

/**
 * 在大屏挂载期间保持 Mock 告警 WebSocket 连接。
 * 卸载时关闭通道，避免后台继续推送。
 */
export function useAlertStream() {
  const socketRef = useRef<MockAlertSocket | null>(null)
  const pushAlert = useAlertStore((s) => s.pushAlert)
  const setConnectionStatus = useAlertStore((s) => s.setConnectionStatus)
  const setHeartbeat = useAlertStore((s) => s.setHeartbeat)

  useEffect(() => {
    const socket = new MockAlertSocket()
    socketRef.current = socket

    const offMessage = socket.onMessage((packet) => {
      if (packet.type === 'alert') {
        pushAlert(packet.payload)
        return
      }
      setHeartbeat(packet.serverTime)
    })

    const offStatus = socket.onStatus((status) => {
      setConnectionStatus(status)
    })

    socket.connect()

    return () => {
      offMessage()
      offStatus()
      socket.close()
      socketRef.current = null
    }
  }, [pushAlert, setConnectionStatus, setHeartbeat])

  /** 手动触发重连（调试 / 掉线恢复） */
  function reconnect() {
    socketRef.current?.reconnect()
  }

  return { reconnect }
}
