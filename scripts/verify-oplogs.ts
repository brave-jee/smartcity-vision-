/**
 * 临时验收脚本：验证种子日志 + 筛选/分页纯函数。
 * 用法：npx --yes tsx scripts/verify-oplogs.ts
 */
import { OP_LOG_PAGE_SIZE } from '../src/features/logs/constants'
import { buildSeedOpLogs } from '../src/features/logs/data/seedLogs'
import { queryOpLogs } from '../src/features/logs/utils/queryOpLogs'

function assert(cond: unknown, message: string): asserts cond {
  if (!cond) throw new Error(message)
}

const seed = buildSeedOpLogs(1_700_000_000_000)
assert(seed.length >= 10, `种子数量不足: ${seed.length}`)
assert(
  seed.every((item, i, arr) => i === 0 || arr[i - 1]!.createdAt >= item.createdAt),
  '种子未按时间新→旧排序',
)

const page1 = queryOpLogs(seed, {
  page: 1,
  pageSize: OP_LOG_PAGE_SIZE,
  category: 'all',
  keyword: '',
})
assert(page1.items.length === OP_LOG_PAGE_SIZE, `首页条数应为 ${OP_LOG_PAGE_SIZE}`)
assert(page1.total === seed.length, '总数应等于种子数')
assert(page1.totalPages === Math.ceil(seed.length / OP_LOG_PAGE_SIZE), '总页数不正确')

const pageOverflow = queryOpLogs(seed, {
  page: 99,
  pageSize: OP_LOG_PAGE_SIZE,
  category: 'all',
  keyword: '',
})
assert(pageOverflow.page === page1.totalPages, '越界页码应回落至最后一页')

const authOnly = queryOpLogs(seed, {
  page: 1,
  pageSize: OP_LOG_PAGE_SIZE,
  category: 'auth',
  keyword: '',
})
assert(authOnly.total > 0, 'auth 分类应有数据')
assert(
  authOnly.items.every((item) => item.category === 'auth'),
  'auth 筛选结果混入其他分类',
)

const keywordHit = queryOpLogs(seed, {
  page: 1,
  pageSize: OP_LOG_PAGE_SIZE,
  category: 'all',
  keyword: '变电站',
})
assert(keywordHit.total >= 1, '关键词「变电站」应命中')
assert(
  keywordHit.items.every((item) =>
    [item.title, item.target, item.detail, item.actor].join(' ').includes('变电站'),
  ),
  '关键词过滤内容不符',
)

const empty = queryOpLogs(seed, {
  page: 1,
  pageSize: OP_LOG_PAGE_SIZE,
  category: 'all',
  keyword: '绝对不存在的关键词XYZ',
})
assert(empty.total === 0, '无效关键词应返回 0')
assert(empty.totalPages === 1, '空结果 totalPages 应为 1')
assert(empty.items.length === 0, '空结果 items 应为空')

console.log('verify-oplogs: all assertions passed')
console.log(
  JSON.stringify(
    {
      seed: seed.length,
      pageSize: OP_LOG_PAGE_SIZE,
      totalPages: page1.totalPages,
      authTotal: authOnly.total,
      keywordTotal: keywordHit.total,
    },
    null,
    2,
  ),
)
