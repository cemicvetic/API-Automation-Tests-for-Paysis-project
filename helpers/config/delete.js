import {getClient} from 'common'

export const delete_ = async () => {
  const config = {
    method: 'delete',
    url: '/config',
  }

  return getClient().request(config)
}
