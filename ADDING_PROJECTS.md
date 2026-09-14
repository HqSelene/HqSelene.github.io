# 添加新项目

这个网站的项目内容集中在 `app/data.ts`。新增项目时不需要创建新的页面文件；详情页、Projects 筛选、Gallery 和 Next project 会根据项目数据自动生成。

## 1. 准备图片

在 `public/media/` 下创建一个与项目 `slug` 同名的文件夹，例如：

```text
public/media/bts-learning/
├── cover.jpg
├── lesson-map.jpg
├── quiz.jpg
└── progress.jpg
```

- 文件名建议使用小写英文和连字符，不要包含空格。
- `cover` 是项目封面；其他图片会进入页面末尾的横向 Gallery。
- 图片文件名会转化为 Gallery 中的图片名称，因此尽量使用有意义的名称。
- 建议先压缩图片，避免单张图片过大。

## 2. 添加项目数据

打开 `app/data.ts`，在 `projects` 数组中复制并填写以下模板：

```ts
{
  slug: "bts-learning",
  title: "BTS Learning",
  category: "Interactive Experiences",
  year: "2026",
  featured: true,
  intro: "A short, memorable project statement.",
  summary:
    "A concise explanation of what the project is, who it serves, and why it matters.",
  tags: ["Learning", "Web design", "Front-end"],
  cover: "/media/bts-learning/cover.jpg",
  gallery: [
    "/media/bts-learning/lesson-map.jpg",
    "/media/bts-learning/quiz.jpg",
    "/media/bts-learning/progress.jpg",
  ],
  role: "Designer · Developer",
  tools: "React · Interaction design · User research",
  links: [
    {
      label: "Project website",
      url: "https://example.com/",
    },
    {
      label: "GitHub repository",
      url: "https://github.com/username/project",
    },
  ],
  sections: [
    {
      eyebrow: "Context",
      title: "The question or opportunity",
      body: [
        "Explain the context, audience, and problem.",
        "Describe why this question is meaningful.",
      ],
    },
    {
      eyebrow: "Approach",
      title: "How the project responds",
      body: [
        "Explain the design or development approach.",
        "Describe the result, insight, or next step.",
      ],
    },
  ],
},
```

如果项目还有旧博客页面，可以在 `tools` 后添加：

```ts
archiveUrl: "https://hqselene.github.io/post/...",
```

没有旧页面时直接省略 `archiveUrl`。

`links` 也是可选的；可以用它添加项目网站、GitHub、在线 Demo 或下载页面。没有外部链接时直接省略。

## 3. 选择分类

每个项目只选择一个主分类：

- `Products & Tools`：App、平台、开发工具和实用型产品
- `Interactive Experiences`：互动网页、学习体验、参与式体验
- `Data & Research`：数据分析、可视化和研究型项目
- `Critical Design`：通过设计质疑社会、制度、技术或文化中的既有假设

跨领域信息放在 `tags` 中，不需要增加第二个主分类。

如果以后确实需要新主分类，只修改 `app/data.ts` 顶部的 `projectCategories`；Projects 筛选器会自动使用它。

## 4. 控制显示顺序

- `projects` 数组中的顺序就是 Projects 页面和 Next project 的顺序。
- 添加 `featured: true` 的项目会显示在首页 Featured work。
- 建议首页只保留最重要的 4 个 Featured projects。
- 不希望显示在首页时，删除 `featured` 或设为 `false`。

## 5. 检查结果

在 `portfolio-site` 文件夹运行：

```powershell
npm run dev
```

访问 `/projects`，确认分类、卡片、详情内容和图片 Gallery。

完成后运行：

```powershell
npm run build
```

如果项目总数或网站主要结构发生变化，也同步更新根目录的 `project.md`。
