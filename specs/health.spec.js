import {healthCheck} from 'helpers'

test.skip('Health check', async () => {
  const {data, status} = await healthCheck()

  expect(status).toEqual(200)
  expect(data).toEqual('OK')
})
