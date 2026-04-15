#!/usr/bin/env node

/**
 * 快速创建面经文件的脚本
 * 
 * 使用方法:
 * npm run create -- --title "面经标题" --company "公司名" --position "职位" --tags "标签1,标签2"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 解析命令行参数
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i += 2) {
  const key = args[i].replace(/^--/, '');
  const value = args[i + 1];
  params[key] = value;
}

// 验证必需参数
const required = ['title', 'company', 'position'];
const missing = required.filter(key => !params[key]);

if (missing.length > 0) {
  console.error('缺少必需参数:', missing.join(', '));
  console.error('\n使用方法:');
  console.error('npm run create -- \\');
  console.error('  --title "面经标题" \\');
  console.error('  --company "公司名" \\');
  console.error('  --position "职位名" \\');
  console.error('  [--tags "标签1,标签2"] \\');
  console.error('  [--difficulty "Easy|Medium|Hard"] \\');
  console.error('  [--date "2024-03-15"]');
  process.exit(1);
}

// 生成文件名
const filename = params.title
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '')
  .substring(0, 50);

const filepath = path.join(__dirname, 'knowledge', 'interviews', `${filename}.md`);

// 检查文件是否存在
if (fs.existsSync(filepath)) {
  console.error(`文件已存在: ${filepath}`);
  process.exit(1);
}

// 构建 Front Matter
const tags = params.tags ? params.tags.split(',').map(t => t.trim()) : [];
const difficulty = params.difficulty || 'Medium';
const date = params.date || new Date().toISOString().split('T')[0];

const frontmatter = `---
title: ${params.title}
company: ${params.company}
position: ${params.position}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
difficulty: ${difficulty}
date: ${date}
summary: "在这里添加摘要"
---

# ${params.title}

## 背景信息

在这里描述面经背景...

## 核心问题

### 问题 1

**问**: 

**答**: 

## 面经总结

- 核心点 1
- 核心点 2
- 核心点 3

## 相关资源

- [资源链接](https://example.com)
`;

// 创建 knowledge/interviews 目录（如果不存在）
const interviewsDir = path.join(__dirname, 'knowledge', 'interviews');
if (!fs.existsSync(interviewsDir)) {
  fs.mkdirSync(interviewsDir, { recursive: true });
}

// 写入文件
fs.writeFileSync(filepath, frontmatter, 'utf-8');

console.log('面经文件已创建');
console.log(`路径: ${filepath}`);
console.log('\n编辑提示:');
console.log(`  1. 打开文件: ${filepath}`);
console.log(`  2. 编写你的面经内容`);
console.log(`  3. 运行 'npm run dev' 本地预览`);
console.log(`  4. 运行 'npm run build' 构建`);
console.log(`  5. 运行 'git push' 自动部署`);
