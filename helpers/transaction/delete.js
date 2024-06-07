import {getClient} from 'common'

export const delete_ = async id => {
  const config = {
    method: 'delete',
    url: '/transactions',
    data: {
      id,
    },
  }

  return getClient().request(config)
}
