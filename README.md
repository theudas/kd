# 📚 Interview Card CMS - 面经卡片系统

一个基于 Markdown 的面经知识库系统，支持通过 GitHub Workflow 自动部署到 GitHub Pages。

## 🎯 功能特性

- ✨ **Markdown 驱动**：使用 Markdown 编写面经内容
- 🎨 **美观卡片展示**：响应式设计的面经卡片
- 🔍 **快速查看**：点击卡片快速查看详细内容
- 🚀 **自动部署**：通过 GitHub Actions 自动构建和部署
- 📱 **移动友好**：完全响应式设计
- 🏷️ **标签系统**：支持多标签分类
- 📊 **难度级别**：Easy / Medium / Hard 三个难度等级

## 📁 项目结构

```
my-interview/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions 工作流
├── interviews/                  # Markdown 面经文件目录
│   ├── frontend-basics.md
│   └── react-advanced.md
├── scripts/
│   └── build.js                 # Markdown 构建脚本
├── public/
│   └── interviews.json          # 生成的数据文件（自动生成）
├── index.html                   # 前端应用入口
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 快速开始

### 1. 本地开发

```bash
# 安装依赖
npm install

# 开发模式（实时预览）
npm run dev

# 打开浏览器访问 http://localhost:5173
```

### 2. 添加面经

在 `interviews/` 目录下创建新的 Markdown 文件，使用以下格式：

```markdown
---
title: 面经标题
company: 公司名称
position: 职位名称
tags: [标签1, 标签2, 标签3]
difficulty: Medium
date: 2024-03-15
summary: 简短摘要（可选）
---

# 面经内容

你的详细面经内容...
```

**Front Matter 说明：**
- `title`：面经标题（必须）
- `company`：公司名称（必须）
- `position`：职位名称（必须）
- `tags`：标签数组，用于分类（可选）
- `difficulty`：难度级别 - Easy / Medium / Hard（可选，默认 Medium）
- `date`：日期，ISO 格式（可选，默认当前日期）
- `summary`：摘要文本（可选，默认使用内容前 200 个字符）

### 3. 本地构建

```bash
npm run build
```

这会：
1. 解析 `interviews/` 中的所有 Markdown 文件
2. 生成 `public/interviews.json` 数据文件
3. 使用 Vite 构建前端应用
4. 生成 `dist/` 目录中的静态文件

### 4. 预览构建结果

```bash
npm run preview
```

## 🔧 配置 GitHub 部署

> 📖 **详细配置指南请见** [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) 

如果部署失败，请首先查看那个文件中的故障排查部分。

### 快速步骤

#### 步骤 1：推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/interview-card-cms.git
git push -u origin main
```

#### 步骤 2：配置 GitHub Pages（重要！）

> ⚠️ 这一步很重要，需要在 GitHub 仓库设置中手动配置

**详细步骤：**

1. **进入仓库设置**
   - 打开你的 GitHub 仓库页面
   - 点击顶部菜单中的 **Settings**（设置）
   - 在左侧菜单中找到 **Pages**（页面）

2. **配置 GitHub Pages Source**
   - 在 **Source** 部分，选择 **Deploy from a branch**（从分支部署）
   - **Branch** 下拉菜单选择：`gh-pages` / `/(root)`
   - 点击 **Save**（保存）

3. **验证部署**
   - 返回 **Actions** 标签
   - 查看是否有绿色的 ✅ **Deploy Interview CMS** 流程
   - 如果显示红色 ❌，点击查看错误日志

4. **访问你的网站**
   ```
   https://你的用户名.github.io/interview-card-cms
   ```

**常见问题排查：**

| 问题 | 解决方案 |
|------|--------|
| Actions 中仍显示 ❌ | 检查是否已保存 GitHub Pages 设置 |
| 网站显示 404 | 等待 1-2 分钟，刷新浏览器，或检查仓库名称是否正确 |
| 样式加载失败 | 清除浏览器缓存（Cmd+Shift+Delete） |
| 面经卡片为空 | 检查 `interviews/` 文件夹中是否有 .md 文件 |

### 步骤 3：自动部署工作流

- 每当你推送到 `main` 分支时，工作流会自动：
  1. ✅ 检出代码
  2. ✅ 安装依赖（使用 package-lock.json）
  3. ✅ 构建项目（生成 dist 文件夹）
  4. ✅ 上传到 GitHub Pages
  5. ✅ 自动部署到网站

- 查看部署状态：**Actions** → 最新的工作流 → 查看日志

### 步骤 4：持续更新

每次你需要添加或修改面经：

```bash
# 1. 创建或编辑面经文件
# 编辑 interviews/ 中的 .md 文件

# 2. 本地测试（可选）
npm run dev

# 3. 提交并推送
git add .
git commit -m "Add/Update interviews"
git push origin main

# GitHub Actions 会自动构建和部署！
```

## 📝 Markdown 示例

