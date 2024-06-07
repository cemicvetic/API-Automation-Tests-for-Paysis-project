import {getClient} from 'common'

export const create = async () => {
  const config = {
    method: 'post',
    url: '/users',
  }

  return getClient().request(config)
}
