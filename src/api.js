// Simple localStorage-based mock API for articles.
// Each article: {slug, title, description, body, createdAt, author}
const KEY = 'sb_articles_v1'

function readAll(){
  const raw = localStorage.getItem(KEY)
  if(!raw) return []
  try { return JSON.parse(raw) } catch { return [] }
}
function writeAll(arr){
  localStorage.setItem(KEY, JSON.stringify(arr))
}

function makeSlug(title){
  return title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') + '-' + Math.random().toString(36).slice(2,7)
}

export async function listArticles(){
  return readAll()
}

export async function getArticle(slug){
  return readAll().find(a=>a.slug===slug) || null
}

export async function createArticle({title, description, body, author}){
  const articles = readAll()
  const slug = makeSlug(title)
  const article = {slug, title, description, body, createdAt:Date.now(), author}
  articles.unshift(article)
  writeAll(articles)
  return article
}

export async function updateArticle(slug, {title, description, body}){
  const articles = readAll()
  const idx = articles.findIndex(a=>a.slug===slug)
  if(idx===-1) throw new Error('Not found')
  articles[idx] = {...articles[idx], title, description, body}
  writeAll(articles)
  return articles[idx]
}

export async function deleteArticle(slug){
  let articles = readAll()
  const idx = articles.findIndex(a=>a.slug===slug)
  if(idx===-1) throw new Error('Not found')
  const removed = articles.splice(idx,1)[0]
  writeAll(articles)
  return removed
}
