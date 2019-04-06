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
        <el-button
          size="medium"
          @click="addDialog=true"
        >添加用户</el-button>
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
    <div class="Dialog">
      <el-dialog
        title="添加用户"
        :visible.sync="addDialog"
      >
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addUserSubmit"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="addForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="addForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="addForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电话"
            prop="mobile"
          >
            <el-input
              v-model="addForm.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addUserSubmit('addUserSubmit')"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>

</template>
<script>
import { getUserList, changeUserState, addUser } from '@/api'
export default {
  data () {
    return {
      userList: [],
      total: 0,
      pagesize: 1,
      pagenum: 1,
      queryParam: '',
      addDialog: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          }
        ],
        mobile: [{ required: true, message: '电话不能为空' }]
      }
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
    },
    addUserSubmit (formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          // 添加用户
          addUser(this.addForm).then(res => {
            console.log(res.data)
            if (res.meta.status === 201) {
              this.$message({
                message: '增加用户成功',
                type: 'success'
              })
              this.addDialog = false
            } else {
              this.$message({
                message: '增加用户失败',
                type: 'success'
              })
            }
            this.initList()
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
