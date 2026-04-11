# 🎬 立即开始！

## 5 分钟快速启动

### ⏱️ 需要时间：< 5 分钟

### 📍 项目位置
```
/Users/tanruoying/Desktop/my-interview
```

---

## 🚀 3 行代码启动

```bash
cd ~/Desktop/my-interview
npm install
npm run dev
```

**然后打开**: http://localhost:5173 ✨

---

## ✅ 检查清单

### ☐ 步骤 1：安装依赖（1分钟）
```bash
cd ~/Desktop/my-interview
npm install
```

### ☐ 步骤 2：启动开发服务器（30秒）
```bash
npm run dev
```

### ☐ 步骤 3：打开浏览器（30秒）
访问: http://localhost:5173

### ☐ 步骤 4：查看示例内容（1分钟）
- 看到 3 张面经卡片
- 点击卡片查看详情
- 查看美化的内容

### ☐ 步骤 5：创建新面经（1分钟）
```bash
npm run create -- \
  --title "我的第一篇面经" \
  --company "想去的公司" \
  --position "梦想职位"
```

---

## 📖 推荐阅读顺序

1. **START_HERE.md** ← 📍 从这里开始  
   了解项目是什么，有什么功能

2. **QUICK_START.md** ← 快速开始  
   学习基本操作和 Markdown 格式

3. **README.md** ← 完整文档  
   了解所有功能和配置

---

## 🎯 立即体验

### 展示面经卡片
你已经有 3 篇示例面经：
- ✅ JavaScript 基础面经
- ✅ React 高级面经  
- ✅ 系统设计面经

点击卡片可以查看完整内容！

### 自己创建面经

**方式 A - 快速创建**
```bash
npm run create -- --title "我的面经" --company "公司名" --position "职位"
```

**方式 B - 手动创建**
创建文件：`interviews/my-interview.md`
```markdown
---
title: 我的面经
company: 我的公司
position: 我的职位
tags: [标签1, 标签2]
difficulty: Medium
---

# 面经标题

## 问题

我的问题...

## 答案

我的答案...
```

---

## 🌐 部署到网络

### 第 1 步：创建 GitHub 账户（如果没有）
访问：https://github.com

### 第 2 步：创建新仓库
- Repository name: `interview-card-cms`
- 选择 Public
- 点击 Create repository

### 第 3 步：推送本地代码
```bash
cd ~/Desktop/my-interview

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/interview-card-cms.git
git push -u origin main
```

### 第 4 步：启用 GitHub Pages
进入 GitHub 仓库：
1. 点击 **Settings**
2. 左侧选择 **Pages**
3. **Source** 选择 **GitHub Actions**
4. 完成！

### 第 5 步：访问你的网站
```
https://你的用户名.github.io/interview-card-cms
```

---

## 📝 Markdown 模板

最简单的面经模板：

```markdown
---
title: 问题标题
company: 公司名
position: 职位
---

# 标题

## 问题描述

...

## 答案

...
```

---

## 💡 实用技巧

### 快速编辑
1. 本地编辑 `interviews/*.md`
2. 刷新浏览器看效果（npm run dev 正在运行）
3. 推送到 GitHub 自动部署

### 删除示例面经
```bash
rm interviews/frontend-basics.md
rm interviews/react-advanced.md
rm interviews/system-design-ticket.md
```

### 查看构建日志
```bash
npm run build
```

---

## ❓ 遇到问题？

### 问题 1：npm install 报错
```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm install
```

### 问题 2：浏览器打不开 http://localhost:5173
- 检查是否运行了 `npm run dev`
- 等待 "ready in xxx ms" 消息出现

### 问题 3：GitHub 部署失败
- 检查 Actions 标签中的错误信息
- 确保代码初始化了 git

---

## 📚 完整文档

| 文件 | 内容 | 建议阅读时间 |
|------|------|-----------|
| START_HERE.md | 项目概览 | 10分钟 |
| QUICK_START.md | 快速开始 | 5分钟 |
| README.md | 完整文档 | 15分钟 |
| QUICK_REFERENCE.md | 快速查询 | 按需 |
| CUSTOMIZATION.md | 自定义指南 | 按需 |
| PROJECT_OVERVIEW.md | 技术深入 | 按需 |

---

## 🎉 就这么简单！

你现在可以：
- ✅ 本地开发和测试
- ✅ 创建和编辑面经
- ✅ 部署到网络供人访问
- ✅ 与朋友分享

**下一步？开始编写你的第一篇面经吧！** 📝

---

## 🚀 命令速查表

```bash
# 开发命令
npm run dev          # 启动本地开发
npm run build        # 生产构建
npm run preview      # 预览构建结果

# 创建和管理
npm run create       # 快速创建新面经

# 部署
git push             # 推送到 GitHub（自动部署）
```

---

**现在就打开终端，运行 `npm run dev` 吧！** 🎊
