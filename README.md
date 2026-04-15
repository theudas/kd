# 知识库站点

这是一个基于 Markdown 的静态知识库项目，用来把不同主题整理成可浏览的知识页并部署到 GitHub Pages。

当前站点是两层结构：

- 首页展示知识分类
- 分类页展示该分类下的知识点
- 知识点页展示具体正文内容

你后续只需要维护 `knowledge/categories/` 和 `knowledge/items/` 里的 Markdown 文件，重新构建后网站内容就会自动更新。

## 项目结构

```text
./
├── .github/workflows/deploy.yml
├── knowledge/
│   ├── categories/
│   │   ├── dpo.md
│   │   ├── grpo.md
│   │   └── lora.md
│   ├── items/
│   │   ├── dpo/
│   │   ├── grpo/
│   │   └── lora/
│   └── interviews/
├── public/
│   └── knowledge.json
├── scripts/
│   ├── build.js
│   └── create.js
├── src/
│   ├── main.js
│   └── styles.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 运行环境

- Node.js 18+
- npm

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:5173
```

## 本地构建

执行：

```bash
npm run build
```

构建流程：

1. 读取 `knowledge/categories/` 中的分类 Markdown
2. 读取 `knowledge/items/` 中的知识点 Markdown
3. 生成 `public/knowledge.json`
4. 使用 Vite 构建前端
5. 输出静态文件到 `dist/`

本地预览构建结果：

```bash
npm run preview
```

## 如何维护内容

### 新增知识分类

在 `knowledge/categories/` 下新增一个 Markdown 文件，例如 `lora.md`：

```markdown
---
id: lora
title: LoRA
color: "#3498db"
---
```

字段说明：

- `id`：分类唯一标识，必须和知识点目录名一致
- `title`：分类名称
- `color`：分类强调色

### 新增知识点

在对应分类目录下新增 Markdown 文件，例如 `knowledge/items/lora/rank.md`：

```markdown
---
title: Rank 的含义
category: lora
order: 2
difficulty: Medium
tags: [LoRA, rank, 参数]
---

# LoRA 中的 Rank

Rank 是 LoRA 中的重要超参数。
```

字段说明：

- `title`：知识点标题
- `category`：所属分类
- `order`：排序值，数字越小越靠前
- `difficulty`：难度，建议使用 `Easy`、`Medium`、`Hard`
- `tags`：标签数组

## GitHub Pages 部署说明

项目已经自带 GitHub Actions 工作流文件 [deploy.yml](/Users/tanruoying/Downloads/my-interview/.github/workflows/deploy.yml)，推送到 `main` 分支后即可自动构建和部署。

### 1. 推送到 GitHub

如果这是第一次上传仓库：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/theudas/kd.git
git push -u origin main
```

如果仓库已经存在：

```bash
git add .
git commit -m "Update knowledge cards"
git push origin main
```

### 2. 打开 GitHub Pages

进入 GitHub 仓库页面后：

1. 点击 `Settings`
2. 打开左侧的 `Pages`
3. 在 `Build and deployment` 里把 `Source` 设为 `GitHub Actions`
4. 保存

注意：

- 不需要手动创建 `gh-pages` 分支
- 工作流会自动上传并发布 `dist/`

### 3. 等待 Actions 完成部署

推送代码后，打开仓库的 `Actions` 页面，查看 `Deploy Knowledge Base` 工作流。

它会自动执行：

1. 检出代码
2. 安装依赖
3. 执行 `npm run build`
4. 上传 `dist/`
5. 发布到 GitHub Pages

### 4. 访问网站

部署成功后，普通项目仓库的地址通常是：

```text
https://theudas.github.io/kd/
```

## 部署前建议检查

- 本地 `npm run build` 可以成功执行
- `package-lock.json` 已提交
- `.github/workflows/deploy.yml` 存在
- `knowledge/categories/` 中至少有一个分类文件
- `knowledge/items/` 中至少有对应知识点文件

## 常见问题

### GitHub Pages 显示 404

检查：

- `Settings > Pages` 是否已选择 `GitHub Actions`
- Actions 是否构建成功
- 访问地址是否包含正确的仓库名

### 页面是空白的

检查：

- 构建是否成功
- `public/knowledge.json` 是否已生成
- 浏览器控制台是否有资源加载错误

### 卡片没有内容

检查：

- `knowledge/categories/<id>.md` 是否存在
- `knowledge/items/<id>/` 是否存在对应知识点文件
- Markdown 文件中的 Front Matter 字段是否正确

## 更新内容后的标准流程

每次更新内容时：

1. 修改 Markdown
2. 本地运行 `npm run build`
3. 提交代码
4. 推送到 `main`
5. 等待 GitHub Actions 自动部署

示例：

```bash
git add .
git commit -m "Add new LoRA notes"
git push origin main
```
