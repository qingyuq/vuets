<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component,Vue } from "vue-property-decorator"
import { Action } from "vuex-class"
@Component({
  components:{}
})
export default class App extends Vue{
  @Action("setUser") setUser:any ;
  created() {
    if (localStorage.tsToken) {
      this.setUser(localStorage.tsToken)
    }
  }
}
</script>
<style lang="scss">
#app{
  width: 100%;
  height: 100%;
}
</style>
