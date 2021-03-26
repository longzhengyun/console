import Koa from 'koa'
import koaBody from 'koa-body'
import { verify } from '../middleware/verify'
import router from './router'

const app = new Koa()

app.use(
  koaBody({
    jsonLimit: '1024kb',
  })
)

app.use(verify)
app.use(router.routes())

app.listen()

export default {
  path: '/api',
  handler: app.callback(),
}
