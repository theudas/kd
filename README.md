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

### 步骤 1：推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/interview-card-cms.git
git push -u origin main
```

### 步骤 2：启用 GitHub Pages

在 GitHub 仓库设置中：
1. 进入 **Settings** → **Pages**
2. 在 **Source** 下选择 **GitHub Actions**
3. 系统已自动识别工作流，无需额外配置

### 步骤 3：自动部署

- 每当你推送到 `main` 分支时，工作流会自动：
  1. 安装依赖
  2. 构建项目
  3. 部署到 GitHub Pages
- 访问 `https://你的用户名.github.io/interview-card-cms`

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

**Q: 如何更新已部署的内容？**
A: 只需编辑 `interviews/` 中的 Markdown 文件，然后推送到 GitHub，工作流会自动重新构建和部署。

**Q: 如何添加新的难度等级？**
A: 编辑 `index.html`，在 CSS 中添加新的 `.difficulty` 类，并在 Markdown front matter 中使用。

**Q: 如果网站部署后没有更新？**
A: 检查 GitHub Actions 的工作流执行状态。清除浏览器缓存或在 GitHub Pages 设置中手动触发重新部署。

## 📄 License

MIT License

## 🤝 贡献

如果你有改进建议，欢迎提交 Issue 或 Pull Request！

---

**开始积累你的面经知识库吧！** 💪
