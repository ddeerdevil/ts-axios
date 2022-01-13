import cookie from '../../src/helpers/cookies'

describe('helpers:cookie', () => {
  beforeEach(() => {
    document.cookie = 'foo=baz'
  })

  afterEach(() => {
    document.cookie = 'foo=baz;expires=' + new Date(Date.now() - 85400000).toUTCString() + ';'
  })

  test('should read cookies', () => {
    expect(cookie.read('foo')).toBe('baz')
  })

  test('should return null if cookie name is not undefined', () => {
    expect(cookie.read('bar')).toBeNull()
  })
})
