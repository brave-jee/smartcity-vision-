/** 演示模型名称 */
export const AI_MODEL_NAME = 'SCV-Sim-1.0'

/** Mock 接口思考延迟（毫秒） */
export const AI_THINK_DELAY_MS = { min: 900, max: 1600 } as const

/** 流式打字：每批字符数（减少 Zustand 写入次数） */
export const AI_STREAM_CHUNK_SIZE = 2

/** 流式打字：每批间隔（毫秒） */
export const AI_STREAM_CHUNK_MS = 36

/** 风险 / 建议条目逐条浮现间隔 */
export const AI_STREAM_ITEM_MS = 260
