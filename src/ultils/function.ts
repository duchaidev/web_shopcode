import _ from 'lodash'

export const areObjectsEqual = (obj1: any, obj2: any) => {
  return _.isEqual(obj1, obj2)
}

export const moneyFormat = (money: number) => {
  return money.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
}

export const debounce = (func: any, delay: any) => {
  let timer: any
  return (...args: any) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
