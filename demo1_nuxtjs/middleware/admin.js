export default function (context) {
  const route = context.route
  const REGEX_PAGE_ADMIN = /^\/auth/gi

  const isAuthPage = REGEX_PAGE_ADMIN.test(route.fullPath)

  if (isAuthPage) return true

  if (context.$isMember()) {
    return context.error({
      message: 'Bạn không có quyền hạn.',
      statusCode: '',
    })
  }
}
