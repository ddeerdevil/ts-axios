/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2022-01-06 01:04:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-01-06 01:08:14
 */
export type Method =
  | 'get'
  | 'Get'
  | 'delete'
  | 'Delete'
  | 'post'
  | 'Post'
  | 'head'
  | 'Head'
  | 'options'
  | 'Options'
  | 'put'
  | 'Put'
  | 'patch'
  | 'Patch'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
