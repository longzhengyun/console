import dbQuery from '../config'

export default async (ctx) => {
  const result = {
    code: -1,
    msg: '',
    data: null,
  }

  try {
    const data = await dbQuery(
      'SELECT nickname, email, city, job, motto FROM user_data'
    )
    if (Array.isArray(data) && data.length > 0) {
      result.code = 0
      result.msg = '成功'
      result.data = data[0]
    } else {
      result.msg = '查无数据'
    }
  } catch (error) {
    result.msg = error
  }

  ctx.body = result
}
