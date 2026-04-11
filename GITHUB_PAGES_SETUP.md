# 🚀 GitHub Pages 部署完整指南

## 问题诊断

如果你的部署失败，通常有以下几个原因：

1. ❌ **GitHub Pages 未配置** - 最常见的问题
2. ❌ **缓存问题** - 浏览器缓存导致无法加载最新页面
3. ❌ **权限不足** - Actions 没有写入权限
4. ❌ **构建失败** - npm 依赖或构建过程出错

---

## ✅ 完整设置步骤

### 第 1 步：本地准备

```bash
# 1. 确保代码已提交
cd ~/Desktop/my-interview
git add .
git commit -m "Initial commit"

# 2. 推送到 GitHub main 分支
git push origin main
```

### 第 2 步：GitHub Pages 配置（关键步骤）

> ⚠️ **这是最重要的一步！很多部署失败都是因为没有配置这个**

**操作步骤：**

1. **打开 GitHub 仓库**
   - 访问：`https://github.com/你的用户名/Interview-Card-CMS`

2. **进入设置页面**
   - 点击仓库顶部的 **Settings**（齿轮图标）
   - 在左侧菜单中找到 **Pages**（如果没看到，向下滚动）

3. **配置 Pages Source**
   
   **方案 A：使用 GitHub Actions（推荐）** ⭐
   - 在 **Build and deployment** 部分
   - **Source** 选择 **GitHub Actions**
   - 页面会自动识别项目中的 `.github/workflows/deploy.yml`
   - 无需其他配置

   **方案 B：使用 gh-pages 分支**
   - **Source** 选择 **Deploy from a branch**
   - **Branch** 选择 **gh-pages**
   - **/(root)** 保持不变
   - 点击 **Save**

4. **保存设置**
   - 点击 **Save**（如果有该按钮）
   - 页面会刷新

### 第 3 步：检查部署状态

1. **进入 Actions 标签**
   - 仓库主页 → 点击 **Actions** 标签
   
2. **查看工作流**
   - 应该能看到 **Deploy Interview CMS** 的工作流
   
3. **查看执行状态**
   - ✅ 绿色 = 成功部署
   - ⏳ 黄色 = 正在执行
   - ❌ 红色 = 失败（点击查看错误日志）

4. **等待部署完成**
   - 首次部署可能需要 2-5 分钟
   - 刷新 Actions 页面查看最新状态

### 第 4 步：访问网站

等待部署完成后（Actions 中显示绿色 ✅），访问：

```
https://你的用户名.github.io/Interview-Card-CMS
```

替换 `你的用户名` 为你的 GitHub 用户名。

---

## 🔍 故障排查

### ❌ Actions 中显示 Deploy Fail

**可能原因和解决方案：**

| 错误信息 | 原因 | 解决方案 |
|--------|------|--------|
| "Permission denied" | 权限不足 | 检查 GitHub Pages 设置是否已保存 |
| "npm ERR!" | 依赖安装失败 | 本地运行 `npm install` 检查是否有错误 |
| "Build failed" | 构建出错 | 查看详细日志，通常是 Node.js 版本问题 |

**查看详细错误日志：**

1. 进入 **Actions** 标签
2. 点击最新的 **Deploy Interview CMS** 工作流
3. 展开 **Build project** 或 **Deploy to GitHub Pages** 步骤
4. 查看错误信息

### 🌐 网站返回 404

**可能原因：**

1. URL 不正确
   - ❌ 错误：`https://你的用户名.github.io/interview-card-cms/`（小写）
   - ✅ 正确：`https://你的用户名.github.io/Interview-Card-CMS/`（确切的仓库名）

2. Pages 还未就绪
   - 等待 1-2 分钟后刷新
   - 检查 Settings → Pages 中是否显示 "Your site is live at..."

3. 浏览器缓存
   - 清除缓存：**Cmd+Shift+Delete**（Mac）或 **Ctrl+Shift+Delete**（Windows）
   - 或使用隐私模式打开网站

### 📦 卡片为空或内容加载不出来

**原因：**

1. `interviews/` 文件夹中没有 .md 文件
   - 检查是否有面经文件

2. 数据文件未生成
   - 解决：
     ```bash
     npm run build
     git add .
     git commit -m "Generate interviews.json"
     git push origin main
     ```

3. 构建产物不完整
   - 检查 Actions 日志中的 "Build project" 步骤
   - 确保生成了 `dist/` 目录

### 🎨 样式加载不出来

- 清除浏览器缓存
- 检查浏览器开发者工具（F12）的网络标签
- 看是否有 CSS 文件的 404 错误

---

## 📋 验证清单

部署前检查以下项目：

- [ ] 代码已提交到 `main` 分支
- [ ] `package-lock.json` 已提交
- [ ] `.github/workflows/deploy.yml` 文件存在
- [ ] GitHub Pages 已配置（Settings → Pages）
- [ ] `interviews/` 文件夹中有至少一个 .md 文件
- [ ] 本地 `npm run build` 能成功执行
- [ ] Actions 中显示部署成功（绿色 ✅）
- [ ] 能访问网站 URL 且显示内容

---

## 🔄 持续更新流程

一旦部署完成，后续更新很简单：

```bash
# 1. 创建或编辑面经文件（在 interviews/ 目录中）

# 2. 提交并推送
git add .
git commit -m "Add new interview: [标题]"
git push origin main

# 3. 自动部署
# GitHub Actions 会自动构建和部署
# 1-3 分钟后，网站就更新了！
```

---

## 🆘 需要更多帮助？

1. **查看 Actions 日志**
   - 这是最重要的调试信息来源
   - 大多数问题都能从日志中看出

2. **检查网络标签**
   - 打开网站，按 F12
   - 点击 "Network" 标签
   - 查看是否有 404 错误

3. **验证文件结构**
   - 确保 `interviews/` 有 .md 文件
   - 确保 `package.json` 存在
   - 确保 `.github/workflows/deploy.yml` 存在

---

## ✨ 成功标志

当你看到以下这些，说明部署成功了：

✅ 仓库 Settings → Pages 显示 "Your site is live at https://..."
✅ Actions 中最新的工作流显示绿色 ✅
✅ 能访问网站 URL 并看到面经卡片
✅ 卡片显示面经标题、公司、职位等信息
✅ 点击卡片能展开查看详细内容

---

**现在你已经准备好了！按照上面的步骤操作，应该能成功部署！** 🎉
