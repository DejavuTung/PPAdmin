// 环境变量配置
export const ENV_CONFIG = {
  // LeanCloud 配置
  LEANCLOUD_APP_ID: 'jwinPOjALtB0eEKnNc7d93kQ-gzGzoHsz',
  LEANCLOUD_APP_KEY: 'TrGuHJejbpcjo4EnmNUaeGHD',
  LEANCLOUD_MASTER_KEY: 'TrGuHJejbpcjo4EnmNUaeGHD', // 修复：使用正确的Master Key
  LEANCLOUD_APP_URL: 'https://jwinpoja.lc-cn-n1-shared.com',
  
  // 应用配置
  APP_NAME: 'PulseProgress Admin',
  APP_VERSION: '1.0.0',
  
  // API 配置
  API_TIMEOUT: 15000,
  API_RETRY_COUNT: 3,
}

// 开发环境配置
export const DEV_CONFIG = {
  ...ENV_CONFIG,
  DEBUG: true,
  LOG_LEVEL: 'debug',
}

// 生产环境配置
export const PROD_CONFIG = {
  ...ENV_CONFIG,
  DEBUG: false,
  LOG_LEVEL: 'error',
}

// 根据环境返回配置
export const getConfig = () => {
  if (import.meta.env.DEV) {
    return DEV_CONFIG
  }
  return PROD_CONFIG
}

// 导出默认配置
export default getConfig()
