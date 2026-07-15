import type { AlertLevel, CityAlert } from '@/features/alerts/types'

/** 可轮播的 Mock 告警模板 */
const ALERT_TEMPLATES: Array<{
  level: AlertLevel
  title: string
  district: string
  source: string
}> = [
  {
    level: 'critical',
    title: '东城变电站功率超限',
    district: '东城供区',
    source: '电力监控',
  },
  {
    level: 'critical',
    title: '轨道 2 号线换乘厅人流预警',
    district: '中央枢纽',
    source: '客流安防',
  },
  {
    level: 'warning',
    title: '滨河路车流拥堵加剧',
    district: '滨江走廊',
    source: '路网感知',
  },
  {
    level: 'warning',
    title: '星港广场烟感误报待核验',
    district: '星港商圈',
    source: '消防火情',
  },
  {
    level: 'warning',
    title: '滨江塔楼层用能波动偏高',
    district: '滨江塔',
    source: '楼宇能耗',
  },
  {
    level: 'info',
    title: '南区环境监测正常',
    district: '南区生态',
    source: '环境传感',
  },
  {
    level: 'info',
    title: '合院商街照明巡检完成',
    district: '合院商街',
    source: '市政运维',
  },
  {
    level: 'info',
    title: '智慧展馆闸机通行恢复',
    district: '数创园区',
    source: '通行控制',
  },
]

let seq = 0

/**
 * 基于模板生成一条新告警（稳定随机，避免完全重复顺序）。
 */
export function createMockAlert(now = Date.now()): CityAlert {
  seq += 1
  const index = (seq * 7 + Math.floor(now / 1000)) % ALERT_TEMPLATES.length
  const template = ALERT_TEMPLATES[index]!

  return {
    id: `alert-${now}-${seq}`,
    level: template.level,
    title: template.title,
    district: template.district,
    source: template.source,
    createdAt: now,
    acknowledged: false,
  }
}
