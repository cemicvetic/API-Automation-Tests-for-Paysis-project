import {user, transaction} from 'helpers'

describe('Transaction', () => {
  const amount = 100

  // let cleanUpFunctions = []
  let transactionIds = []
  let userIds = []

  afterEach(async () => {
    // await cleanUpFunctions.reduce(
    //   (promise, callback) => promise.then(() => callback()),
    //   Promise.resolve(),
    // )
    //
    // cleanUpFunctions = []

    for await (const transactionId of transactionIds) {
      await transaction.delete(transactionId)
    }

    for await (const userId of userIds) {
      await user.delete(userId)
    }
  })

  describe('Create transaction', () => {
    test('Send money from one user to another', async () => {
      const userFrom = await user.create()
      userIds.push(userFrom.data.id)

      const userTo = await user.create()
      userIds.push(userTo.data.id)

      const {status, data} = await transaction.create(userFrom.data.id, userTo.data.id, amount)
      transactionIds.push(data.id)

      expect(status).toEqual(200)
      expect(data).toEqual({
        id: expect.any(String),
        from: userFrom.data.id,
        to: userTo.data.id,
        amount,
      })

      const getUserFromResponse = await user.get(userFrom.data.id)
      expect(getUserFromResponse.data.amount).toEqual(+process.env.INITIAL_AMOUNT - amount)

      const getUserToResponse = await user.get(userTo.data.id)
      expect(getUserToResponse.data.amount).toEqual(+process.env.INITIAL_AMOUNT + amount)
    })
  })
})
