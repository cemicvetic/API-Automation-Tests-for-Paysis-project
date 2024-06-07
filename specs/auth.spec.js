import {signIn} from 'helpers'

describe('Authorization & Authentication', () => {
  test('Sign in with existing credentials', async () => {
    const response = await signIn(process.env.LOGIN, process.env.PASSWORD)

    expect(response.status).toEqual(200)
    expect(response.data).toEqual({
      token: expect.any(String),
    })
  })

  test('Sign in with not existing credentials', async () => {
    const response = await signIn('invalid', 'invalid')

    expect(response.status).toEqual(404)
    expect(response.data).toEqual({
      message: 'Wrong login or password.',
    })
  })
})
