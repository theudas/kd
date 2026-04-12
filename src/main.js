import './styles.css'
import { marked } from 'marked'

const app = document.querySelector('#app')

marked.setOptions({
  gfm: true,
  breaks: true
})

const state = {
  data: null,
  error: '',
  loading: true
}

function getDataUrl() {
  return `${import.meta.env.BASE_URL}interviews.json`
}

function stripMarkdown(markdown = '') {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>-]/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getExcerpt(markdown, maxLength = 92) {
  const text = stripMarkdown(markdown)
  if (!text) return '等待补充这个知识点的详细说明。'
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function normalizeDifficulty(value = 'Medium') {
  const raw = String(value).toLowerCase()
  if (raw.includes('easy')) return 'easy'
  if (raw.includes('hard')) return 'hard'
  return 'medium'
}

function difficultyLabel(value = 'Medium') {
  const level = normalizeDifficulty(value)
  if (level === 'easy') return 'Easy'
  if (level === 'hard') return 'Hard'
  return 'Medium'
}

function parseHash() {
  const cleanHash = window.location.hash.replace(/^#/, '') || '/'
  const segments = cleanHash.split('/').filter(Boolean).map(decodeURIComponent)

  if (segments.length === 0) {
    return { name: 'home' }
  }

  if (segments[0] === 'category' && segments[1] && segments[2] === 'item' && segments[3]) {
    return {
      name: 'item',
      categoryId: segments[1],
      itemId: segments[3]
    }
  }

  if (segments[0] === 'category' && segments[1]) {
    return {
      name: 'category',
      categoryId: segments[1]
    }
  }

  return { name: 'not-found' }
}

function findCategory(categoryId) {
  return state.data?.categories?.find(category => category.id === categoryId)
}

function findItem(category, itemId) {
  return category?.items?.find(item => item.id === itemId)
}

function routeTo(hash) {
  window.location.hash = hash
}

function renderTag(tag) {
  return `<span class="tag">${escapeHtml(tag)}</span>`
}

function renderBreadcrumbs(entries) {
  return `
    <nav class="breadcrumbs" aria-label="面包屑导航">
      ${entries
        .map(entry => {
          if (entry.href) {
            return `<a href="${entry.href}">${escapeHtml(entry.label)}</a>`
          }

          return `<span>${escapeHtml(entry.label)}</span>`
        })
        .join('<span class="breadcrumbs-sep">/</span>')}
    </nav>
  `
}

function renderHome() {
  const categories = state.data?.categories || []

  return `
    <section class="panel">
      <div class="section-head">
        <h1>技术方向</h1>
      </div>

      <div class="cards-grid categories-grid">
        ${categories
          .map(category => {
            return `
              <article class="card category-card" data-route="#/category/${encodeURIComponent(category.id)}" role="link" tabindex="0">
                <div class="card-glow" style="--card-accent: ${escapeHtml(category.color || '#1f6feb')}"></div>
                <div class="card-topline">
                  <span class="count-pill">${category.items.length} 个知识点</span>
                </div>
                <h3>${escapeHtml(category.title)}</h3>
                <p>${escapeHtml(category.description || '等待补充该方向的简介。')}</p>
                <div class="card-footer">
                  <span>查看知识卡片</span>
                  <span class="arrow">→</span>
                </div>
              </article>
            `
          })
          .join('')}
      </div>
    </section>
  `
}

function renderCategory(category) {
  const introHtml = marked.parse(category.content || '')
  const breadcrumbs = renderBreadcrumbs([
    { label: '首页', href: '#/' },
    { label: category.title }
  ])

  return `
    ${breadcrumbs}

    <section class="detail-hero panel" style="--detail-accent: ${escapeHtml(category.color || '#1f6feb')}">
      <div class="detail-title-row">
        <div class="detail-title-main">
          <div>
            <h1>${escapeHtml(category.title)}</h1>
            ${category.description ? `<p>${escapeHtml(category.description)}</p>` : ''}
          </div>
        </div>
        <a class="ghost-button" href="#/">返回方向首页</a>
      </div>
      <div class="markdown-shell">${introHtml}</div>
    </section>

    <section class="panel">
      <div class="section-head">
        <h2>${escapeHtml(category.title)} 知识点</h2>
      </div>

      <div class="cards-grid knowledge-grid">
        ${category.items
          .map(item => {
            const level = normalizeDifficulty(item.difficulty)
            return `
              <article class="card knowledge-card" data-route="#/category/${encodeURIComponent(category.id)}/item/${encodeURIComponent(item.id)}" role="link" tabindex="0">
                <div class="knowledge-meta">
                  <span class="difficulty ${level}">${difficultyLabel(item.difficulty)}</span>
                  <span class="mini-order">#${item.order ?? 0}</span>
                </div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(getExcerpt(item.content))}</p>
                <div class="tags-row">${(item.tags || []).map(renderTag).join('')}</div>
                <div class="card-footer">
                  <span>查看详细内容</span>
                  <span class="arrow">→</span>
                </div>
              </article>
            `
          })
          .join('')}
      </div>
    </section>
  `
}

function renderItem(category, item) {
  const itemHtml = marked.parse(item.content || '')
  const breadcrumbs = renderBreadcrumbs([
    { label: '首页', href: '#/' },
    { label: category.title, href: `#/category/${encodeURIComponent(category.id)}` },
    { label: item.title }
  ])

  const related = category.items.filter(candidate => candidate.id !== item.id).slice(0, 3)

  return `
    ${breadcrumbs}

    <section class="panel article-shell">
      <div class="article-head">
        <div>
          <h1>${escapeHtml(item.title)}</h1>
        </div>
        <div class="article-actions">
          <a class="ghost-button" href="#/category/${encodeURIComponent(category.id)}">返回 ${escapeHtml(category.title)}</a>
          <a class="solid-button" href="#/">回到首页</a>
        </div>
      </div>

      <div class="article-meta">
        <span class="difficulty ${normalizeDifficulty(item.difficulty)}">${difficultyLabel(item.difficulty)}</span>
        ${(item.tags || []).map(renderTag).join('')}
      </div>

      <article class="markdown-shell article-content">${itemHtml}</article>
    </section>

    ${
      related.length
        ? `
          <section class="panel">
            <div class="section-head">
              <h2>同方向其他卡片</h2>
            </div>
            <div class="cards-grid knowledge-grid">
              ${related
                .map(relatedItem => {
                  return `
                    <article class="card knowledge-card compact" data-route="#/category/${encodeURIComponent(category.id)}/item/${encodeURIComponent(relatedItem.id)}" role="link" tabindex="0">
                      <div class="knowledge-meta">
                        <span class="difficulty ${normalizeDifficulty(relatedItem.difficulty)}">${difficultyLabel(relatedItem.difficulty)}</span>
                      </div>
                      <h3>${escapeHtml(relatedItem.title)}</h3>
                      <p>${escapeHtml(getExcerpt(relatedItem.content, 78))}</p>
                    </article>
                  `
                })
                .join('')}
            </div>
          </section>
        `
        : ''
    }
  `
}

function renderNotFound(message = '没有找到对应页面。') {
  return `
    <section class="panel empty-state">
      <h1>页面不存在</h1>
      <p>${escapeHtml(message)}</p>
      <a class="solid-button" href="#/">返回首页</a>
    </section>
  `
}

function renderLoading() {
  return `
    <section class="panel empty-state">
      <h1>加载中</h1>
    </section>
  `
}

function renderError() {
  return `
    <section class="panel empty-state">
      <h1>内容加载失败</h1>
      <p>${escapeHtml(state.error || '无法读取 interviews.json')}</p>
      <button class="solid-button" type="button" data-action="reload">重新加载</button>
    </section>
  `
}

function renderApp() {
  const route = parseHash()
  let content = ''

  if (state.loading) {
    content = renderLoading()
  } else if (state.error) {
    content = renderError()
  } else if (route.name === 'home') {
    content = renderHome()
  } else if (route.name === 'category') {
    const category = findCategory(route.categoryId)
    content = category ? renderCategory(category) : renderNotFound('这个技术方向还没有生成页面。')
  } else if (route.name === 'item') {
    const category = findCategory(route.categoryId)
    const item = findItem(category, route.itemId)
    content = category && item ? renderItem(category, item) : renderNotFound('这个知识卡片暂时不存在。')
  } else {
    content = renderNotFound()
  }

  app.innerHTML = `
    <div class="site-shell">
      <header class="topbar">
        <a class="brand" href="#/">知识卡片</a>
      </header>
      <main class="page-shell">${content}</main>
    </div>
  `
}

async function loadData() {
  state.loading = true
  state.error = ''
  renderApp()

  try {
    const response = await fetch(getDataUrl())
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload = await response.json()
    state.data = payload
  } catch (error) {
    state.error = error instanceof Error ? error.message : '未知错误'
  } finally {
    state.loading = false
    renderApp()
  }
}

document.addEventListener('click', event => {
  const target = event.target

  if (!(target instanceof HTMLElement)) return

  const actionButton = target.closest('[data-action="reload"]')
  if (actionButton) {
    loadData()
    return
  }

  const routeCard = target.closest('[data-route]')
  if (routeCard instanceof HTMLElement) {
    routeTo(routeCard.dataset.route)
  }
})

document.addEventListener('keydown', event => {
  if (!(event.target instanceof HTMLElement)) return
  if (event.key !== 'Enter' && event.key !== ' ') return

  const routeCard = event.target.closest('[data-route]')
  if (routeCard instanceof HTMLElement) {
    event.preventDefault()
    routeTo(routeCard.dataset.route)
  }
})

window.addEventListener('hashchange', renderApp)

loadData()
