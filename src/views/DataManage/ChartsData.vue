<template>
    <div class="charts-data">
        <el-tabs  type="border-card" v-model='tabPosition'>
            <el-tab-pane label="折线图" name='line'>
                <my-Charts v-if="showCharts == 'line'" :chartData='chartData' chartType='line'></my-Charts>
            </el-tab-pane>
            <el-tab-pane label="柱状图" name='bar' >
                <my-Charts v-if="showCharts == 'bar'"  chartType='bar' :chartData='chartData'></my-Charts>
            </el-tab-pane>
            <el-tab-pane label="饼图" name='pie'>
                <my-Charts v-if="showCharts == 'pie'" chartType='pie' :chartData='chartData'></my-Charts>
            </el-tab-pane>
        </el-tabs>
    </div>
   </template>
   
   <script lang="ts">
   import { Component,Vue,Provide } from 'vue-property-decorator'
   import Charts from '@/components/Charts.vue'
   @Component({
       components:{ 'my-Charts' :Charts }
   })
   export default class ChartsData extends Vue{
       @Provide() tabPosition:string ='line';
       @Provide() chartData:any = {
        xAxisData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        yAxisData:[820, 932, 901, 934, 1290, 1330, 1320]
       }
       get showCharts(){
           return this.tabPosition
           
       }
   }
   </script>
   
   <style>
   </style>