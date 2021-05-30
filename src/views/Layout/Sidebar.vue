<template>
  <el-scrollbar class="el-scrollbar">
      <el-menu class="el-menu-slide" :defailt-activ="$router.currentRoute.path" router >
        <template 
        v-for="item in getRouterslist"
        >
        <el-menu-item 
        v-if="item.children.length == 1"
        :index = "item.children[0].path"
        :key="item.name"
        >
            <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
            <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>

         <!-- 多个子元素 -->
         <el-submenu v-else :index = "item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index ="child.path" :key="child.name">
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span slot="title">{{child.meta.title}}</span>
          </el-menu-item>
         </el-submenu>
        </template>
      </el-menu>
  </el-scrollbar>
</template>

<script lang='ts'>
import { Component,Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class'

@Component({
components: {
 
}
})
export default class Sidebar extends Vue{
  @Getter("routers") getRouters:any;
  created() {
  }
  get getRouterslist(){
    return this.getRouters.filter(function (user:any) {
			return user.hidden&&user.children&&user.children.length>0;//返回isShow=true的项，添加到activeUsers数组
		})
  }
};
</script>

<style lang="scss" scoped>

.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>