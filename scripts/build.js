import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.dirname(__dirname)

// 读取所有 Markdown 文件
function readMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(dir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data, content: markdown } = matter(content)
      return { ...data, content: markdown, filename: file }
    })
}

// 递归读取目录中的所有 Markdown 文件
function readMarkdownFilesRecursive(dir, baseDir = '') {
  if (!fs.existsSync(dir)) return []
  
  const files = []
  fs.readdirSync(dir).forEach(item => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      files.push(...readMarkdownFilesRecursive(fullPath, path.join(baseDir, item)))
    } else if (item.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const { data, content: markdown } = matter(content)
      files.push({
        ...data,
        content: markdown,
        filename: item,
        relativePath: path.join(baseDir, item)
      })
    }
  })
  
  return files
}

// 主程序
async function build() {
  try {
    const categoriesDir = path.join(projectRoot, 'knowledge', 'categories')
    const itemsDir = path.join(projectRoot, 'knowledge', 'items')
    const publicDir = path.join(projectRoot, 'public')

    // 确保 public 目录存在
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // 读取主题卡片
    const categoryFiles = readMarkdownFiles(categoriesDir)
    
    // 构建分类数据结构
    const categories = categoryFiles.map(category => {
      const categoryId = category.id || category.filename.replace('.md', '')
      
      // 读取该分类下的所有知识点
      const categoryKnowledgeDir = path.join(itemsDir, categoryId)
      const knowledgeFiles = readMarkdownFilesRecursive(categoryKnowledgeDir)
        .sort((a, b) => (a.order || 999) - (b.order || 999))
      
      return {
        id: categoryId,
        title: category.title || categoryId,
        color: category.color || '#3498db',
        items: knowledgeFiles.map((item, index) => ({
          id: item.filename.replace('.md', ''),
          title: item.title || item.filename,
          difficulty: item.difficulty || 'Medium',
          tags: item.tags || [],
          content: item.content,
          order: item.order || index
        }))
      }
    })

    // 生成输出文件
    const output = {
      version: '2.0',
      type: 'hierarchical',
      generatedAt: new Date().toISOString(),
      categories
    }

    const outputPath = path.join(publicDir, 'knowledge.json')
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))

    // 统计信息
    const totalCategories = categories.length
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
    console.log(`Generated ${totalCategories} categories and ${totalItems} knowledge items to ${outputPath}`)

  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

build()
