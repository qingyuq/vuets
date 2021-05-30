<template>
    <div class="password">
        <login-Header>
            <el-form 
            ref = "ruleForm"
            label-position="left"
            label-width="0px"
            :model ="ruleForm"
            slot="container" 
            :rules ='rules'>
                <div class="title">
                    <h3>找回密码</h3>
                </div>
                <!-- username -->
                <el-form-item  prop="username">
                    <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
                        <i slot="prefix" class="fa fa-user-o"></i>
                    </el-input>
                </el-form-item>
                <!-- email -->
                <el-form-item  prop="email">
                    <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="邮箱">
                        <i slot="prefix" class="fa fa-envelope-o"></i>
                    </el-input>
                </el-form-item>
                <!-- 确认 -->
                <el-form-item  prop="email">
                    <el-button
                    @click.native.prevent="handleSubmit"
                    :loading="loading"
                    type="primary"
                    style="width:100%;">
                        确认
                    </el-button>
                </el-form-item>
            </el-form>
        </login-Header>
    </div>
</template>

<script lang='ts'>
import { Component,Vue,Provide } from 'vue-property-decorator'
import LoginHeader from './LoginHeader.vue'
@Component({
    components:{'login-Header':LoginHeader }
})

export default class Password extends Vue {
@Provide() loading:boolean = false

@Provide() ruleForm:{username:string,email:string} ={
    username:"",
    email:""
}
@Provide() rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    email: [
      {
        required: true,
        message: "请输入邮箱地址",
        trigger: "blur"
      },
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: "blur,change"
      }
    ]
  };
    handleSubmit():void{
    (this.$refs['ruleForm'] as any).validate((valid:boolean) => {
          if (valid) {
            this.loading = true;
            (this as any).$axios.post("/api/users/findPwd",this.ruleForm)
            .then((res:any)=>{
                 this.loading = false;
                 this.$message({
                   message:res.data.msg,
                   type:"success"
                 })
                 console.log(1);
                 this.$router.push('/login')
                 
            }).
            catch(()=>{
              this.loading = false;
            })
          }
    })
    }
}
</script>

<style lang='scss' scoped>
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

i {
  font-size: 14px;
  margin-left: 8px;
}
</style>