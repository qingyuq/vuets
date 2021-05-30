<template>
    <el-dialog title="新增账户" :close-on-click-modal="false" :visible.sync="dialogVisible" :show-close="false" width="30%">
      <el-form :rules="rules" ref="ruleForm" :model="account" class="form-box" label-width="100px">
        <el-form-item label="请选择角色" prop="role">
          <el-select v-model="account.role" @change="selectChange" placeholder="请选择角色">
            <el-option  v-for="option in options" :value="option.role" :label="option.role" :key="option.key"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入账号" prop="username">
            <el-input v-model="account.username"  placeholder="请输入账号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('closeDialog')">取消</el-button>
        <el-button type="primary" @click="handleAdd">确定</el-button>
      </span>
    </el-dialog>
 </template>
 
 <script lang="ts">
 import { Component,Vue,Provide,Prop,Emit } from 'vue-property-decorator'
 @Component({
     components:{}
 })
 export default class AddAccount extends Vue{
    @Prop(Boolean) dialogVisible!:boolean;
    @Prop(Array) options!:any

    @Provide() account:object={
      key: "",
      role: "",
      username: "",
      des: ""
    }

    @Provide() rules: any = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    role: [{ required: true, message: "请选择角色", trigger: "change" }]
  };
  //处理获用户输入的数据
  selectChange(select:string){
    this.options.map((option:any)=>{
      if(option.role == select){
        (this as any).account.key = option.key;
        (this as any).account.des = option.des;
      }
    })
  }
  @Emit("closeDialog")
  handleAdd(){
    (this as any).$refs["ruleForm"].validate((valid: boolean)=>{
      if(valid){
        (this as any).$axios.post("/api/users/addUser",this.account)
        .then((res:any) =>{
          this.$emit("update");
          this.$message({
              message: res.data.msg,
              type: "success"
            });
        })
      }
    })
  }
 }


 </script>
 
 <style lang="scss" scoped>
  .form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
  </style>