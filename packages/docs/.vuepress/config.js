module.exports = {
  base: '/onyx/',
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: "New content is available.",
          buttonText: "Refresh",
        },
        '/ru/': {
          message: "Доступна новая информация.",
          buttonText: "Обновить",
        },
      },
    },
    '@vuepress/nprogress': {},
    '@vuepress/back-to-top': {},
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        sidebar: [
          '/',
          '/matchers/',
          '/mock/',
        ],
      },
      '/ru/': {
        selectText: 'Языки',
        label: 'Русский',
        editLinkText: 'Редактировать эту страницу на GitHub',
        sidebar: [
          '/ru/',
          '/ru/matchers/',
          '/ru/mock/',
        ],
      },
    },
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Onyx',
      description: 'Onyx is a JavaScript testing framework',
    },
    '/ru/': {
      lang: 'ru-RU',
      title: 'Onyx',
      description: 'Onyx это фреймворк для тестированя JavaScript кода.',
    },
  },
}
