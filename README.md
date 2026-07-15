# SmartCity Vision

智慧城市数字孪生平台前端工程。

## 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Zustand（含 persist）
- ESLint + Prettier

已接入：React Three Fiber + Three.js + GLTF 城市模型（KayKit CC0）、Mock WebSocket 实时告警、天气昼夜、车辆巡航、飞线粒子、ECharts 统计图表。  
后续按需接入：真实 WebSocket、MSW 等。

## 快速开始

```bash
cd item/smartcity-vision-
npm install
npm run dev
```

浏览器打开 `http://localhost:5173`。

### 演示账号

- 账号：`admin`
- 密码：`admin123`

未登录访问 `/app` 会跳转登录页；登录后进入「城市态势总览」大屏。

## 常用脚本

| 命令              | 说明            |
| ----------------- | --------------- |
| `npm run dev`     | 本地开发        |
| `npm run build`   | 生产构建        |
| `npm run preview` | 预览构建产物    |
| `npm run lint`    | ESLint 检查     |
| `npm run format`  | Prettier 格式化 |

## 目录结构

```
src/
├── app/           # 应用入口、路由、布局
├── features/      # 业务模块（auth、dashboard 等）
├── shared/        # 通用组件、stores、hooks、api、utils
└── assets/        # 静态资源
```

## 模块迭代计划

| 模块 | 内容                | 状态   |
| ---- | ------------------- | ------ |
| 0    | 工程脚手架          | ✅     |
| 1    | 登录（JWT）         | ✅     |
| 2    | 首页数据大屏        | ✅     |
| 3    | 3D 城市场景         | ✅     |
| 4    | 建筑物点击交互      | ✅     |
| 5    | WebSocket 实时告警  | ✅     |
| 6    | 天气昼夜系统        | ✅     |
| 7    | 车辆巡航动画        | ✅     |
| 8    | 飞线与粒子特效      | ✅     |
| 9    | 数据统计图表        | ✅     |
| 10   | AI 事件分析（模拟） | 待开发 |
| 11   | 操作日志            | 待开发 |
| 12   | 系统设置            | 待开发 |

每完成一个模块，提交并推送到 GitHub 一次。
