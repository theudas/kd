# 面试知识卡片站点

这是一个基于 Markdown 的静态知识库项目，用来把不同技术方向整理成网站卡片并部署到 GitHub Pages。

当前站点是两层结构：

- 首页展示技术方向卡片
- 方向页展示该方向下的知识点卡片
- 知识点页展示具体正文内容

你后续只需要维护 `interviews/categories/` 和 `interviews/knowledge/` 里的 Markdown 文件，重新构建后网站内容就会自动更新。

## 项目结构

```text
./
├── .github/workflows/deploy.yml
├── interviews/
│   ├── categories/
│   │   ├── dpo.md
│   │   ├── grpo.md
│   │   └── lora.md
│   └── knowledge/
│       ├── dpo/
│       ├── grpo/
│       └── lora/
├── public/
│   └── interviews.json
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

1. 读取 `interviews/categories/` 中的方向 Markdown
2. 读取 `interviews/knowledge/` 中的知识点 Markdown
3. 生成 `public/interviews.json`
4. 使用 Vite 构建前端
5. 输出静态文件到 `dist/`

本地预览构建结果：

```bash
npm run preview
```

## 如何维护内容

### 新增技术方向

在 `interviews/categories/` 下新增一个 Markdown 文件，例如 `lora.md`：

```markdown
---
id: lora
title: LoRA
description: 低秩自适应方法，一种高效的微调技术
icon: 🔧
color: "#3498db"
---

# LoRA 技术概述

LoRA（Low-Rank Adaptation）是一种参数高效的微调方法。
```

字段说明：

- `id`：方向唯一标识，必须和知识点目录名一致
- `title`：方向名称
- `description`：方向简介
- `icon`：方向卡片图标
- `color`：方向卡片强调色

### 新增知识点

在对应方向目录下新增 Markdown 文件，例如 `interviews/knowledge/lora/rank.md`：

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
- `category`：所属方向
- `order`：排序值，数字越小越靠前
- `difficulty`：难度，建议使用 `Easy`、`Medium`、`Hard`
- `tags`：标签数组

## GitHub Pages 部署说明

项目已经自带 GitHub Actions 工作流文件 [deploy.yml](/Users/tanruoying/Desktop/my-interview/.github/workflows/deploy.yml)，推送到 `main` 分支后即可自动构建和部署。

### 1. 推送到 GitHub

如果这是第一次上传仓库：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
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

推送代码后，打开仓库的 `Actions` 页面，查看 `Deploy Interview CMS` 工作流。

它会自动执行：

1. 检出代码
2. 安装依赖
3. 执行 `npm run build`
4. 上传 `dist/`
5. 发布到 GitHub Pages

### 4. 访问网站

部署成功后，普通项目仓库的地址通常是：

```text
https://你的用户名.github.io/你的仓库名/
```

## 部署前建议检查

- 本地 `npm run build` 可以成功执行
- `package-lock.json` 已提交
- `.github/workflows/deploy.yml` 存在
- `interviews/categories/` 中至少有一个方向文件
- `interviews/knowledge/` 中至少有对应知识点文件

## 常见问题

### GitHub Pages 显示 404

检查：

- `Settings > Pages` 是否已选择 `GitHub Actions`
- Actions 是否构建成功
- 访问地址是否包含正确的仓库名

### 页面是空白的

检查：

- 构建是否成功
- `public/interviews.json` 是否已生成
- 浏览器控制台是否有资源加载错误

### 卡片没有内容

检查：

- `interviews/categories/<id>.md` 是否存在
- `interviews/knowledge/<id>/` 是否存在对应知识点文件
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
