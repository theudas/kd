# 🎨 自定义指南

## 修改样式

### 更改配色方案

编辑 `index.html` 的 CSS 部分：

```css
/* 修改梯度背景 */
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* 改为你喜欢的颜色，比如: */
  /* background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%); */
}

/* 修改强调色 */
.card::before {
  background: linear-gradient(90deg, #667eea, #764ba2);
  /* 改为: */
  /* background: linear-gradient(90deg, #FF6B6B, #4ECDC4); */
}
```

### 使用现成的配色方案

**暖色方案**
```css
background: linear-gradient(135deg, #FF6B6B 0%, #FFA94D 100%);
```

**蓝绿方案**
```css
background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);
```

**深色方案**
```css
background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
color: #ECF0F1;
```

**莫兰迪配色**
```css
background: linear-gradient(135deg, #A49A8F 0%, #9B8B7E 100%);
```

---

## 修改布局

### 改变卡片网格列数

```css
/* 默认：3 列（超过 1200px 宽度时） */
.cards-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* 改为 2 列（更宽松的布局） */
.cards-grid {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}

/* 改为 4 列（更紧凑的布局） */
.cards-grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
```

### 改变卡片间距

```css
.cards-grid {
  gap: 24px;  /* 改为其他值，如 32px, 16px 等 */
}
```

---

## 修改字体

### 使用自定义字体

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### 推荐的 Google Fonts

- **优雅**：Playfair Display
- **现代**：Inter, Poppins
- **中文**：LXGW WenKai, Sarasa Gothic

```css
/* 中文字体示例 */
@import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai&display=swap');

body {
  font-family: 'LXGW WenKai', sans-serif;
}
```

---

## 添加Logo

在 `index.html` 中修改头部：

```html
<div class="header">
  <img src="./logo.png" alt="Logo" class="logo" style="width: 60px; margin-bottom: 20px;">
  <h1>📚 面经知识库</h1>
  <p>精选面试经验和技术总结</p>
</div>
```

---

## 添加搜索功能

### 第 1 步：修改 HTML

```html
<!-- 在 header 后添加搜索框 -->
<div class="search-box">
  <input 
    type="text" 
    id="searchInput" 
    placeholder="搜索面经..."
    onkeyup="filterCards()"
  >
</div>
```

### 第 2 步：添加 CSS

```css
.search-box {
  text-align: center;
  margin-bottom: 30px;
}

.search-box input {
  width: 300px;
  max-width: 100%;
  padding: 12px 20px;
  border: 2px solid white;
  border-radius: 25px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  outline: none;
}

.search-box input::placeholder {
  color: #999;
}

.search-box input:focus {
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
```

### 第 3 步：添加 JavaScript

```javascript
function filterCards() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const company = card.querySelector('.meta-item')?.textContent.toLowerCase() || '';
    
    if (title.includes(searchTerm) || company.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
```

---

## 添加分类选项卡

### HTML

```html
<div class="filter-tabs">
  <button class="tab-btn active" onclick="filterByTag('all')">全部</button>
  <button class="tab-btn" onclick="filterByTag('JavaScript')">JavaScript</button>
  <button class="tab-btn" onclick="filterByTag('React')">React</button>
  <button class="tab-btn" onclick="filterByTag('系统设计')">系统设计</button>
</div>
```

### CSS

```css
.filter-tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 10px 20px;
  border: 2px solid white;
  border-radius: 20px;
  background: transparent;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-btn:hover,
.tab-btn.active {
  background: white;
  color: #667eea;
}
```

---

## 添加分享功能

在卡片中添加分享按钮：

```html
<div class="card-footer">
  <button class="share-btn" onclick="shareInterview('${interview.title}', '${interview.id}')">
    分享 ↗
  </button>
  <span class="view-btn">查看详情 →</span>
</div>
```

### JavaScript

```javascript
function shareInterview(title, id) {
  const currentUrl = window.location.href;
  const shareUrl = `${currentUrl}#${id}`;
  
  if (navigator.share) {
    navigator.share({
      title: title,
      text: `我发现了一个很好的面经：${title}`,
      url: shareUrl
    });
  } else {
    // 降级方案：复制到剪贴板
    navigator.clipboard.writeText(shareUrl);
    alert('链接已复制！');
  }
}
```

---

## 禁用难度标签

编辑 Markdown 文件时，移除 `difficulty` 字段即可。或在 HTML 中隐藏：

```css
.difficulty {
  display: none;
}
```

---

## 修改文案

### 改变标题

```html
<h1>📚 面经知识库</h1>
<!-- 改为: -->
<h1>🎓 我的面试笔记</h1>
```

### 改变空状态提示

```html
<div class="empty-state" id="emptyState" style="display: none;">
  <h2>暂无面经</h2>
  <p>请在 interviews/ 文件夹中添加 markdown 文件</p>
</div>
<!-- 改为: -->
<div class="empty-state" id="emptyState" style="display: none;">
  <h2>还没有内容</h2>
  <p>开始编写你的第一篇面经吧！</p>
</div>
```

---

## 添加 Dark Mode

### CSS

```css
@media (prefers-color-scheme: dark) {
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  }

  .card {
    background: #0f3460;
    color: #ecf0f1;
  }

  .card-title {
    color: #ecf0f1;
  }

  .detail-markdown {
    color: #ecf0f1;
  }
}
```

---

## 性能优化

### 压缩图片

```bash
# 使用 ImageOptim（macOS）或在线工具压缩图片
```

### 启用 Gzip 压缩

在 `vite.config.js` 中添加：

```javascript
import compression from 'vite-plugin-compression';

export default {
  plugins: [
    compression()
  ]
}
```

### 懒加载 Markdown 内容

修改 `index.html` 中的加载方式，在需要时才加载详细内容。

---

## 高级功能

### 添加统计面试成功率

修改 Front Matter：

```yaml
---
title: 面经标题
result: 成功  # 成功/失败/进行中
compensation: 30w  # 薪资
---
```

### 生成统计页面

创建新的 HTML 页面来展示统计信息。

### 集成评论系统

使用 Disqus 或 Giscus（基于 GitHub Discussions）：

```html
<!-- Giscus 评论系统 -->
<script src="https://giscus.app/client.js"
  data-repo="your/repo"
  data-repo-id="R_..."
  data-category="General"
  data-category-id="DIC_..."
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="light"
  data-lang="zh-CN"
  crossorigin="anonymous"
  async>
</script>
```

---

## 持续改进

记录你的自定义修改：

```markdown
# 自定义修改记录

- [x] 改为蓝绿配色
- [x] 添加搜索功能
- [x] 改变字体为 LXGW WenKai
- [ ] 添加统计页面
- [ ] 集成评论系统
```

保存在 `CUSTOMIZATION.md` 文件中以便后续参考。
