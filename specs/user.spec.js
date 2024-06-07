import {user} from 'helpers'

describe('User', () => {
  let userIds = []

  afterAll(async () => {
    for await (const userId of userIds) {
      await user.delete(userId)
    }
  })

  test('Create user', async () => {
    const {data, status} = await user.create()
    userIds.push(data.id)

    expect(status).toEqual(200)
    expect(data).toEqual({
      id: expect.any(String),
      amount: expect.any(Number),
    })

    await user.delete(data.id)
  })

  describe('Get user', () => {
    let userId

    beforeAll(async () => {
      const createUserResponse = await user.create()
      userId = createUserResponse.data.id
      userIds.push(userId)
    })

    test('Get user by id', async () => {
      const {data, status} = await user.get(userId)

      expect(status).toEqual(200)
      expect(data).toEqual({
        id: userId,
        amount: expect.any(Number),
      })
    })

    test('Get all users', async () => {
      const {data, status} = await user.get()

      expect(status).toEqual(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThanOrEqual(1)

      for await (const user of data) {
        expect(user).toEqual({
          id: expect.any(String),
          amount: expect.any(Number),
        })
      }
    })
  })

  describe('Delete user', () => {
    test('Delete user by id', async () => {
      const createUserResponse = await user.create()

      const deleteUserResponse = await user.delete(createUserResponse.data.id)
      expect(deleteUserResponse.status).toEqual(200)
      expect(deleteUserResponse.data).toEqual({
        message: 'User deleted.',
      })

      const getUserResponse = await user.get(createUserResponse.data.id)
      expect(getUserResponse.status).toEqual(400)
      expect(getUserResponse.data).toEqual({
        message: 'No user found.',
      })
    })

    test('Delete not existing user', async () => {
      const deleteUserResponse = await user.delete('invalid')
      expect(deleteUserResponse.status).toEqual(400)
      expect(deleteUserResponse.data).toEqual({
        message: 'No user found.',
      })
    })
  })
})
