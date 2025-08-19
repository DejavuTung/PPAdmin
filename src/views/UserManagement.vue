<template>
  <Layout>
    <div>
      <!-- 搜索和操作栏 -->
      <el-card class="dashboard-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <el-input
            v-model="searchQuery"
            placeholder="搜索用户名或邮箱"
            style="width: 300px;"
            clearable
            @input="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          
          <div>
            <el-button type="primary" @click="refreshUsers">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
            <el-button type="success" @click="exportUsers">
              <el-icon><Download /></el-icon>
              导出
            </el-button>
          </div>
        </div>
        
        <!-- 用户列表 -->
        <el-table
          :data="filteredUsers"
          v-loading="loading"
          style="width: 100%"
          border
        >
          <el-table-column prop="objectId" label="ID" width="120" />
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="email" label="邮箱" width="200" />
          <el-table-column prop="gender" label="性别" width="80">
            <template #default="scope">
              <el-tag v-if="scope.row.gender === 'male'" type="primary">男</el-tag>
              <el-tag v-else-if="scope.row.gender === 'female'" type="danger">女</el-tag>
              <el-tag v-else type="info">其他</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="height" label="身高(cm)" width="100" />
          <el-table-column prop="weight" label="体重(kg)" width="100" />
          <el-table-column prop="goalType" label="目标" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.goalType === 'loseWeight'" type="warning">减脂</el-tag>
              <el-tag v-else-if="scope.row.goalType === 'maintain'" type="success">维持</el-tag>
              <el-tag v-else-if="scope.row.goalType === 'gainWeight'" type="info">增肌</el-tag>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="注册时间" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.createdAt) }}
            </template>
          </el-table-column>
          <el-table-column prop="updatedAt" label="更新时间" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.updatedAt) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="scope">
              <el-button size="small" @click="viewUser(scope.row)">查看</el-button>
              <el-button size="small" type="primary" @click="editUser(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <div style="margin-top: 20px; text-align: right;">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="totalUsers"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
      
      <!-- 用户详情对话框 -->
      <el-dialog
        v-model="userDialogVisible"
        :title="userDialogTitle"
        width="600px"
      >
        <div v-if="selectedUser">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="用户ID">{{ selectedUser.objectId }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ selectedUser.name || '未设置' }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ selectedUser.email || '未设置' }}</el-descriptions-item>
            <el-descriptions-item label="性别">
              <el-tag v-if="selectedUser.gender === 'male'" type="primary">男</el-tag>
              <el-tag v-else-if="selectedUser.gender === 'female'" type="danger">女</el-tag>
              <el-tag v-else type="info">其他</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="身高">{{ selectedUser.height || '未设置' }} cm</el-descriptions-item>
            <el-descriptions-item label="体重">{{ selectedUser.weight || '未设置' }} kg</el-descriptions-item>
            <el-descriptions-item label="目标">
              <el-tag v-if="selectedUser.goalType === 'loseWeight'" type="warning">减脂</el-tag>
              <el-tag v-else-if="selectedUser.goalType === 'maintain'" type="success">维持</el-tag>
              <el-tag v-else-if="selectedUser.goalType === 'gainWeight'" type="info">增肌</el-tag>
              <span v-else>未设置</span>
            </el-descriptions-item>
            <el-descriptions-item label="活动水平">{{ selectedUser.activityLevel || '未设置' }}</el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ formatDate(selectedUser.createdAt) }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ formatDate(selectedUser.updatedAt) }}</el-descriptions-item>
          </el-descriptions>
          
          <!-- 宏量营养素目标 -->
          <div style="margin-top: 20px;">
            <h4>宏量营养素目标</h4>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="卡路里">{{ selectedUser.macroTarget?.calories || '未设置' }}</el-descriptions-item>
              <el-descriptions-item label="蛋白质">{{ selectedUser.macroTarget?.protein || '未设置' }}g</el-descriptions-item>
              <el-descriptions-item label="碳水化合物">{{ selectedUser.macroTarget?.carb || '未设置' }}g</el-descriptions-item>
              <el-descriptions-item label="脂肪">{{ selectedUser.macroTarget?.fat || '未设置' }}g</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        
        <template #footer>
          <el-button @click="userDialogVisible = false">关闭</el-button>
        </template>
      </el-dialog>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Layout from '../components/Layout.vue'
import { leancloudService } from '../services/leancloud.js'

const users = ref([])
const loading = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(20)
const totalUsers = ref(0)
const userDialogVisible = ref(false)
const userDialogTitle = ref('')
const selectedUser = ref(null)

// 过滤后的用户列表
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  return users.value.filter(user => 
    (user.name && user.name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '未知'
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN')
}

// 获取用户列表
const fetchUsers = async () => {
  try {
    loading.value = true
    const data = await leancloudService.getUsers(pageSize.value, (currentPage.value - 1) * pageSize.value)
    users.value = data.results || []
    totalUsers.value = data.count || data.results?.length || 0
  } catch (error) {
    console.error('获取用户列表失败:', error)
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
}

// 刷新用户列表
const refreshUsers = () => {
  fetchUsers()
  ElMessage.success('用户列表已刷新')
}

// 查看用户详情
const viewUser = (user) => {
  selectedUser.value = user
  userDialogTitle.value = '用户详情'
  userDialogVisible.value = true
}

// 编辑用户
const editUser = (user) => {
  ElMessage.info('编辑功能开发中...')
}

// 删除用户
const deleteUser = async (user) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户 "${user.name || user.objectId}" 吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await leancloudService.deleteUser(user.objectId)
    ElMessage.success('用户删除成功')
    fetchUsers()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除用户失败:', error)
      ElMessage.error('删除用户失败')
    }
  }
}

// 导出用户数据
const exportUsers = () => {
  ElMessage.info('导出功能开发中...')
}

// 分页处理
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  fetchUsers()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchUsers()
}

onMounted(() => {
  fetchUsers()
})
</script>
