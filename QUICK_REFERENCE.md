# 🎯 快速参考卡片

## 开始使用（3 步）

```bash
# 1. 安装
npm install

# 2. 开发
npm run dev

# 3. 创建面经
np run create -- --title "标题" --company "公司" --position "职位"
```

然后打开 http://localhost:5173 ✨

---

## 快速部署（5 步）

```bash
# 1. 初始化 Git（如果还没有）
git init

# 2. 推送到 GitHub
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/用户名/interview-card-cms.git
git push -u origin main

# 3. GitHub 设置
# 进入 Settings → Pages → Source 选择 "GitHub Actions"

# 4. 完成！
# 每次 push 都会自动部署

# 5. 访问
# https://用户名.github.io/interview-card-cms
```

---

## Markdown 模板

```markdown
---
title: 问题标题
company: 公司名
position: 职位
tags: [标签1, 标签2]
difficulty: Medium
---

# 标题

## 问题

...

## 回答

...
```

---

## 常用命令

| 命令 | 功能 |
|------|------|
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建 |
| `npm run create -- --title "..." --company "..." --position "..."` | 创建新面经 |

---

## 项目结构

```
interviews/           ← 添加你的面经 .md 文件
├── frontend-basics.md
├── react-advanced.md
└── system-design-ticket.md

index.html           ← 主页面（无需单独修改 JS）
scripts/
├── build.js         ← 自动解析 Markdown
└── create.js        ← 创建新面经
```

---

## 文件说明

| 文件 | 说明 |
|------|------|
| README.md | 完整文档 |
| QUICK_START.md | 快速开始 |
| CUSTOMIZATION.md | 自定义指南 |
| PROJECT_OVERVIEW.md | 项目详解 |

---

## Front Matter 字段

| 字段 | 必需 | 例子 |
|------|------|------|
| title | ✅ | "React Hooks 面试题" |
| company | ✅ | "字节跳动" |
| position | ✅ | "前端工程师" |
| tags | ❌ | ["React", "Hooks"] |
| difficulty | ❌ | "Hard" |
| date | ❌ | "2024-03-15" |
| summary | ❌ | "自定义摘要" |

---

## 调试

**本地测试失败？**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**GitHub 部署失败？**
- 检查 GitHub Actions 日志
- 确保 interviews/ 有 .md 文件
- 运行 `npm run build` 本地验证

**网站显示为空？**
- 检查浏览器控制台错误
- 清除缓存：Cmd/Ctrl + Shift + Delete
- 检查 public/interviews.json 是否生成

---

## 下一步

1. ✍️ 编写你的第一篇面经
2. 🚀 推送到 GitHub  
3. 📱 分享链接给朋友
4. 🎨 自定义样式（见 CUSTOMIZATION.md）

---

## 支持的 Markdown

✅ 标题、段落、列表
✅ 代码块（带语法高亮）
✅ 表格、引用
✅ 链接、图片
✅ 强调文本

---

## 配色推荐

| 配色 | 梯度代码 |
|------|---------|
| 紫蓝（默认） | `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` |
| 暖色 | `linear-gradient(135deg, #FF6B6B 0%, #FFA94D 100%)` |
| 蓝绿 | `linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)` |
| 深色 | `linear-gradient(135deg, #2C3E50 0%, #34495E 100%)` |

---

## 联系和反馈

- 📧 问题反馈：GitHub Issues
- 💬 讨论改进：GitHub Discussions
- 🌟 如果有帮助，请 Star！

---

**现在就开始构建你的面经知识库吧！** 🚀
