<template>
    <div class="table-data">
        <!-- 搜索框 -->
        <div class="search-box">
            <el-input size="small" v-model="searchVal" placeholder="请输入课程名称检索"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width:100%" :height="tHeight" class="table-box">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column label="课程名称" prop="title"></el-table-column>
            <el-table-column width="120" label="课程等级" prop="level"></el-table-column>
            <el-table-column width="120" label="技术栈" prop="type"></el-table-column>
            <el-table-column width="120" label="报名人数" prop="count"></el-table-column>
            <el-table-column width="160" label="上线日期" prop="date"></el-table-column>
            <el-table-column v-if="getUser.key != 'visitor'" label="操作" width="160">
                <template slot-scope="scope">
                <el-button size="mini" @click='handleEdit(scope.$index,scope.row)'>编辑</el-button>
                <el-button size="mini" type="danger" @click='handleDelete(scope.$index,scope.row)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="pages">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5,10,20]"
            :page-size="size"
            layout="total,sizes,prev,pager,next,jumper"
            :total="total"
            >

            </el-pagination>
        </div>
        <edit-Dialog :dialogVisible="dialogVisible" :form="formData" @closeDialog="closeDialog"></edit-Dialog>
    </div>
   </template>
   
   <script lang="ts">
   import { Component,Vue,Provide } from 'vue-property-decorator'
   import EditDialog from "./EditDialog.vue"
   import { Getter } from 'vuex-class'
   @Component({
       components:{ 'edit-Dialog':EditDialog }
   })
   export default class TableData extends Vue{
    @Getter('user') getUser:any;
    @Provide() searchVal:string='';//搜索框
    @Provide() tHeight:number = document.body.offsetHeight-270;
    @Provide() tableData:any = [];// 表格数据
    @Provide() page:number =1; //当前page
    @Provide() size:number =5;// 请求数据的个数 默认5
    @Provide() total: number = 0; // 总数据条数

    @Provide() dialogVisible:boolean = false;// 是否展示编辑页面
    @Provide() formData:object = {
        title: "",
    type: "",
    level: "",
    count: "",
    date: ""
    }
  loadData() {
    (this as any).$axios(`/api/profiles/loadMore/${this.page}/${this.size}`)
    .then((res:any)=>{
        this.tableData = res.data.data.list
        this.total = res.data.data.total
    })
   }
   //编辑
   handleEdit(index:number,row:any){
       this.formData = row;
       this.dialogVisible = true
        
   }
   //删除
   handleDelete(index:number,row:any){
       (this as any).$axios.delete(`/api/profiles/delete/${row._id}`)
       .then((res:any)=>{
           console.log(res);
           
        
       })
       this.tableData.splice(index,1)
       this.$message({
            message: '删除成功',
            type: "success"
        });
       
      
   }
   closeDialog(){
       this.dialogVisible = false
   }
   handleSizeChange(val:number):void{
        this.size = val
        this.page = 1;
        this.searchVal ? this.loadSearchData() : this.loadData();
   }
   handleCurrentChange(val:number):void{
        this.page = val
        this.searchVal ? this.loadSearchData() : this.loadData();
   }
   handleSearch(){
       //点击搜索
       this.page = 1
       
       this.searchVal ? this.loadSearchData():this.loadData();
   }
   loadSearchData(){
       //加载搜索数据       
       (this as any)
      .$axios.get(
        `/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`
      )
      .then((res: any) => {
        this.tableData = res.data.datas.list;
        this.total = res.data.datas.total;
      });
   }
   created() {
        this.loadData()   
   }
}
   </script>
<style lang="scss" scoped>
    .table-data {
      height: 100%;
      .table-box {
        font-size: 14px;
      }
      .pages {
        background: #fff;
        margin-top: 10px;
        padding: 10px 10px;
        text-align: right;
        height: 55px;
        box-sizing: border-box;
      }
      .search-box {
        background: #fff;
        margin-bottom: 10px;
        padding: 10px 10px;
        border-radius: 4px;
        height: 55px;
        box-sizing: border-box;
        .el-input {
          width: 200px;
          margin-right: 10px;
        }
      }
    }
    </style>