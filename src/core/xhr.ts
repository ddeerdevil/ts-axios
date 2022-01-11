import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

/**
 * 发送请求
 * @param config AxiosRequestConfig
 */
export default function xhr<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method, url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        headers: responseHeaders,
        status: request.status,
        statusText: request.statusText,
        config,
        request
      }

      handleResponse(response)

      function handleResponse(response: AxiosResponse) {
        if (response.status >= 200 && response.status <= 300) {
          resolve(response)
        } else {
          reject(
            createError(
              `Request failed with status code ${response.status}`,
              config,
              null,
              request,
              response
            )
          )
        }
      }
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    // 设置headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }
    request.send(data)
  })
}
