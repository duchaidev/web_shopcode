import dayjs from 'dayjs'

export const setCookie = (cname: string, cvalue: string, expiresAt: dayjs.Dayjs) => {
  const expires = 'expires=' + expiresAt.toDate().toUTCString()
  if (document)
    document.cookie = cname + '=' + cvalue + ';' + expires + `;path=/;domain=${import.meta.env.VITE_PUBLIC_PATH}`
}

export const getCookie = (cname: string) => {
  const name = cname + '='
  if (document) {
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
  }
  return ''
}

export const deleteCookie = (cname: string) => {
  if (document) {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=${
      import.meta.env.VITE_PUBLIC_PATH
    }`
  }
}
