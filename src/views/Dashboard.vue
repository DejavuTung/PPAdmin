<template>
  <Layout>
    <div>
      <!-- 统计卡片 -->
      <el-row :gutter="20" class="statistics-row">
        <el-col :span="6">
          <el-card class="dashboard-card">
            <div style="display: flex; align-items: center;">
              <el-icon style="font-size: 48px; color: #409EFF; margin-right: 20px;">
                <User />
              </el-icon>
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #303133;">
                  {{ statistics.totalUsers }}
                </div>
                <div style="color: #909399; margin-top: 5px;">总用户数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="6">
          <el-card class="dashboard-card">
            <div style="display: flex; align-items: center;">
              <el-icon style="font-size: 48px; color: #67C23A; margin-right: 20px;">
                <Food />
              </el-icon>
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #303133;">
                  {{ statistics.totalNutritionRecords }}
                </div>
                <div style="color: #909399; margin-top: 5px;">营养记录</div>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="6">
          <el-card class="dashboard-card">
            <div style="display: flex; align-items: center;">
              <el-icon style="font-size: 48px; color: #E6A23C; margin-right: 20px;">
                <Bicycle />
              </el-icon>
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #303133;">
                  {{ statistics.totalFoodEntries }}
                </div>
                <div style="color: #909399; margin-top: 5px;">食物记录</div>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="6">
          <el-card class="dashboard-card">
            <div style="display: flex; align-items: center;">
              <el-icon style="font-size: 48px; color: #F56C6C; margin-right: 20px;">
                <TrendCharts />
              </el-icon>
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #303133;">
                  {{ statistics.totalFoodEntries }}
                </div>
                <div style="color: #909399; margin-top: 5px;">运动记录</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 最近用户 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="dashboard-card">
            <template #header>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>最近注册用户</span>
                <el-button type="text" @click="$router.push('/users')">查看更多</el-button>
              </div>
            </template>
            
            <div v-if="statistics.recentUsers.length > 0">
              <div v-for="user in statistics.recentUsers" :key="user.objectId" style="padding: 10px 0; border-bottom: 1px solid #EBEEF5;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-weight: bold;">{{ user.name || '未设置姓名' }}</div>
                    <div style="color: #909399; font-size: 12px;">
                      注册时间: {{ formatDate(user.createdAt) }}
                    </div>
                  </div>
                  <el-tag size="small" type="success">活跃</el-tag>
                </div>
              </div>
            </div>
            <div v-else style="text-align: center; color: #909399; padding: 20px;">
              暂无用户数据
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card class="dashboard-card">
            <template #header>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>最近营养记录</span>
                <el-button type="text" @click="$router.push('/nutrition')">查看更多</el-button>
              </div>
            </template>
            
            <div v-if="statistics.recentNutrition.length > 0">
              <div v-for="record in statistics.recentNutrition" :key="record.objectId" style="padding: 10px 0; border-bottom: 1px solid #EBEEF5;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-weight: bold;">{{ record.totalCalories || 0 }} 卡路里</div>
                    <div style="color: #909399; font-size: 12px;">
                      日期: {{ formatDate(record.date) }}
                    </div>
                  </div>
                  <el-tag size="small" type="warning">营养</el-tag>
                </div>
              </div>
            </div>
            <div v-else style="text-align: center; color: #909399; padding: 20px;">
              暂无营养数据
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 快速操作 -->
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="24">
          <el-card class="dashboard-card">
            <template #header>
              <span>快速操作</span>
            </template>
            
            <el-row :gutter="20">
              <el-col :span="6">
                <el-button type="primary" @click="$router.push('/users')" style="width: 100%; height: 80px;">
                  <div>
                    <el-icon style="font-size: 24px; margin-bottom: 10px;"><User /></el-icon>
                    <div>用户管理</div>
                  </div>
                </el-button>
              </el-col>
              
              <el-col :span="6">
                <el-button type="success" @click="$router.push('/nutrition')" style="width: 100%; height: 80px;">
                  <div>
                    <el-icon style="font-size: 24px; margin-bottom: 10px;"><Food /></el-icon>
                    <div>营养数据</div>
                  </div>
                </el-button>
              </el-col>
              
              <el-col :span="6">
                <el-button type="warning" @click="$router.push('/exercise')" style="width: 100%; height: 80px;">
                  <div>
                    <el-icon style="font-size: 24px; margin-bottom: 10px;"><Bicycle /></el-icon>
                    <div>运动数据</div>
                  </div>
                </el-button>
              </el-col>
              
              <el-col :span="6">
                <el-button type="info" @click="refreshData" style="width: 100%; height: 80px;">
                  <div>
                    <el-icon style="font-size: 24px; margin-bottom: 10px;"><Refresh /></el-icon>
                    <div>刷新数据</div>
                  </div>
                </el-button>
              </el-col>
              
              <el-col :span="6">
                <el-button type="warning" @click="testConnection" style="width: 100%; height: 80px;">
                  <div>
                    <el-icon style="font-size: 24px; margin-bottom: 10px;"><Connection /></el-icon>
                    <div>测试连接</div>
                  </div>
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Layout from '../components/Layout.vue'
import { leancloudService } from '../services/leancloud.js'
import { 
  User, 
  Food, 
  Bicycle, 
  TrendCharts, 
  Refresh, 
  Connection 
} from '@element-plus/icons-vue'

const statistics = ref({
  totalUsers: 0,
  totalNutritionRecords: 0,
  totalFoodEntries: 0,
  recentUsers: [],
  recentNutrition: []
})

const loading = ref(false)

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '未知'
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN')
}

// 获取统计数据
const fetchStatistics = async () => {
  try {
    loading.value = true
    const data = await leancloudService.getStatistics()
    statistics.value = data
  } catch (error) {
    console.error('获取统计数据失败:', error)
    ElMessage.error('获取统计数据失败')
  } finally {
    loading.value = false
  }
}

// 刷新数据
const refreshData = () => {
  fetchStatistics()
  ElMessage.success('数据已刷新')
}

// 测试连接
const testConnection = async () => {
  try {
    const result = await leancloudService.testConnection()
    if (result.success) {
      ElMessage.success('连接测试成功！')
      console.log('连接测试结果:', result)
    } else {
      ElMessage.error(`连接测试失败: ${result.error}`)
    }
  } catch (error) {
    ElMessage.error(`连接测试异常: ${error.message}`)
    console.error('连接测试异常:', error)
  }
}

onMounted(() => {
  fetchStatistics()
})
</script>
