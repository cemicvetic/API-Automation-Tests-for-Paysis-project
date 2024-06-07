import {getClient} from 'common'

export const delete_ = async id => {
  const config = {
    method: 'delete',
    url: '/users',
    data: {
      id,
    },
  }

  return getClient().request(config)
}
