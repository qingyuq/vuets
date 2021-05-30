<template>
    <div class="account-data">
        <div class="add-box">
            <el-button @click="addAccount" type="primary">新增账户</el-button>
        </div>
        <el-table :data="tableData" style="width:100%" border>
            <el-table-column label="角色" width="180">
                <template slot-scope="scope">
                    <el-select
                    v-if="scope.row.edit"
                    v-model="scope.row.role"
                    @change="selectChange(scope.row)"
                    >
                        <el-option 
                        v-for="option in options"
                        :label="option.role"
                        :value="option.role"
                        :key="option.key"
                        ></el-option>
                    </el-select>
                    <span v-else>{{ scope.row.role }}</span>
                </template>
            </el-table-column>
            <el-table-column label="账号" width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.username" v-if="scope.row.edit"></el-input>
                    <span v-else>{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="des"></el-table-column>
            <el-table-column label="操作" width="180">
                <!-- v-if="scope.row.username !='admin'" -->
                <template slot-scope="scope" >
                    <el-button 
                     size="mini"
                     @click="handleEdit(scope.$index,scope.row)"
                     v-if="!scope.row.edit"
                     >编辑</el-button>
                    <el-button 
                    @click="handleSave(scope.$index,scope.row)"
                    v-else
                    size="mini"
                    type="success"
                    >完成</el-button>
                    <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-Account :dialogVisible="dialogVisible" :update="getData" :options = "options" @closeDialog="closeDialog">

        </add-Account>
    </div>
</template>
   
   <script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import AddAccount from './AddAccount.vue'
@Component({
    components: { "add-Account":AddAccount}
})
export default class AccountData extends Vue {
    @Provide() tableData: any = [];
    @Provide() dialogVisible:Boolean=false
    // select数据
    @Provide() options: any = [
    {
      key: "admin",
      role: "管理员",
      des: "Super Administrator. Have access to view all pages."
    },
    {
      key: "editor",
      role: "客服",
      des: "Normal Editor. Can see all pages except permission page"
    },
    {
      key: "visitor",
      role: "游客",
      des: "Just a visitor. Can only see the home page and the document page"
    }
     ];
   //新增按钮开关
    addAccount() {
        this.dialogVisible = true
    }
    //取消
    closeDialog(){
        this.dialogVisible = false
    }
    //编辑按钮
    handleEdit(index: number, row: any):void{
        row.edit = true
    }
    //选择角色的change事件
    selectChange(item:any){
        this.options.map((option:any)=>{
            if(item.role == option.role){
                item.key = option.key;
                item.des = option.des;
            }
        })
    }
    //完成按钮
    handleSave(index: number, row: any):void{
        row.edit = false;
       (this as any).$axios.post(`/api/users/editUser/${row._id}`,row)
       .then((res:any) => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
       })
       
    }
    //删除按钮事件
    handleDelete(index: number, row: any){
        (this as any).$axios.delete(`/api/users/deleteUser/${row._id}`)
        .then((res:any) => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.tableData.splice(index,1)
       })
    }
    created() {
        this.getData()
    }
    getData() {
        (this as any).$axios("/api/users/allUsers")
            .then((res: any) => {
                //处理编辑状态，添加edit属性
                res.data.datas.forEach((item:any) =>{
                    item.edit = false
                })
                this.tableData = res.data.datas
            })
    }
}
</script>
   
<style lang="scss" scoped>
.account-data {
    height: 100%;
    overflow: auto;
    .add-box {
        margin-bottom: 10px;
    }
}
</style>