import {getClient} from 'common'

export const patch = async (number_of_entries = null, initial_amount = null) => {
  const config = {
    method: 'patch',
    url: '/config',
    data: {
      number_of_entries,
      initial_amount,
    },
  }

  return getClient().request(config)
}
