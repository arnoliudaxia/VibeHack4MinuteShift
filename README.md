# GameJam Phaser

一个基于 Phaser、TypeScript 和 Vite 的游戏项目。

## 项目说明

当前项目使用 Phaser 创建游戏场景，通过 Vite 提供开发服务器和生产构建。游戏入口位于 `src/main.ts`，页面入口位于 `index.html`。

当前场景会加载 `assets/bg1.png` 作为背景，并根据画布尺寸自适应缩放。

## 技术栈

- Phaser 4
- TypeScript
- Vite

## 目录结构

```text
.
├── assets/          # 游戏资源
├── src/
│   ├── main.ts      # 游戏入口和主场景
│   ├── style.css    # 全局样式
│   └── vite-env.d.ts
├── index.html       # 页面入口
├── package.json     # 项目脚本和依赖
└── vite.config.ts   # Vite 配置
```

## 安装依赖

```bash
npm install
```

## 本地开发

```bash
npm run dev
```

开发服务器默认会监听 `0.0.0.0`，方便在局域网设备中访问。

## 构建项目

```bash
npm run build
```

该命令会先运行 TypeScript 类型检查，然后使用 Vite 生成生产构建文件。

## 预览构建结果

```bash
npm run preview
```

## 资源路径

游戏资源放在 `assets/` 目录中，可以在 Phaser 中通过绝对路径加载，例如：

```ts
this.load.image('background', '/assets/bg1.png');
```

## 开发入口

主要修改位置：

- `src/main.ts`：添加场景、加载资源、创建游戏对象
- `src/style.css`：调整页面和画布样式
- `assets/`：放置图片、音频等游戏资源
