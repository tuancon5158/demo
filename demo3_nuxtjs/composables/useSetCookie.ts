const useSetCookie = () => {
  // set token to cookie
  const tokeyKey = encodeURIComponent('auth._token.local')

  const setCookieToken = (
    idToken: string,
    domain: string,
    path: string,
    expiresIn: number
  ): void => {
    const value = encodeURI(`Bearer ${idToken}`)
    const tokenExpire = expiresIn || 86400

    if (process.client) {
      if (domain && path) {
        document.cookie = `${tokeyKey}=${value}; domain=${domain}; path=${path}; max-age=${tokenExpire}; Secure`
      } else {
        document.cookie = `${tokeyKey}=${value}; max-age=${tokenExpire}; Secure`
      }
    }
  }

  // remove cookie
  const removeCookieToken = (domain: string, path: string): void => {
    if (process.client) {
      document.cookie = `${tokeyKey}=; domain=${domain}; path=${path}; max-age=0`
    }
  }

  return {
    setCookieToken,
    removeCookieToken
  }
}

export default useSetCookie
