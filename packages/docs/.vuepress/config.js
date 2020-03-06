module.exports = {
  base: "/onyx/",
  plugins: {
    "@vuepress/pwa": {
      serviceWorker: true,
      updatePopup: {
        "/": {
          message: "New content is available.",
          buttonText: "Refresh"
        },
        "/ru/": {
          message: "Доступна новая информация.",
          buttonText: "Обновить"
        },
        "/zh-Hant/": {
          message: "新內容可用。",
          buttonText: "刷新"
        }, 
        "/yor/": {
          message: "",
          buttonText: ""
        }
      }
    },
    "@vuepress/nprogress": {},
    "@vuepress/back-to-top": {}
  },
  themeConfig: {
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        editLinkText: "Edit this page on GitHub",
        sidebar: [
          "/",
          {
            title: "@onyx/matchers",
            path: "/matchers/",
            children: [
              "/matchers/matchers/to-be",
              "/matchers/matchers/to-be-defined",
              "/matchers/matchers/to-be-false",
              "/matchers/matchers/to-be-instance-of",
              "/matchers/matchers/to-be-nan",
              "/matchers/matchers/to-be-null",
              "/matchers/matchers/to-be-true",
              "/matchers/matchers/to-be-type-of",
              "/matchers/matchers/to-be-undefined",
              "/matchers/matchers/to-contain",
              "/matchers/matchers/to-equal",
              "/matchers/matchers/to-have-length",
              "/matchers/matchers/to-strictly-equal",
              "/matchers/matchers/to-throw"
            ]
          },
          "/mock/"
        ]
      },
      "/ru/": {
        selectText: "Языки",
        label: "Русский",
        editLinkText: "Редактировать эту страницу на GitHub",
        sidebar: ["/ru/", "/ru/matchers/", "/ru/mock/"]
      },
      "/zh/": {
        selectText: "語言",
        label: "中文",
        editLinkText: "在Github中編輯此頁面",
        sidebar: [
          "/zh/",
          {
            title: "@onyx/matchers",
            path: "/zh/matchers/",
            children: [
              "/zh/matchers/matchers/to-be",
              "/zh/matchers/matchers/to-be-defined",
              "/zh/matchers/matchers/to-be-false",
              "/zh/matchers/matchers/to-be-instance-of",
              "/zh/matchers/matchers/to-be-nan",
              "/zh/matchers/matchers/to-be-null",
              "/zh/matchers/matchers/to-be-true",
              "/zh/matchers/matchers/to-be-type-of",
              "/zh/matchers/matchers/to-be-undefined",
              "/zh/matchers/matchers/to-contain",
              "/zh/matchers/matchers/to-equal",
              "/zh/matchers/matchers/to-have-length",
              "/zh/matchers/matchers/to-strictly-equal",
              "/zh/matchers/matchers/to-throw"
            ]
          },
          {
            title: "@onyx/mock",
            path: "/zh/mock/",
            children: []
          }
        ]
      },
      "/yor/": {
        selectText: "",
        label: "",
        editLinkText: "",
        sidebar: [
          "/yor/",
          {
            title: "@onyx/matchers",
            path: "/yor/matchers/",
            children: [
              "/yor/matchers/matchers/to-be",
              "/yor/matchers/matchers/to-be-defined",
              "/yor/matchers/matchers/to-be-false",
              "/yor/matchers/matchers/to-be-instance-of",
              "/yor/matchers/matchers/to-be-nan",
              "/yor/matchers/matchers/to-be-null",
              "/yor/matchers/matchers/to-be-true",
              "/yor/matchers/matchers/to-be-type-of",
              "/yor/matchers/matchers/to-be-undefined",
              "/yor/matchers/matchers/to-contain",
              "/yor/matchers/matchers/to-equal",
              "/yor/matchers/matchers/to-have-length",
              "/yor/matchers/matchers/to-strictly-equal",
              "/yor/matchers/matchers/to-throw"
            ]
          },
          {
            title: "@onyx/mock",
            path: "/yor/mock/",
            children: []
          }
        ]
      }
    }
  },
  locales: {
    "/": {
      lang: "en-US",
      title: "Onyx",
      description: "Onyx is a JavaScript testing framework"
    },
    "/ru/": {
      lang: "ru-RU",
      title: "Onyx",
      description: "Onyx это фреймворк для тестирования JavaScript кода."
    },
    "/zh/": {
      lang: "zh-TW",
      title: "Onyx",
      description: "Onyx是一個JavaScript測試框架。"
    },
    "/yor/": {
      lang: "yor-NIG",
      title: "Onyx",
      description: ""
    }
  }
};
