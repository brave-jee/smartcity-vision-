/** 操作日志分类 */
export type OpLogCategory = 'auth' | 'alert' | 'ai' | 'scene' | 'system'

/** 单条操作日志 */
export type OpLogEntry = {
  id: string
  /** 操作人展示名 */
  actor: string
  /** 动作短码，如 login / acknowledge */
  action: string
  /** 动作中文标题 */
  title: string
  category: OpLogCategory
  /** 作用对象（告警标题、片区等） */
  target?: string
  /** 补充说明 */
  detail?: string
  createdAt: number
}

/** 列表查询参数 */
export type OpLogQuery = {
  page: number
  pageSize: number
  category: OpLogCategory | 'all'
  keyword: string
}

/** 分页结果 */
export type OpLogPage = {
  items: OpLogEntry[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/** 写入日志的入参（id / createdAt 由 store 生成） */
export type OpLogDraft = Omit<OpLogEntry, 'id' | 'createdAt'>
