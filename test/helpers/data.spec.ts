import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers:data', () => {
  describe('transformRequest', () => {
    test('should transform request data to string if data is a PlainObject', () => {
      const data = { a: 1 }
      expect(transformRequest(data)).toBe('{"a":1}')
    })

    test('should do nothing if data is not a PlainObject', () => {
      const data = new URLSearchParams('a=b')
      expect(transformRequest(data)).toBe(data)
    })
  })

  describe('transformResponse', () => {
    test('should transform response data to Object if data is a JSON string', () => {
      const a = '{"a":1}'
      expect(transformResponse(a)).toEqual({
        a: 1
      })
    })

    test('should do nothing if data is not a string', () => {
      const a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
