import {getClient} from 'common'

export const create = async (from, to, amount) => {
  const config = {
    method: 'post',
    url: '/transactions',
    data: {
      from,
      to,
      amount,
    },
  }

  return getClient().request(config)
}
