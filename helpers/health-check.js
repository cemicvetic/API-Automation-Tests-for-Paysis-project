import {anonymousClient} from 'common'

export const healthCheck = async () => {
  const config = {
    method: 'get',
    url: '/healthcheck',
  }

  return anonymousClient.request(config)
}
