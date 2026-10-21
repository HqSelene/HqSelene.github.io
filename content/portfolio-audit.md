# 作品集整理记录

来源：`Reference/portfolio.pdf`（29 页，封面标注 2023）。页码按 PDF 阅读器顺序计数。

| PDF 项目 | 页码 | 网站 Markdown | 处理 |
| --- | --- | --- | --- |
| Disclosure | 2–5 | projects/disclosure.md | 新增；交互身体、隐私交换、空间叙事及图片 |
| Museum 4.X | 6–10 | projects/emotion-clock.md | 保留原名称与地址；补充 Museum 4.X 名称、移动界面和数据流程 |
| Leap of Faith | 11–16 | projects/leap-of-faith.md | 补充 2090 世界设定、角色与基础设施绘图 |
| Emotion Space Self-Construction | 17–21 | projects/emotion-space.md | 补充情绪模型、游戏、可穿戴制作与表演图片，以及作品集中已有的游戏/视频链接 |
| Analysis of Musical Influence | 22–24 | projects/musical-influence.md | 补充熵权、聚类、PCA、团队与个人贡献；复用原有图表 |
| A Data Portrait of 1183 Help Seekers | 25–27 | projects/help-seekers.md | 新增；数据准备、人口与空间画像、医疗资源比较 |
| Public Emergency Data Collection and Visualization Platform | 28–29 | projects/aid-sync.md | 补充背景、批处理流程和系统图片 |

Warren、Fitness Tracker、Sounds Up、Don't Touch 不在此 PDF 中，保留网站现有内容。

## 日期待核对

- Disclosure、Help Seekers：PDF 未明确给出项目完成年份，暂用作品集归档年 2023；文章中已注明，不把 2020 年的数据采集时间视作完成时间。确认后改对应 Markdown 的 `year` 即可。
- Musical Influence：PDF 第 22 页写 MCM/ICM 2020，原网站写 2021，暂保留网站原年份，需要作者确认。
- 其他已有项目保持原年份。所有项目按 `year` 降序，同年按 `order` 排序。

## 图片与内容

从 PDF 裁切的图片存为 `public/media/<slug>/*.webp`，在对应 Markdown 中按章节引用。图内底色属于原作品图像，没有为网页图片另加色底。复杂图可点击放大。正文没有把设计提案写成已部署产品，也没有新增未有来源的成效数据。

新增项目正文为依据作品集整理的英文编辑稿，后续可直接修改。保持原有图片与旧项目 URL。

## Posts

首页显示最新三篇已发布文章；`content/posts/*.md` 的 `draft: true` 不公开。当前只有草稿，因此首页显示说明文案。Posts 与 Projects 使用同一个 Markdown 图片渲染器：连续图片行并排，空行隔开的单图居中，手机端纵向排列。

## 原站全文迁移（2026-10-20）

进一步核对了 `https://hqselene.github.io/archives/` 及第二页归档，恢复 8 个原站项目页和 7 篇公开 Posts。项目原文作为主要正文，已有网站设计说明和作品集补充内容保留在 Design notes。没有把原站正文替换成摘要。原有语句、双语故事及尚未写完的公开笔记均保持原意和内容，不擅自补写结论。

- Posts：Can AI Understand Physical World、Leeza SOHO、Ghost Laughing Stone、Retrieval Augmentation (1)、Blue、立德楼 Lide Building、国博-古罗马文明展。
- 项目资源链接统一由 Markdown frontmatter 的 `links` 管理，渲染在题图下方、摘要上方。原案例入口也移到此处。
- Emotion Space：恢复游戏、表演视频、GitHub 源码入口。
- Musical Influence：恢复原站链接的完整论文。
- Warren：项目官网和 GitHub 入口保留，移到题图下方。
- 其他原站项目页未提供额外外链，不猜测项目官网 URL。
- 原站共 92 个正文图片引用：86 个成功下载，复用相同本地图像或转为 WebP；Leap 的 6 个原地址返回 404，使用现有 6 张故事图替代。不是恢复了失效地址的原文件。
- `information-platform`（`/post/6012a9ea/`）只有空正文，因此没有新建空文章。现有 Aid-Sync 已包含信息平台的完整案例。

逐页核对数据保存在 `content/migration/original-site.json`：原网址、正文文本块、外链、图片原址与本地路径。自动测试已确认各段原文、各链接及图片均能在渲染页面找到。该记录是本次迁移的内容基线，之后作者主动改写正文时可相应更新核对基线。
