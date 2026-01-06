import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API endpoint for data
app.get('/api/data', async (c) => {
  try {
    const dataPath = path.join(__dirname, '../public/static/data.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    return c.json(data)
  } catch (error) {
    return c.json({ error: 'Data not found' }, 404)
  }
})

// Main HTML page - serve index.html
app.get('/', async (c) => {
  try {
    const htmlPath = path.join(__dirname, '../public/index.html')
    const html = fs.readFileSync(htmlPath, 'utf-8')
    return c.html(html)
  } catch (error) {
    return c.text('Error loading page', 500)
  }
})

const port = process.env.PORT || 3000
console.log(`Server starting on port ${port}...`)

serve({
  fetch: app.fetch,
  port
})

console.log(`🚀 HANA AI Agent running at http://localhost:${port}`)
