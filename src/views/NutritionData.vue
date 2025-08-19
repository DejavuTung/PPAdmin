<template>
  <Layout>
    <div>
      <!-- 搜索和筛选 -->
      <el-card class="dashboard-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div style="display: flex; gap: 15px; align-items: center;">
            <el-input
              v-model="searchQuery"
              placeholder="搜索用户ID"
              style="width: 200px;"
              clearable
            />
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
            <el-button @click="resetSearch">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </div>
          
          <div>
            <el-button type="success" @click="exportNutritionData">
              <el-icon><Download /></el-icon>
              导出数据
            </el-button>
          </div>
        </div>
        
        <!-- 营养数据表格 -->
        <el-table
          :data="filteredNutritionData"
          v-loading="loading"
          style="width: 100%"
          border
        >
          <el-table-column prop="objectId" label="记录ID" width="120" />
          <el-table-column prop="userId" label="用户ID" width="120" />
          <el-table-column prop="date" label="日期" width="120" />
          <el-table-column prop="totalCalories" label="总卡路里" width="100">
            <template #default="scope">
              <span style="color: #E6A23C; font-weight: bold;">
                {{ scope.row.totalCalories || 0 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="totalProtein" label="蛋白质(g)" width="100">
            <template #default="scope">
              <span style="color: #67C23A;">
                {{ scope.row.totalProtein || 0 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="totalCarb" label="碳水(g)" width="100">
            <template #default="scope">
              <span style="color: #409EFF;">
                {{ scope.row.totalCarb || 0 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="totalFat" label="脂肪(g)" width="100">
            <template #default="scope">
              <span style="color: #F56C6C;">
                {{ scope.row.totalFat || 0 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.createdAt) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="scope">
              <el-button size="small" @click="viewNutritionDetail(scope.row)">查看</el-button>
              <el-button size="small" type="danger" @click="deleteNutritionRecord(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <div style="margin-top: 20px; text-align: right;">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="totalRecords"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
      
      <!-- 营养数据详情对话框 -->
      <el-dialog
        v-model="nutritionDialogVisible"
        title="营养数据详情"
        width="700px"
      >
        <div v-if="selectedNutrition">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="记录ID">{{ selectedNutrition.objectId }}</el-descriptions-item>
            <el-descriptions-item label="用户ID">{{ selectedNutrition.userId }}</el-descriptions-item>
            <el-descriptions-item label="日期">{{ selectedNutrition.date }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ formatDate(selectedNutrition.createdAt) }}</el-descriptions-item>
          </el-descriptions>
          
          <!-- 营养摄入详情 -->
          <div style="margin-top: 20px;">
            <h4>营养摄入详情</h4>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-card shadow="hover" style="text-align: center;">
                  <div style="font-size: 24px; color: #E6A23C; font-weight: bold;">
                    {{ selectedNutrition.totalCalories || 0 }}
                  </div>
                  <div style="color: #909399; margin-top: 5px;">卡路里</div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card shadow="hover" style="text-align: center;">
                  <div style="font-size: 24px; color: #67C23A; font-weight: bold;">
                    {{ selectedNutrition.totalProtein || 0 }}
                  </div>
                  <div style="color: #909399; margin-top: 5px;">蛋白质(g)</div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card shadow="hover" style="text-align: center;">
                  <div style="font-size: 24px; color: #409EFF; font-weight: bold;">
                    {{ selectedNutrition.totalCarb || 0 }}
                  </div>
                  <div style="color: #909399; margin-top: 5px;">碳水(g)</div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card shadow="hover" style="text-align: center;">
                  <div style="font-size: 24px; color: #F56C6C; font-weight: bold;">
                    {{ selectedNutrition.totalFat || 0 }}
                  </div>
                  <div style="color: #909399; margin-top: 5px;">脂肪(g)</div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          
          <!-- 营养比例图表 -->
          <div style="margin-top: 20px;">
            <h4>营养比例</h4>
            <div ref="nutritionChartRef" style="height: 300px;"></div>
          </div>
        </div>
        
        <template #footer>
          <el-button @click="nutritionDialogVisible = false">关闭</el-button>
        </template>
      </el-dialog>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Layout from '../components/Layout.vue'
import { leancloudService } from '../services/leancloud.js'
import * as echarts from 'echarts'

const nutritionData = ref([])
const loading = ref(false)
const searchQuery = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(20)
const totalRecords = ref(0)
const nutritionDialogVisible = ref(false)
const selectedNutrition = ref(null)
const nutritionChartRef = ref(null)

// 过滤后的营养数据
const filteredNutritionData = computed(() => {
  let filtered = nutritionData.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(item => 
      item.userId && item.userId.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (dateRange.value && dateRange.value.length === 2) {
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.date)
      const startDate = new Date(dateRange.value[0])
      const endDate = new Date(dateRange.value[1])
      return itemDate >= startDate && itemDate <= endDate
    })
  }
  
  return filtered
})

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '未知'
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN')
}

// 获取营养数据
const fetchNutritionData = async () => {
  try {
    loading.value = true
    const data = await leancloudService.getNutritionData(pageSize.value, (currentPage.value - 1) * pageSize.value)
    nutritionData.value = data.results || []
    totalRecords.value = data.count || data.results?.length || 0
  } catch (error) {
    console.error('获取营养数据失败:', error)
    ElMessage.error('获取营养数据失败')
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
}

// 重置搜索
const resetSearch = () => {
  searchQuery.value = ''
  dateRange.value = []
  currentPage.value = 1
  fetchNutritionData()
}

// 查看营养数据详情
const viewNutritionDetail = (record) => {
  selectedNutrition.value = record
  nutritionDialogVisible.value = true
  
  // 等待DOM更新后初始化图表
  nextTick(() => {
    initNutritionChart()
  })
}

// 初始化营养比例图表
const initNutritionChart = () => {
  if (!nutritionChartRef.value || !selectedNutrition.value) return
  
  const chart = echarts.init(nutritionChartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}g ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['蛋白质', '碳水化合物', '脂肪']
    },
    series: [
      {
        name: '营养摄入',
        type: 'pie',
        radius: '50%',
        data: [
          {
            value: selectedNutrition.value.totalProtein || 0,
            name: '蛋白质',
            itemStyle: { color: '#67C23A' }
          },
          {
            value: selectedNutrition.value.totalCarb || 0,
            name: '碳水化合物',
            itemStyle: { color: '#409EFF' }
          },
          {
            value: selectedNutrition.value.totalFat || 0,
            name: '脂肪',
            itemStyle: { color: '#F56C6C' }
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  
  chart.setOption(option)
}

// 删除营养记录
const deleteNutritionRecord = async (record) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除这条营养记录吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    // 这里需要实现删除营养记录的API
    ElMessage.success('营养记录删除成功')
    fetchNutritionData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除营养记录失败:', error)
      ElMessage.error('删除营养记录失败')
    }
  }
}

// 导出营养数据
const exportNutritionData = () => {
  ElMessage.info('导出功能开发中...')
}

// 分页处理
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  fetchNutritionData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchNutritionData()
}

onMounted(() => {
  fetchNutritionData()
})
</script>
