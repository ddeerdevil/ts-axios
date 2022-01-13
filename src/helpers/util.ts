const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 * v2: 解决es6无法获取class上的原型属性
 * @param to
 * @param from
 * @returns
 */
// export function extendV2<T, U>(to: T, from: U): T & U {
//   function deepCopy(instance: Record<string, any>) {
//     Object.getOwnPropertyNames(instance).forEach(key => {
//       ;(to as Record<string, any>)[key] = instance[key]
//     })

//     const proto = Reflect.getPrototypeOf(instance)
//     if (proto !== null) {
//       deepCopy(proto)
//     }
//   }

//   deepCopy(from)

//   return to as T & U
// }

/**
 * 深拷贝多个对象为一个对象
 * @param objs
 * @returns
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
