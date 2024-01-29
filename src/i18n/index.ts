import {createI18n} from 'vue-i18n';
import upload_en from "./upload/en"
import upload_zh from "./upload/zh-cn"

const messages = {
  en: {
    excel:upload_en.excel
  },
  zh: {
    excel:upload_zh.excel
  }
};

export const i18n = createI18n({
  legacy: false,// 在 Vue3 中应设置为 false
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true,
  fallbackWarn: false,
  globalInjection: true, // 允许全局注入 $t、$tc 等方法
  fallbackLocale: 'zh',// 备选语言
  locale: 'zh',// 默认语言
  messages,// 国际化消息
});

