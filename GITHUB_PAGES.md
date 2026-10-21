# GitHub Pages 上线步骤

当前输出是静态网站，正式目标为 https://hqselene.github.io/（根路径）。
不适用于直接部署到 /QingWebsite/ 子路径。

## 已配置

- `npm test`：静态构建 + 页面、资源和旧链接检查。
- 发布目录：`dist/client`，不上传 `dist/server`。
- 所有项目和文章在构建时生成；新增 Markdown 或照片后需要重新构建部署。
- 已迁移文章的 15 个旧 /post/.../ 地址自动跳转到新文章。
- `github-pages` 分支推送只构建、测试和上传产物。
- 正式发布仅在仓库名称变为 HqSelene/HqSelene.github.io 后，由 main 分支触发。
- 使用 GitHub 官方 configure-pages、upload-artifact、deploy-pages Actions。打包时保留首页导航所需的隐藏文件 .rsc（upload-pages-artifact 默认会排除隐藏文件）。

## 上线前

1. 提交本地修改，推送 `github-pages` 分支。
2. 在 QingWebsite 仓库的 Actions 中确认 GitHub Pages 工作流的 build 成功；deploy 此时应显示 skipped。
3. 创建 github-pages → main 的 Pull Request，检查通过后合并。
4. 确认旧仓库的 legacy-site 分支保存了原网站。如旧站由其他源码仓库生成，也保留该源码仓库。

## 切换原网址（这时才可能发生短暂中断）

1. 在旧 HqSelene.github.io 仓库 Settings → General → Repository name，将其改名为 website-legacy。
2. 在 QingWebsite 仓库同一位置，将其改名为 HqSelene.github.io。
3. 新仓库 Settings → Pages → Source 选择 GitHub Actions。
4. 如果 Settings → Environments → github-pages 限制部署分支，允许 main。
5. Actions → GitHub Pages → Run workflow，选择 main。
6. 确认 build 和 deploy 成功，再访问 https://hqselene.github.io/。
7. 本地新版仓库更新远程：`git remote set-url origin git@github.com:HqSelene/HqSelene.github.io.git`。
8. 本地旧版仓库更新远程：`git remote set-url origin git@github.com:HqSelene/website-legacy.git`。
   两条命令分别在对应仓库目录执行。

原仓库改名后不会继续占用个人主页根网址。备份分支只保存代码，不会自动产生预览站点。
原站如另有自定义域名，需要单独确认域名迁移；不要在两个仓库同时配置同一个域名。

## 本地预览真正的静态产物

先运行 `npm run build`，然后：

```bash
python3 -m http.server 4173 --directory dist/client
```

访问 http://localhost:4173/。这里没有 Worker 或 Node 渲染服务，
可以检查导航、文章直达、照片轮播、PDF、图片和旧文章跳转。

## 回退

完整旧仓库 website-legacy 和 legacy-site 分支仍保留。如果需要回退到旧站，
先把新版仓库移开 HqSelene.github.io 名称，再把旧仓库改回该名称，
并恢复原 Pages 配置（main / root），等待重新部署。
不要直接强制覆盖新版历史。
