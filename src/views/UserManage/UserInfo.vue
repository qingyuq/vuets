<template>
    <div class="user-info">
       <div class="img-box">
        <h2 class="title">About me</h2>
        <img :src="require(`@/assets/${getUser.key}.jpg`)" alt="">
        <h4>{{getUser.username}}</h4>
       </div>
       <div class="info-box">
           <!-- form -->
        <h2 class="title">Account</h2>
        <el-form :model="userDate" class="form-box">
            <el-form-item label="用户名">
                <el-input v-model='getUser.username' readonly></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model='userDate.pwd' ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button 
                @click="onSubmit"
                :loading="loading"
                :disabled="!userDate.pwd"
                type="primary"
                >
                    修改密码
                </el-button>
            </el-form-item>
        </el-form>
       </div>
    </div>
   </template>
   
   <script lang="ts">
   import { Component,Vue,Provide } from 'vue-property-decorator'
   import { Getter } from 'vuex-class'
   @Component({
       components:{}
   })
   export default class UserInfo extends Vue{
       @Getter('user') getUser:any;
       @Provide() userDate:{username:string,pwd:string} ={
        username:'',
        pwd:''
       }
       @Provide() loading:boolean =false; // 是否发起网络请求

       onSubmit(){
        this.userDate.username = this.getUser.username;
        this.loading = true ;
        (this as any).$axios.post("/api/users/changePwd",this.userDate)
        .then((res:any) =>{
            this.loading = false
            this.$message({
            message: res.data.msg,
            type: "success"
            });
        }).catch(()=>this.loading = false)
        
       }
       created() {
            
       }
   }


   </script>
   
   <style lang="scss" scoped>
    .user-info {
      height: calc(100% - 70px);
      display: flex;
      overflow: auto;
      color: #606266;
      .img-box,
      .info-box {
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
        background: #fff;
        .title {
          border-bottom: 1px solid #dcdfe6;
          padding: 10px;
          text-align: left;
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .img-box {
        text-align: center;
        width: 30%;
        margin-right: 10px;
        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
        h4 {
          margin-top: 20px;
          font-size: 16px;
        }
      }
      .info-box {
        flex: 1;
        .form-box {
          padding: 10px;
        }
      }
    }
    </style>