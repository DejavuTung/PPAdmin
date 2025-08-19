import axios from 'axios'
import { getConfig } from '../config/env.js'

// LeanCloud配置
const LEANCLOUD_CONFIG = {
  appId: getConfig().LEANCLOUD_APP_ID,
  appKey: getConfig().LEANCLOUD_APP_KEY,
  masterKey: getConfig().LEANCLOUD_MASTER_KEY,
  appUrl: getConfig().LEANCLOUD_APP_URL
}

// LeanCloud日期格式化辅助函数
const formatDateForLeanCloud = (date) => {
  return {
    '__type': 'Date',
    'iso': date.toISOString()
  }
}

// 创建axios实例
const api = axios.create({
  baseURL: `${LEANCLOUD_CONFIG.appUrl}/1.1`,
  headers: {
    'X-LC-Id': LEANCLOUD_CONFIG.appId,
    'X-LC-Key': LEANCLOUD_CONFIG.appKey, // 先尝试 App Key
    'Content-Type': 'application/json'
  }
})

// 创建使用 Master Key 的实例
const masterApi = axios.create({
  baseURL: `${LEANCLOUD_CONFIG.appUrl}/1.1`,
  headers: {
    'X-LC-Id': LEANCLOUD_CONFIG.appId,
    'X-LC-Key': `${LEANCLOUD_CONFIG.masterKey},master`, // 修复：添加,master后缀
    'Content-Type': 'application/json'
  }
})

// 调试：打印配置信息
console.log('LeanCloud 配置信息:', {
  appId: LEANCLOUD_CONFIG.appId,
  appKey: LEANCLOUD_CONFIG.appKey ? `${LEANCLOUD_CONFIG.appKey.substring(0, 8)}...` : '未设置',
  masterKey: LEANCLOUD_CONFIG.masterKey ? `${LEANCLOUD_CONFIG.masterKey.substring(0, 8)}...` : '未设置',
  appUrl: LEANCLOUD_CONFIG.appUrl,
  baseURL: `${LEANCLOUD_CONFIG.appUrl}/1.1`
})

// 调试：打印配置信息
console.log('LeanCloud 配置信息:', {
  appId: LEANCLOUD_CONFIG.appId,
  masterKey: LEANCLOUD_CONFIG.masterKey ? `${LEANCLOUD_CONFIG.masterKey.substring(0, 8)}...` : '未设置',
  appUrl: LEANCLOUD_CONFIG.appUrl,
  baseURL: `${LEANCLOUD_CONFIG.appUrl}/1.1`
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 调试：打印请求信息
    console.log('API 请求详情:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      headers: {
        'X-LC-Id': config.headers['X-LC-Id'],
        'X-LC-Key': config.headers['X-LC-Key'] ? `${config.headers['X-LC-Key'].substring(0, 8)}...` : '未设置',
        'Content-Type': config.headers['Content-Type']
      }
    })
    return config
  },
  (error) => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const errorDetails = {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      headers: error.config?.headers,
      message: error.message,
      code: error.code
    }
    
    console.error('API请求错误详情:', errorDetails)
    
    // 如果是 403 错误，提供更详细的诊断信息
    if (error.response?.status === 403) {
      console.error('403 权限错误诊断:')
      console.error('- 检查 Master Key 是否正确')
      console.error('- 检查 LeanCloud 应用状态')
      console.error('- 检查数据表权限设置')
      console.error('- 检查网络连接')
    }
    
    return Promise.reject(error)
  }
)

// LeanCloud API服务
export const leancloudService = {
  // 测试连接
  async testConnection() {
    try {
      console.log('开始测试LeanCloud连接...')
      const response = await masterApi.post('/classes/TestConnection', {
        message: 'Hello LeanCloud from Admin Dashboard!',
        timestamp: Date.now(),
        createdAt: formatDateForLeanCloud(new Date())
      })
      
      if (response.objectId) {
        // 清理测试数据
        await masterApi.delete(`/classes/TestConnection/${response.objectId}`)
        return { success: true, message: '连接测试成功' }
      }
      return { success: false, error: '连接测试失败' }
    } catch (error) {
      console.error('连接测试失败:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || error.message || '连接测试失败'
      }
    }
  },

  // 用户管理
  async getUsers(limit = 100, skip = 0) {
    return masterApi.get(`/classes/UserProfile?limit=${limit}&skip=${skip}&order=-createdAt`)
  },

  async getUserById(userId) {
    return masterApi.get(`/classes/UserProfile/${userId}`)
  },

  async updateUser(userId, data) {
    return masterApi.put(`/classes/UserProfile/${userId}`, data)
  },

  async deleteUser(userId) {
    return masterApi.delete(`/classes/UserProfile/${userId}`)
  },

  // 营养数据
  async getNutritionData(limit = 100, skip = 0) {
    return masterApi.get(`/classes/NutritionSummary?limit=${limit}&skip=${skip}&order=-date`)
  },

  async getNutritionByUser(userId, limit = 100) {
    return masterApi.get(`/classes/NutritionSummary?where={"userId":"${userId}"}&limit=${limit}&order=-date`)
  },

  // 食物记录
  async getFoodEntries(limit = 100, skip = 0) {
    return masterApi.get(`/classes/FoodEntry?limit=${limit}&skip=${skip}&order=-timestamp`)
  },

  async getFoodEntriesByUser(userId, limit = 0) {
    return masterApi.get(`/classes/FoodEntry?where={"userId":"${userId}"}&limit=${limit}&order=-timestamp`)
  },

  // 运动数据
  async getExerciseData(limit = 100, skip = 0) {
    return masterApi.get(`/classes/ExerciseEntry?limit=${limit}&skip=${skip}&order=-timestamp`)
  },

  // 统计数据
  async getStatistics() {
    try {
      console.log('开始获取统计数据...')
      
      // 使用 Master Key 来获取数据
      const [users, nutrition, food, exercise] = await Promise.all([
        masterApi.get('/classes/UserProfile?limit=1000&skip=0&order=-createdAt'),
        masterApi.get('/classes/NutritionSummary?limit=1000&skip=0&order=-date'),
        masterApi.get('/classes/FoodEntry?limit=1000&skip=0&order=-timestamp'),
        masterApi.get('/classes/ExerciseEntry?limit=1000&skip=0&order=-timestamp')
      ])

      console.log('API 响应数据:', { users, nutrition, food, exercise })

      return {
        totalUsers: users.results?.length || 0,
        totalNutritionRecords: nutrition.results?.length || 0,
        totalFoodEntries: food.results?.length || 0,
        totalExerciseRecords: exercise.results?.length || 0,
        recentUsers: users.results?.slice(0, 5) || [],
        recentNutrition: nutrition.results?.slice(0, 5) || []
      }
    } catch (error) {
      console.error('获取统计数据时发生错误:', error)
      // 返回默认数据而不是抛出错误
      return {
        totalUsers: 0,
        totalNutritionRecords: 0,
        totalFoodEntries: 0,
        totalExerciseRecords: 0,
        recentUsers: [],
        recentNutrition: []
      }
    }
  },


}

export default leancloudService
