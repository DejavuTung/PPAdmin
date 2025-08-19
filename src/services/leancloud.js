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
    
    // 调试：打印请求体数据
    if (config.data) {
      console.log('请求体数据:', config.data)
      try {
        const parsedData = JSON.parse(config.data)
        console.log('解析后的请求体:', parsedData)
        if (parsedData.createdAt) {
          console.log('createdAt字段类型:', typeof parsedData.createdAt)
          console.log('createdAt字段值:', parsedData.createdAt)
        }
      } catch (e) {
        console.log('请求体不是JSON格式')
      }
    }
    
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

// 为masterApi添加请求拦截器
masterApi.interceptors.request.use(
  (config) => {
    // 调试：打印masterApi请求信息
    console.log('MasterApi 请求详情:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      headers: {
        'X-LC-Id': config.headers['X-LC-Id'],
        'X-LC-Key': config.headers['X-LC-Key'] ? `${config.headers['X-LC-Key'].substring(0, 8)}...` : '未设置',
        'Content-Type': config.headers['Content-Type']
      }
    })
    
    // 调试：打印请求体数据
    if (config.data) {
      console.log('MasterApi 请求体数据:', config.data)
      try {
        const parsedData = JSON.parse(config.data)
        console.log('MasterApi 解析后的请求体:', parsedData)
        if (parsedData.createdAt) {
          console.log('MasterApi createdAt字段类型:', typeof parsedData.createdAt)
          console.log('MasterApi createdAt字段值:', parsedData.createdAt)
        }
      } catch (e) {
        console.log('MasterApi 请求体不是JSON格式')
      }
    }
    
    return config
  },
  (error) => {
    console.error('MasterApi 请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

// LeanCloud API服务
export const leancloudService = {
  // 测试连接
  async testConnection() {
    try {
      console.log('开始测试LeanCloud连接...')
      
      // 测试1: 尝试最简单的连接测试
      console.log('测试1: 最简单的连接测试...')
      try {
        const simpleResponse = await masterApi.post('/classes/TestConnection', {
          message: 'Hello LeanCloud from Admin Dashboard!'
        })
        
        if (simpleResponse.objectId) {
          console.log('最简单连接测试成功，ObjectId:', simpleResponse.objectId)
          await masterApi.delete(`/classes/TestConnection/${simpleResponse.objectId}`)
          return { success: true, message: '连接测试成功' }
        }
      } catch (simpleError) {
        console.log('最简单测试失败:', simpleError.response?.data)
      }
      
      // 测试2: 尝试使用不同的表名
      console.log('测试2: 尝试使用不同的表名...')
      try {
        const tableTestResponse = await masterApi.post('/classes/ConnectionTest', {
          message: 'Hello LeanCloud from Admin Dashboard!',
          timestamp: Date.now()
        })
        
        if (tableTestResponse.objectId) {
          console.log('表名测试成功，ObjectId:', tableTestResponse.objectId)
          await masterApi.delete(`/classes/ConnectionTest/${tableTestResponse.objectId}`)
          return { success: true, message: '连接测试成功（使用ConnectionTest表）' }
        }
      } catch (tableError) {
        console.log('表名测试失败:', tableError.response?.data)
      }
      
      // 测试3: 尝试读取现有数据
      console.log('测试3: 尝试读取现有数据...')
      try {
        const readResponse = await masterApi.get('/classes/UserProfile?limit=1')
        console.log('读取测试成功:', readResponse)
        return { success: true, message: '连接测试成功（可读取数据）' }
      } catch (readError) {
        console.log('读取测试失败:', readError.response?.data)
      }
      
      return { success: false, error: '所有连接测试都失败' }
    } catch (error) {
      console.error('连接测试失败:', error)
      
      // 显示详细的错误信息
      if (error.response) {
        console.error('错误响应状态:', error.response.status)
        console.error('错误响应数据:', error.response.data)
        console.error('错误响应头:', error.response.headers)
      }
      
      // 返回详细的错误信息
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          '连接测试失败'
      
      return { 
        success: false, 
        error: `HTTP ${error.response?.status || '未知'}: ${errorMessage}`,
        details: error.response?.data
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
