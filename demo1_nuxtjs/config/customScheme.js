import { LocalScheme } from '~auth/runtime'

function getProp(holder, propName) {
  if (!propName || !holder || typeof holder !== 'object') {
    return holder
  }

  if (propName in holder) {
    return holder[propName]
  }

  const propParts = Array.isArray(propName)
    ? propName
    : `${propName}`.split('.')
  let result = holder

  while (propParts.length && result) {
    result = result[propParts.shift()]
  }

  return result
}

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser(endpoint) {
    // Token is required but not available

    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})

      return
    }

    try {
      // Try to fetch user and then set
      const response = await this.$auth.requestWith(
        this.name,
        endpoint,
        this.options.endpoints.user
      )

      const user = getProp(response.data, this.options.user.property)

      const { data } = await this.$auth.requestWith(
        this.name,
        { url: `/hrm/profiles/staffs/${user.id}`, method: 'get' },
        {}
      )

      const profile = getProp(data, 'data')

      // Set the custom user
      // The `customUser` object will be accessible through `this.$auth.user`
      // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
      this.$auth.setUser({ ...profile, ...user })

      return response
    } catch (error) {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    }
  }
}
