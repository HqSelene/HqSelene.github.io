# Project Overview

## Purpose

Qing He 的独立个人作品集网站，专注个人定位、项目案例、研究发表与联系信息。它与原 Hexo 博客完全分离，不包含博客归档、分类、标签或侧栏。

## Main Parts

- `/`：个人介绍与精选项目
- `/projects`：带项目数量的分类筛选与紧凑项目索引
- `/projects/[slug]`：9 个项目案例；每页末尾包含可放大浏览的项目图片 Gallery
- `/about`：个人背景、教育和研究经历
- `/publications`：研究发表
- `public/`：项目图片、CV、作品集和论文 PDF

## Key Workflows

- 使用 npm 安装依赖并运行 vinext 开发服务器。
- 使用 vinext 构建 Cloudflare Worker 兼容产物。
- 访客可在 Projects 页面按 Products & Tools、Interactive Experiences、Data & Research 和 Critical Design 即时筛选项目。
- 项目详情页 Gallery 使用项目原始素材；点击图片打开全屏 Lightbox，可用按钮、缩略图或键盘方向键浏览，按 Escape 关闭。
- 新项目集中添加到 `app/data.ts`，分类筛选和动态详情页会自动生成；具体步骤记录在 `ADDING_PROJECTS.md`。

## Constraints

- 项目位于与 `HqSelene.github.io/` 平行的 `portfolio-site/` 目录。
- 站点依赖 `package.json`、`node_modules/`、`.openai/hosting.json` 和 Vite/vinext 配置共同运行。
- npm 脚本使用跨平台写法；Wrangler 日志路径由 `vite.config.ts` 在运行时设置。
- 视觉系统继承旧站的宇宙意象和蓝粉配色：`#1a45c8`、`#f787ce`、`#e2e18e` 与 `#e2e1e7`，并通过 CSS/Canvas 实现，不依赖博客主题。

## Recent Major Changes

- 2026-09-14：首页改为更紧凑的作品集入口，采用左侧介绍、右侧研究领域轨道图和低高度横向滑动的精选项目条；首屏可同时看到介绍、蓝色 `HCI ✦ AI ✦ PRODUCT ✦ SPACE ✦ DATA` 分隔条与项目，并将 Warren 纳入首页精选项目，适配平板和手机。
- 2026-07-30：新增 Products & Tools 项目 Warren for VS Code，使用项目仓库中的正式品牌封面、应用截图和图标，并支持项目网站与 GitHub 等可选外部链接。
- 2026-07-30：将项目体系重组为 Products & Tools、Interactive Experiences、Data & Research 和 Critical Design；分类选项改为集中定义，并增加新项目维护指南、可选旧博客链接和独立 Featured 控制。
- 2026-07-30：将项目详情页 Gallery 从纵向拼贴改为紧凑的横向滑动胶片，限制缩略图尺寸并保留下一张露出，支持触控横滑和桌面左右按钮；全屏 Lightbox 浏览保持不变。
- 2026-07-30：为所有项目详情页加入统一 Gallery 与全屏 Lightbox，支持上一张/下一张、循环浏览、缩略图跳转、键盘方向键、Escape 关闭和移动端布局；补充旧项目中的过程图与界面图。
- 2026-07-30：将 Projects 页面改为分类筛选式浏览器；桌面端使用紧凑三列卡片，平板两列、手机单列，同时保留项目悬停动效。
- 2026-07-30：重构个人视觉语言，加入日夜主题、动态星空、轨道与花/星图案、旋转研究主题、项目卡片关键词揭示，并更新社交分享封面。
- 2026-07-30：修复 Windows 无法识别 POSIX 环境变量前缀的问题，使 `npm run dev`、`npm run build` 和 `npm run start` 可直接运行。
- 2026-07-30：将独立作品集移动为 `HqSelene.github.io` 的同级目录。
