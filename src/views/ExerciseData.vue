<template>
  <Layout>
    <div>
      <el-card class="dashboard-card">
        <template #header>
          <span>运动数据管理</span>
        </template>
        
        <div style="text-align: center; padding: 40px; color: #909399;">
          <el-icon style="font-size: 48px; margin-bottom: 20px;"><Bicycle /></el-icon>
          <div>运动数据管理功能开发中...</div>
          <div style="margin-top: 10px; font-size: 14px;">
            该页面将包含运动记录查看、统计分析等功能
          </div>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue'
</script>
