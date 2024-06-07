import {getClient} from 'common'

export const get = async () => {
  const config = {
    method: 'get',
    url: '/config',
  }

  return getClient().request(config)
}
