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
          {
            title: '@onyx/matchers',
            path: '/matchers/',
            children: [
              '/matchers/matchers/to-be',
              '/matchers/matchers/to-be-defined',
              '/matchers/matchers/to-be-false',
              '/matchers/matchers/to-be-instance-of',
              '/matchers/matchers/to-be-nan',
              '/matchers/matchers/to-be-null',
              '/matchers/matchers/to-be-true',
            ]
          },
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
      description: 'Onyx это фреймворк для тестирования JavaScript кода.',
    },
  },
}
