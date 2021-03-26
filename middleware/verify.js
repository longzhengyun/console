import Promise from 'bluebird'
import jwt from 'jsonwebtoken'
import Cookies from 'cookie-universal-nuxt'
import secret from '../api/config/secret'

const jwtVerify = Promise.promisify(jwt.verify)

const verify = async (ctx, next) => {
  const url = ctx.request.url
  const method = ctx.request.method

  if (url !== '/auth/login' && method === 'POST') {
    const result = {
      code: -2, // -1: 普通错误 -2: token失效
      msg: '',
      data: null,
    }

    const token = Cookies.get('token')

    try {
      // 解码
      await jwtVerify(token, secret)
      await next()
    } catch (err) {
      result.msg = 'token 已失效!'

      // 清除浏览器失效token
      ctx.cookies.set('token', '', {
        maxAge: 0,
      })
      ctx.body = result
    }
  } else {
    await next()
  }
}

export { verify }
