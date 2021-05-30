<template>
  <div class="layout">
    <!-- 头部 -->
    <layout-Header />

    <!-- 内容 -->
    <con-Tent>
      <my-Sidebar slot="left"></my-Sidebar>
      <router-view slot="content"></router-view>
    </con-Tent>
  </div>
</template>

<script lang='ts'>
import { Component,Vue } from 'vue-property-decorator';
import LayoutHeader from './LayoutHeader.vue';
import Content from './Content.vue'
import Sidebar from './Sidebar.vue'
@Component({
  components: {
    "layout-Header":LayoutHeader,"my-Sidebar":Sidebar,"con-Tent":Content
  }
})
export default class Layout extends Vue{};
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #f5f7f9;
  }
  </style>