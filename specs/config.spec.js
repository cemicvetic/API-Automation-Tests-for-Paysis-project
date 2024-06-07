import {config, user, transaction} from 'helpers'

describe('Config', () => {
  test('Get config', async () => {
    const {data, status} = await config.get()

    expect(status).toEqual(200)
    expect(data).toEqual({
      number_of_entries: 25,
      initial_amount: 1000,
    })
  })

  test('Delete config', async () => {
    await config.patch(20, 500)
    const userFromResponse = await user.create()
    const userToResponse = await user.create()
    await transaction.create(userFromResponse.data.id, userToResponse.data.id, 100)

    const configDeleteResponse = await config.delete()
    expect(configDeleteResponse.status).toEqual(200)
    expect(configDeleteResponse.data).toEqual({
      message: 'Data wiped out.',
    })

    const configGetResponse = await config.get()
    expect(configGetResponse.data).toEqual({
      number_of_entries: 25,
      initial_amount: 1000,
    })

    const getUsersResponse = await user.get()
    expect(getUsersResponse.data).toHaveLength(0)

    const getTransactionsResponse = await transaction.get()
    expect(getTransactionsResponse.data).toHaveLength(0)
  })

  describe.skip('Patch config', () => {
    afterEach(async () => {
      await config.delete()
    })

    test('Update to minimum entries', async () => {
      const patchConfigResponse = await config.patch(5)
      expect(patchConfigResponse.status).toEqual(200)
      expect(patchConfigResponse.data).toEqual({
        number_of_entries: 5,
        initial_amount: 1000,
      })

      // const userFromResponse = await user.create()
      // const userToResponse = await user.create()
      let userIds = []

      for (let i = 0; i < 5; i++) {
        const {data} = await user.create()
        userIds.push(data.id)
      }

      const failedUserResponse = await user.create()
      expect(failedUserResponse.status).toEqual(400)
      expect(failedUserResponse.data).toEqual({
        message: 'Maximum number of users reached.',
      })

      for (let i = 0; i < 5; i++) {
        await transaction.create(userIds[0], userIds[1], 100)
      }

      const failedTransactionResponse = await transaction.create(userIds[0], userIds[1], 100)
      expect(failedTransactionResponse.status).toEqual(400)
      expect(failedTransactionResponse.data).toEqual({
        message: 'Maximum number of transactions reached.',
      })
    })
  })
})
