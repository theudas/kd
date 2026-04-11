#!/bin/bash

# 打印项目树形结构
cat << 'EOF'

📦 interview-card-cms
│
├── 🌐 【前端应用】
│   └── index.html                    ✨ 完整的单页应用（核心文件）
│
├── 📝 【面经内容】
│   └── interviews/
│       ├── frontend-basics.md        • JavaScript 基础面经
│       ├── react-advanced.md         • React 高级面经
│       └── system-design-ticket.md   • 系统设计面经
│
├── 📊 【自动生成的数据】
│   └── public/
│       └── interviews.json           🔄 构建时自动生成
│
├── 🛠️ 【构建脚本】
│   └── scripts/
│       ├── build.js                  ⚙️ Markdown 解析脚本
│       └── create.js                 ⚙️ 快速创建脚本
│
├── ⚙️ 【配置文件】
│   ├── package.json                  📦 Node.js 配置
│   ├── vite.config.js                🔨 Vite 构建配置
│   └── .gitignore                    🚫 Git 忽略配置
│
├── 🚀 【GitHub 自动化】
│   └── .github/workflows/
│       └── deploy.yml                🤖 自动部署配置
│
└── 📚 【完整文档】
    ├── START_HERE.md                 👈 【从这里开始】
    ├── QUICK_REFERENCE.md            ⚡ 快速参考卡片
    ├── QUICK_START.md                🚀 5分钟快速开始
    ├── README.md                     📖 完整项目文档
    ├── PROJECT_OVERVIEW.md           🔍 项目深度解析
    └── CUSTOMIZATION.md              🎨 自定义详细指南

EOF

echo "✅ 项目创建完成！"
echo ""
echo "🚀 快速开始："
echo "  1. cd ~/Desktop/my-interview"
echo "  2. npm install"
echo "  3. npm run dev"
echo "  4. 打开 http://localhost:5173"
echo ""
echo "📖 推荐阅读顺序："
echo "  1. START_HERE.md       (这是什么？该怎么用？)"
echo "  2. QUICK_START.md      (快速上手)"
echo "  3. README.md           (完整了解)"
echo ""
