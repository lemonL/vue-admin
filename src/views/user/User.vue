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
        v-loading="loading"
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
              @click="showEditDialog(scope.row)"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="showDeleteDialog(scope.row)"
              icon="el-icon-delete"
            ></el-button>
            <el-button
              size="mini"
              type="warning"
              plain
              @click="showGrantDialog(scope.row)"
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
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
    <div class="Dialog">
      <el-dialog
        title="编辑用户"
        :visible.sync="editDialog"
      >
        <el-form
          :model="editForm"
          :rules="rules"
          ref="editUserSubmit"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="editForm.username"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="editForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电话"
            prop="mobile"
          >
            <el-input
              v-model="editForm.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="editUserSubmit('editUserSubmit')"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="Dialog">
      <el-dialog
        title="分配角色"
        :visible.sync="grantDialog"
      >
        <el-form :model="grantForm">
          <el-form-item
            label="当前用户:"
            prop="username"
          >
            <el-tag type="info">{{grantForm.username}}</el-tag>
          </el-form-item>
          <el-form-item label="选择角色:">
            <el-select
              v-model="roleId"
              placeholder="请选择角色"
            >
              <!-- : 代表 数据绑定 -->
              <el-option
                :label="role.roleName"
                v-for="(role,index) in roleList"
                :key="index"
                :value="role.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="grantDialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="grantUserSubmit()"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>
<script>
import { getUserList, changeUserState, addUser, getUserById, editUser, deleteUser, getRoleList, grantUserRole } from '@/api'
export default {
  data () {
    return {
      userList: [],
      total: 0,
      pagesize: 10,
      pagenum: 1,
      queryParam: '',
      addDialog: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      loading: true,
      editDialog: false,
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      grantDialog: false,
      grantForm: {},
      roleList: [],
      roleId: '',
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
      this.loading = true
      getUserList({ params: { query: this.queryParam, pagenum: this.pagenum, pagesize: this.pagesize } }).then(res => {
        console.log(res)
        this.userList = res.data.users
        this.total = res.data.total
        this.loading = false
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
                type: 'warning'
              })
            }
            this.initList()
          })
        }
      })
    },
    editUserSubmit (formData) {
      this.$refs[formData].validate(valide => {
        if (valide) {
          editUser(this.editForm).then(res => {
            if (res.meta.status === 200) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.editDialog = false
            } else {
              this.$message({
                message: '编辑失败',
                type: 'warning'
              })
            }
            this.initList()
          })
        }
      })
    },
    showEditDialog (row) {
      getUserById(row.id).then(res => {
        this.editDialog = true
        if (res.meta.status === 200) {
          this.editForm.username = res.data.username
          this.editForm.email = res.data.email
          this.editForm.mobile = res.data.mobile
          this.editForm.id = res.data.id
        }
      })
    },
    showDeleteDialog (row) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initList()
          }
        })
      }).catch(() => {
      })
    },
    showGrantDialog (row) {
      this.grantForm = row
      this.grantDialog = true
      getRoleList().then(res => {
        if (res.meta.status === 200) {
          this.roleList = res.data
        }
      })
    },
    grantUserSubmit () {
      if (!this.roleId) {
        this.$message({
          message: '角色不能为空',
          type: 'warning'
        })
      } else {
        grantUserRole({ id: this.grantForm.id, rid: this.roleId }).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '分配角色成功!'
            })
            this.grantDialog = false
          } else {
            this.$message({
              message: '分配角色失败',
              type: 'warning'
            })
          }
        })
      }
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
