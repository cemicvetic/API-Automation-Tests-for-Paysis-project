import {getClient} from 'common'

export const get = async (id = null) => {
  const config = {
    method: 'get',
    url: '/transactions',
    params: {
      id,
    },
  }

  return getClient().request(config)
}