```markdown
---
title: JavaScript 异步编程
company: 腾讯
position: JavaScript 工程师
tags: [JavaScript, async, Promise, async/await]
difficulty: Hard
date: 2024-03-20
---

# JavaScript 异步编程深度解析

## 回调函数

回调函数是最早的异步处理方式...

## Promise

### Promise 的三个状态

- **Pending**：待定状态
- **Fulfilled**：已成功
- **Rejected**：已失败

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});
```

## async/await

async/await 是处理异步代码的现代方式...
```

## 🎨 自定义样式

编辑 `index.html` 中的 `<style>` 标签来自定义样式。关键的 CSS 变量/颜色：

- 梯度背景：`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- 强调色：`#667eea`
- 卡片背景：`white`

## 🔧 环境要求

- Node.js 18+
- npm 或 yarn

## 📦 依赖

- **Vue 3**：前端框架（可选，当前版本使用 Vanilla JS）
- **Vite**：构建工具
- **Marked**：Markdown 解析器
- **Gray Matter**：Front Matter 解析器

## 🚦 工作流说明

GitHub Actions 工作流 (`.github/workflows/deploy.yml`) 做以下事情：

1. **检出代码**：获取仓库代码
2. **设置 Node.js**：配置 Node.js 环境
3. **安装依赖**：`npm ci`
4. **构建项目**：`npm run build`
5. **部署**：将 `dist/` 目录推送到 GitHub Pages

## 🎯 使用建议

1. **组织结构**：为不同类型的面经创建分类，如 `frontend/`、`backend/`、`devops/` 等
2. **标签系统**：统一使用标签便于分类，如 JavaScript、Python、系统设计等
3. **难度分级**：
   - **Easy**：基础概念题
   - **Medium**：中等难度题
   - **Hard**：深度理解和系统设计题

4. **格式规范**：
   - 使用清晰的标题层级
   - 使用代码块展示代码示例
   - 使用列表和表格组织信息

## 📚 进阶用法

### 自定义构建脚本

修改 `scripts/build.js` 来改变数据处理方式，例如：
- 生成目录索引
- 添加搜索功能
- 统计面经数量

### 支持图片

在 Markdown 中引用图片：

```markdown
![描述](./images/example.png)
```

将图片放在 `interviews/` 目录或创建 `interviews/images/` 子目录

## 🐛 常见问题

### 本地开发问题

**Q: 如何更新已部署的内容？**
A: 只需编辑 `interviews/` 中的 Markdown 文件，然后推送到 GitHub，工作流会自动重新构建和部署。

**Q: 如何添加新的难度等级？**
A: 编辑 `index.html`，在 CSS 中添加新的 `.difficulty` 类，并在 Markdown front matter 中使用。

**Q: 本地 npm run dev 报错？**
A: 
```bash
# 清除缓存并重新安装
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

### GitHub Pages 部署问题

**Q: GitHub Actions 中仍然显示红色 ❌？**
A: 这通常是因为未配置 GitHub Pages 设置。请按以下步骤操作：
1. 进入仓库 **Settings** → **Pages**
2. 在 **Source** 部分选择 **Deploy from a branch**
3. Branch 选择 **gh-pages** / **root**
4. 点击 **Save** 保存
5. 返回 **Actions** 重新运行工作流

**Q: 网站显示 404？**
A: 
- 等待 1-2 分钟后刷新浏览器
- 检查 URL 是否正确：`https://用户名.github.io/仓库名`
- 检查浏览器缓存：Cmd+Shift+Delete（Mac）或 Ctrl+Shift+Delete（Windows）

**Q: 卡片为空或样式加载失败？**
A:
- 确保 `interviews/` 文件夹有 .md 文件
- 本地运行 `npm run build` 生成数据文件
- 清除浏览器缓存重新加载
- 检查浏览器开发者工具（F12）的网络标签是否有 404 错误

**Q: 什么是 package-lock.json 为什么要提交它？**
A: `package-lock.json` 确保 GitHub Actions 中安装的依赖版本与本地完全相同，避免部署时版本不一致导致的问题。

**Q: 部署后多久能看到更新？**
A: GitHub Actions 通常在 1-3 分钟内完成部署。如果超过 5 分钟仍未更新，检查 Actions 日志查看错误。

### 内容管理问题

**Q: 如果网站部署后没有更新？**
A: 检查 GitHub Actions 的工作流执行状态。清除浏览器缓存或等待重新部署。

**Q: 能否自定义网站样式？**
A: 完全可以！编辑 `index.html` 中的 `<style>` 标签即可修改：
- 背景颜色和梯度
- 卡片样式
- 文字颜色
- 阴影效果
- 等等

更多信息见 `CUSTOMIZATION.md` 文件。

## 📄 License

MIT License

## 🤝 贡献

如果你有改进建议，欢迎提交 Issue 或 Pull Request！

---

**开始积累你的面经知识库吧！** 💪
