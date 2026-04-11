import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取所有markdown文件
const interviewsDir = path.join(__dirname, '../interviews');
const publicDir = path.join(__dirname, '../public');

// 确保public目录存在
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 确保interviews目录存在
if (!fs.existsSync(interviewsDir)) {
  fs.mkdirSync(interviewsDir, { recursive: true });
}

const interviews = [];

// 遍历interviews目录
const files = fs.readdirSync(interviewsDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(interviewsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdown } = matter(content);
  
  interviews.push({
    id: path.basename(file, '.md'),
    title: data.title || file,
    company: data.company || 'Unknown',
    position: data.position || 'Unknown',
    tags: data.tags || [],
    date: data.date || new Date().toISOString(),
    difficulty: data.difficulty || 'Medium',
    content: markdown,
    summary: data.summary || markdown.substring(0, 200) + '...'
  });
});

// 写入JSON文件
const outputPath = path.join(publicDir, 'interviews.json');
fs.writeFileSync(
  outputPath,
  JSON.stringify(interviews, null, 2),
  'utf-8'
);

console.log(`✅ Generated ${interviews.length} interview cards to ${outputPath}`);
