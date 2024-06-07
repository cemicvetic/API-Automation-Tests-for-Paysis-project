import {anonymousClient} from 'common'

export const signIn = async (login, password) => {
  const config = {
    method: 'post',
    url: '/auth',
    data: {
      login,
      password,
    },
  }

  return anonymousClient.request(config)
}
