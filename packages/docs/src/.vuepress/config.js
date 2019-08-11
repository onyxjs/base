module.exports = {
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh",
          },
        },
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
        serviceWorker: {
          updatePopup: {
            message: "Доступна новая информация.",
            buttonText: "Обновить",
          },
        },
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
