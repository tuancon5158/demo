module.exports = {
  isDev: process.env.NODE_ENV === 'development',

  nuxt: {
    routerBase: '/',
    globalName: 'nuxt',
    publicPath: '/_nuxt/',

    filename: {
      app: 'scripts',
      chunk: 'scripts',
      css: 'styles',
      img: 'images',
      font: 'fonts',
      video: 'videos',
      icon: 'icons',
    },
  },

  app: {
    name: 'HRM ThinkGroup',
    shortName: 'HRM ThinkGroup',
    description: 'HRM ThinkGroup - Hệ thống quản trị nhân sự ThinkGroup',
    author: 'Thinkgroup',

    title: 'HRM ThinkGroup',
    titleSeparator: ' — ',
    titleTemplate: 'Hệ thống quản trị nhân sự ThinkGroup',

    charset: 'utf-8',
    lang: 'en-US',
    locale: 'en_US',
    type: 'website',
    themeColor: '#00c58e',
    backgroundColor: '#f5f8f9',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  monthFormat: 'MM/YYYY',
  timeFormat: 'HH:mm:ss',
  shortTimeFormat: 'HH:mm',
}
