import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from '@hono/node-server/serve-static'
import { appConfig } from './app-config.js'

import { config } from 'dotenv'


 

const app = new Hono()
 
// ENVIRONMENT CONFIG :
const env = appConfig.NODE_ENV || 'development'
console.log('Loaded env:', env)
config({ path: `.env.${env}` })


//MiddelwareS
app.use('/static/*', serveStatic({ root: './' }))
app.use(logger())
app.notFound((c) => {
  return c.json({
    message: 'Not Found',
  },404)
})

// ROUTES
app.get('/', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  },200)
})

 
//start the server
serve(
  {
    fetch: app.fetch,
    port:  process.env.PORT ? parseInt(process.env.PORT) :3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
    console.log(`${process.env.PORT}`)
  }
)
