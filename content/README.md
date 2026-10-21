# 网站内容编辑指南

## 一个项目 / 一篇文章 = 一个 Markdown 文件

- 项目：`content/projects/项目英文名.md` → `/projects/项目英文名`
- 文章：`content/posts/文章英文名.md` → `/posts/文章英文名`
- 动态：仍然编辑 `updates.json`。

**文件顶部 `---` 之间是基本信息，下面是正文。**
文件名决定网址；已有文件改名会改变链接，请谨慎。
页面会自动显示新增的已发布文件，不需要改代码登记。

## 添加项目

复制 `projects/_template.md`，改成自己的文件名。模板默认 `draft: true`，不会公开。

```yaml
---
title: "项目名称"
category: "Products & Tools"
year: "2026"
intro: "标题下面的一句话介绍。"
summary: "项目卡片和详情页使用的简介。"
cover: "/media/my-project/cover.jpg"
role: "你的角色"
tools: "工具或方法"
tags: ["HCI", "Design"]
featured: false
order: 10
draft: true
---
```

必填：`title`、`category`、`year`、`intro`、`summary`、`cover`、`role`、`tools`。

- `category` 可自由填写非空分类名。Projects 筛选栏自动汇总已发布项目的分类和数量；新增分类自动出现，没有项目的分类自动消失。相同分类请统一拼写，首尾空格会自动去除。
- 项目按 `year` 从新到旧排列；同一年内 `order` 越小越靠前。
- `featured: true` 加入首页精选候选；首页显示按年份倒序、同年按 order 排序的前 3 个。
- `draft: true` 隐藏页面及列表；写完设为 `false`。
- 可选 `links`：`[{label: "Demo", url: "https://..."}]`。
- 可选 `archiveUrl`：原有项目页面链接。

## 添加文章

复制 `posts/first-note.md`。文章顶部必填 `title`、`date`（`YYYY-MM-DD`）、`summary`。
`draft: true` 表示草稿；设为 `false` 后进入文章列表，按日期倒序。

## 正文与自动目录

```markdown
## Research question

正文，可以写 **加粗**、*斜体*、列表和 [链接](https://example.com)。

### A smaller heading

这是小节，属于上方章节。

## Approach

这里写方法。
```

`##` 自动生成左侧目录；点击跳转，滚动时高亮当前位置。
页面顶部已显示标题，正文不需要再写 `#` 标题。
重复标题也会获得不同的锚点。移动端目录改为横向可滚动列表。

## 图片放在哪里，就显示在哪里

图片放到 `public/media/` 下，正文用 `/media/...` 引用。
图片说明同时用于图注和替代文字；点击图片可放大，Esc 关闭。

默认单张图片居中，连续的多张图片按两列并排，间距一致；奇数张时最后一张居中。窄屏改为单列。容器没有底色，图片保持比例、不裁切。题图独立使用宽幅布局。

整行图片：加上 `"full"`（前后空一行）：

```markdown
前面的段落。

![图片说明](/media/my-project/drawing.jpg "full")

后面的段落。
```

如果某处仍需要右侧环绕，可以显式加 `"right"`，然后写正文；默认不会环绕。

```markdown
![图片说明](/media/my-project/detail.jpg "right")

这一段文字会排在图片左侧。手机上自动改为上下排列。
```

两张图并排：连续两行图片，中间不要空行。

```markdown
![第一张图](/media/my-project/one.jpg)
![第二张图](/media/my-project/two.jpg)
```

支持表格、引用、代码块。Markdown 来自你维护的仓库，也支持原始 HTML，
请不要直接放入不可信来源的 HTML。

## 更新网站

本地 `npm run dev` 预览。新增、修改、删除 `content/projects/*.md`、`content/posts/*.md` 或更新动态 JSON 时，开发服务会自动重载内容并刷新浏览器，通常需要一两秒，不必手动重新构建。请将 Markdown 直接放在这两个目录下；子文件夹不会被当前读取规则扫描。
线上网站需要重新构建和部署；仅编辑文件不会自动改变线上页面，除非仓库已有自动部署。

可选的 `sectionLabels` 可以给很长的章节标题设置简短目录名，正文标题不变。
已有项目已保留原来的章节标签，例如：

```yaml
sectionLabels:
  "The invisible barrier around knowledge": "Critique"
  "Transparency as spatial argument": "Proposal"
```

没有设置或标题改名后未匹配时，目录直接使用 `##` 标题。

## 本次作品集导入

项目与 PDF 页码的对应关系、待确认日期见 [portfolio-audit.md](./portfolio-audit.md)。新增与补充的文章仍全部在 `content/projects/` 中管理。PDF 更新不会自动覆盖文章，需要把新的文字或图片更新到对应 Markdown。

首页 Recent Posts 自动展示按日期排序的最新 3 篇非草稿文章。Projects 和 Posts 都支持正文图片并排及单张居中，图片语法一致。

### 题图下方的项目链接

在项目 Markdown 的 frontmatter 中编辑：

```yaml
links:
  - label: Play the game
    url: https://example.com/game
  - label: Watch the video
    url: https://example.com/video
```

这些入口显示在题图下方，可直接打开；`archiveUrl` 仍提供原案例入口。正文里的链接也会保留。七篇原站公开 Posts 已迁入 `content/posts/`，首页会自动显示最新三篇。

Projects 和 Posts 的题图统一铺满正文列，默认 16:9、居中裁切，点击可查看完整图片。Posts 可以在 frontmatter 中添加 `cover: /media/你的图片.webp` 指定题图；未指定时不显示题图。正文图片排版不受影响。

## 独立居中的 Quote

Projects 和 Posts 都可使用 `> [!QUOTE]`，显示独立的浅淡底色、深色文字引用块，文字与块本身居中，并与上下章节留出间距。不需要加 `## Quote`，也不会出现在章节目录中。

```markdown
前面的正文。

> [!QUOTE]
> 在这里写引用内容，可以使用 **加粗**、*斜体* 和 [链接](https://example.com)。
>
> — 作者或来源

后面的正文。
```

署名是可选的；需要时先写一行 `>` 留空行，再写 `> — 作者或来源`（这里是长破折号 `—`）。多段引用也用单独一行 `>` 分隔。标记 `[!QUOTE]` 要大写；不用标记的普通 `>` 引用仍保持原样。

Quote 内每一行 `>` 后的文字会保留换行，不需要句尾加两个空格；单独一行 `>` 表示另起一段。普通正文的 Markdown 换行规则不变。

## About 页面与生活照片

About 的介绍、研究兴趣和兴趣爱好文字在 `app/about/page.tsx` 编辑（搜索页面上的原文即可定位）。研究方向是连续正文，不是项目卡片。

右侧轮播自动读取 `content/about-photos/` 中的图片，不需要手写图片列表：
- 支持 JPG、JPEG、PNG、WebP、AVIF（扩展名可全小写或全大写）。
- 用 `01-Blue-sky.webp`、`02-City-at-night.webp` 这样的数字前缀控制顺序。文件名的文字也会作为图片替代描述。
- 直接添加、替换或删除文件。当前两张示例来自原站的摄影文章，可以随时替换。
- 图片完整显示，不裁切；竖图和横图共用固定高度，避免轮播时页面跳动。
- 每 6 秒切换，可暂停或点击左右箭头；鼠标悬停、键盘焦点进入时暂停，偏好减少动态效果时默认不自动播放。
- 本地开发会自动重新加载；线上网站需要提交图片并完成部署后才更新。
