# 🚀 快速开始指南

## 5 分钟快速上手

### 1️⃣ 安装依赖
```bash
npm install
```

### 2️⃣ 本地开发
```bash
npm run dev
```
打开浏览器访问：`http://localhost:5173`

### 3️⃣ 添加你的第一篇面经

创建文件：`interviews/my-first-interview.md`

```markdown
---
title: 我的第一篇面经
company: 我的公司
position: 工程师
tags: [标签1, 标签2]
difficulty: Medium
---

# 面经标题

这是我的面经内容...

## 核心问题

1. 问题一
2. 问题二

## 答案

我的答案...
```

### 4️⃣ 本地构建测试
```bash
npm run build
npm run preview
```

### 5️⃣ 推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/interview-card-cms.git
git push -u origin main
```

### 6️⃣ 启用 GitHub Pages

在 GitHub 仓库：
- Settings → Pages → Source 选择 **GitHub Actions**

完成！访问 `https://YOUR_USERNAME.github.io/interview-card-cms` 查看你的面经！

---

## 📝 Front Matter 格式说明

```yaml
---
title: 面经标题 ⭐️ 必须
company: 公司名称 ⭐️ 必须
position: 职位名称 ⭐️ 必须
tags: [JavaScript, React] # 标签列表（可选）
difficulty: Medium # Easy / Medium / Hard（可选）
date: 2024-03-15 # ISO 日期格式（可选）
summary: 自定义摘要（可选）
---
```

---

## 💡 文件命名建议

- ✅ 使用英文或拼音，用连字符分隔：`frontend-basics.md`
- ✅ 避免空格和特殊字符
- ❌ 不要使用：`我的面经.md` 或 `interview_1.md`

---

## 🎨 支持的 Markdown 语法

```markdown
# 标题 1
## 标题 2
### 标题 3

**粗体文本** 或 __粗体文本__
*斜体文本* 或 _斜体文本_

- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2

[链接文本](https://example.com)

![图片描述](./images/example.png)

> 引用文本

`行内代码`

\`\`\`javascript
// 代码块
const hello = "world";
\`\`\`

| 表头 1 | 表头 2 |
|--------|--------|
| 单元格 | 单元格 |
```

---

## 🔄 更新流程

1. 编辑或创建 `interviews/` 中的 Markdown 文件
2. 本地测试：`npm run dev`
3. 推送到 GitHub：`git push`
4. 自动部署（GitHub Actions 会自动执行）
5. 访问网站查看更新

---

## ❓ 常见问题

**Q: 我可以在本地测试所有功能吗？**
A: 可以！运行 `npm run dev` 就能完全测试。

**Q: 部署后多久看到更新？**
A: GitHub Actions 通常在 1-2 分钟内完成部署。

**Q: 我想修改样式？**
A: 编辑 `index.html` 中的 `<style>` 标签。

**Q: 我想支持更多 Markdown 功能？**
A: Marked 已经支持所有标准 Markdown，直接在 Markdown 中使用即可。

---

## 🎯 下一步

- ✍️ 开始编写你的面经
- 🏷️ 使用标签组织内容
- 🚀 推送到 GitHub 部署
- 📤 分享你的面经网址给朋友

祝你面试成功！ 🎉
