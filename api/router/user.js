import Router from 'koa-router'

import userInfoController from './../controller/userInfo'

const router = new Router()

router.get('/user/info', userInfoController)

export default router
