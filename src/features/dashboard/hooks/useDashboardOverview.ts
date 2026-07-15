import { useEffect, useState } from 'react'
import { fetchDashboardOverview } from '@/features/dashboard/api/fetchDashboardOverview'
import { DASHBOARD_POLL_MS } from '@/features/dashboard/constants'
import type { DashboardOverview } from '@/features/dashboard/types'

/**
 * 大屏总览数据钩子：
 * - 首次加载
 * - 固定间隔静默轮询（不受手动刷新重置）
 * - 手动刷新通过 refreshTick 触发完整 loading
 */
export function useDashboardOverview() {
  const [data, setData] = useState<DashboardOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshTick, setRefreshTick] = useState(0)

  // 首次加载 + 手动刷新
  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const overview = await fetchDashboardOverview()
        if (cancelled) return
        setData(overview)
        setError('')
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : '大屏数据加载失败')
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [refreshTick])

  // 独立静默轮询：不因手动刷新而重建定时器
  useEffect(() => {
    let cancelled = false

    const timer = window.setInterval(() => {
      void (async () => {
        try {
          const overview = await fetchDashboardOverview()
          if (cancelled) return
          setData(overview)
          setError('')
        } catch (err) {
          if (cancelled) return
          setError(err instanceof Error ? err.message : '大屏数据加载失败')
        }
      })()
    }, DASHBOARD_POLL_MS)

    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  /** 手动刷新：先标记 loading，再递增 tick 触发重新请求 */
  function reload() {
    setLoading(true)
    setRefreshTick((tick) => tick + 1)
  }

  return { data, loading, error, reload }
}
