<template>
    <div class="login">
        <login-Header>
          <el-form 
            :rules="rules"
            ref="ruleForm"
            :model ="ruleForm"
            label-position="left"
            label-width="0px"
            slot="container"
            >
              <div class="title">
                  账号密码登录
              </div>
              <!-- username -->
              <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
                  <i class="fa fa-user-o" slot="prefix"></i>
                </el-input>
              </el-form-item>
              <!-- password -->
              <el-form-item  prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
                  <i class="fa fa-lock" slot="prefix"></i>
                </el-input>
              </el-form-item>
              <!-- 登录button -->
              <el-form-item>
                <el-button
                :loading="Login"
                @click.native.prevent="handleSubmit"
                type="primary"
                style="width:100%;"
                >
                登录
                </el-button>
              </el-form-item>
               <!-- 7天登录和忘记密码 -->
              <el-form-item>
                <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">天自动登录</el-checkbox>
                <el-button @click="$router.push('/password')" type="text" class="forget">忘记密码？</el-button>
              </el-form-item>
          </el-form>
        </login-Header>
    </div>
</template>

<script lang='ts'>
import { Component,Vue,Provide } from 'vue-property-decorator'
import { State,Getter,Action,Mutation } from 'vuex-class'
import LoginHeader from './LoginHeader.vue'
@Component({
    components:{ 'login-Header':LoginHeader }
})

export default class Login extends Vue {
  //存储用户信息
  @Action("setUser") setUser:any 
  @Provide() Login:boolean = false;
  @Provide() ruleForm:{
    username:string,
    pwd:string,
    autoLogin:boolean
  } = {
    username :"",
    pwd :"",
    autoLogin:true //是否自动登录
  }
 
  @Provide() rules ={
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
  }

  handleSubmit():void{
    (this.$refs['ruleForm'] as any).validate((valid:boolean) =>{
         if (valid) {
            this.Login = true;
            (this as any).$axios.post('/api/users/login',this.ruleForm)
            .then((res:any) =>{
                this.Login = false
                if(res.data.msg == "登录成功"){
                  //存储token
                  this.setUser(res.data.token)  // 存储到vuex中
                  localStorage.setItem('tsToken',res.data.token)
                  // 登录成功 跳转 /
                  this.$router.push("/");
                }
            }).catch(()=>{
              this.Login = false
            })
          }
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

i {
  font-size: 14px;
  margin-left: 8px;
}
.forget {
  float: right;
}
</style>