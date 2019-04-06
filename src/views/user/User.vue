<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input
          v-model="queryParam"
          placeholder="请输入内容"
          class="search-input"
        >
          <el-button
            slot="append"
            @click="initList"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button size="medium">添加用户</el-button>
      </el-col>
    </el-row>
    <el-row class="table">
      <el-table
        :data="userList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="id"
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="用户名"
          width="180"
        >
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeUserState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              icon="el-icon-delete"
            ></el-button>
            <el-button
              size="mini"
              type="warning"
              plain
              icon="el-icon-check"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
import { getUserList, changeUserState } from '@/api'
export default {
  data () {
    return {
      userList: [],
      total: 0,
      pagesize: 1,
      pagenum: 1,
      queryParam: ''
    }
  },
  created () {
    this.initList()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initList()
    },
    initList () {
      getUserList({ params: { query: this.queryParam, pagenum: this.pagenum, pagesize: this.pagesize } }).then(res => {
        console.log(res)
        this.userList = res.data.users
        this.total = res.data.total
      })
    },
    // 改变用户状态
    changeUserState (row) {
      console.log(row)
      changeUserState({ uid: row.id, type: row.mg_state }).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            message: '状态更改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '状态更改失败',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
  }
  .table {
    margin-top: 10px;
  }
}
</style>
