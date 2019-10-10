<template>
<!-- 用户表 -->
    <div class="users">
        <!-- 实时访问量 -->
        <div class="usere-realtime">
            <div class="usere-realtime-title">用户访问量</div>
            <ve-line :data="userData"  :setting="userSettings" width='500px'></ve-line>
        </div>
         <!-- 用户分布图 -->
        <div class="usere-realtime">
            <div class="usere-realtime-title">新增用户分布图</div>
             <ve-histogram :data="chartData" :settings="chartSettings"  width='500px'></ve-histogram>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
         this.userSettings = {   //用户访问量
          xAxisType: 'time'
        }
        this.chartSettings = {
        metrics: ['新增用户'],
        dimension: ['日期']
      }
      return {
        userData: {  //用户访问量 数据
            columns: ['日期', '首次访问用户', '二次访问用户', '多次次访问用户'],
            rows: [
              { '日期': '1/1', '首次访问用户': 1393, '二次访问用户': 1093, '多次次访问用户': 1061 },
              { '日期': '1/2', '首次访问用户': 3530, '二次访问用户': 1830, '多次次访问用户': 996 },
              { '日期': '1/3', '首次访问用户': 2923, '二次访问用户': 2223, '多次次访问用户': 1320 },
              { '日期': '1/4', '首次访问用户': 1723, '二次访问用户': 1423, '多次次访问用户': 1201 },
              { '日期': '1/5', '首次访问用户': 3792, '二次访问用户': 2492, '多次次访问用户': 875 },
              { '日期': '1/6', '首次访问用户': 4593, '二次访问用户': 2293, '多次次访问用户': 1120 }
            ],
          },
          chartData: {
            columns: ['日期', '新增用户'],
            rows: [
              { '日期': '1/1', '新增用户': 20},
              { '日期': '1/2', '新增用户': 25},
              { '日期': '1/3', '新增用户': 36},
              { '日期': '1/4', '新增用户': 12},
              { '日期': '1/5', '新增用户': 29},
              { '日期': '1/6', '新增用户': 31}
            ]
          }
        }
      },
    methods:{
        rounds:function(min,max){
            return parseInt((Math.random()*(max-min))+min) 
        }
    },
    mounted:function(){
        let data= new Date()
        let year=data.getFullYear()
        let m=data.getMonth()+1
        let day=data.getDate()
        let userDataRows=[]
        
        for(let i=0;i<7;i++){
            let str={}
              str['日期']=m+'/'+((day-6)+i)
              str['首次访问用户']=this.rounds(93,890)
              str['二次访问用户']=this.rounds(76,360)
              str['多次次访问用户']=this.rounds(52,191)
              userDataRows.push(str)
        }
        this.userData.rows=userDataRows
       
        let AddUserDataRows=[]
        for(let i=0;i<7;i++){
            let str={}
              str['日期']=m+'/'+((day-6)+i)
              str['新增用户']=this.rounds(5,38)
              AddUserDataRows.push(str)
        }
        this.chartData.rows=AddUserDataRows
    }
}
</script>

<style scoped>
.users{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.usere-realtime{
    width: 45%;
    height: 100%;
    min-width: 500px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #D2D2D2;
}
.ve-line{
  width: 100%;
  height: 400px;
}
.usere-realtime-title{
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  color: #12BEFC;
}
</style>