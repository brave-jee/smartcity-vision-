import type { PatrolRouteId, PatrolVehicleConfig } from '@/features/vehicles/types'

/** 路径采样点：世界坐标 [x, y, z] */
export type PathPoint = [number, number, number]

/**
 * 东西向主干道矩形环（略偏车道，避开路口中心）。
 */
export const ROUTE_EW: PathPoint[] = [
  [-21, 0.12, 1.2],
  [-10, 0.12, 1.2],
  [0, 0.12, 1.2],
  [10, 0.12, 1.2],
  [21, 0.12, 1.2],
  [21, 0.12, -1.2],
  [10, 0.12, -1.2],
  [0, 0.12, -1.2],
  [-10, 0.12, -1.2],
  [-21, 0.12, -1.2],
]

/**
 * 南北向主干道矩形环。
 */
export const ROUTE_NS: PathPoint[] = [
  [1.2, 0.12, -21],
  [1.2, 0.12, -10],
  [1.2, 0.12, 0],
  [1.2, 0.12, 10],
  [1.2, 0.12, 21],
  [-1.2, 0.12, 21],
  [-1.2, 0.12, 10],
  [-1.2, 0.12, 0],
  [-1.2, 0.12, -10],
  [-1.2, 0.12, -21],
]

export const PATROL_ROUTES: Record<PatrolRouteId, PathPoint[]> = {
  'ring-ew': ROUTE_EW,
  'ring-ns': ROUTE_NS,
}

/** 编队车辆配置（颜色错开、速度略有差异） */
export const PATROL_VEHICLES: PatrolVehicleConfig[] = [
  {
    id: 'car-ew-1',
    color: '#5ec4b6',
    routeId: 'ring-ew',
    startProgress: 0.05,
    speed: 0.045,
  },
  {
    id: 'car-ew-2',
    color: '#e8a54b',
    routeId: 'ring-ew',
    startProgress: 0.38,
    speed: 0.038,
  },
  {
    id: 'car-ew-3',
    color: '#7eb8d6',
    routeId: 'ring-ew',
    startProgress: 0.72,
    speed: 0.05,
  },
  {
    id: 'car-ns-1',
    color: '#d64545',
    routeId: 'ring-ns',
    startProgress: 0.12,
    speed: 0.042,
  },
  {
    id: 'car-ns-2',
    color: '#c4b08a',
    routeId: 'ring-ns',
    startProgress: 0.55,
    speed: 0.048,
  },
  {
    id: 'car-ns-3',
    color: '#6aa8c8',
    routeId: 'ring-ns',
    startProgress: 0.88,
    speed: 0.036,
  },
]
