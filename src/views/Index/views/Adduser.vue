<template>
<!-- 用户表 -->
    <div class="users">
        <!-- 实时访问量 -->
        <div class="usere-realtime">
            <div class="usere-realtime-title">文章总数据</div>
            <ve-line :data="userData"  :setting="userSettings" width='500px'></ve-line>
        </div>
         <!-- 用户分布图 -->
        <div class="usere-realtime">
            <div class="usere-realtime-title">用户留言</div>
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
        metrics: ['留言'],
        dimension: ['日期']
      }
      return {
        userData: {  //用户访问量 数据
            columns: ['日期', '阅读', '喜欢', '评论'],
            rows: [
              { '日期': '1/1', '阅读': 1393, '喜欢': 1093, '评论': 1061 },
              { '日期': '1/2', '阅读': 3530, '喜欢': 1830, '评论': 996 },
              { '日期': '1/3', '阅读': 2923, '喜欢': 2223, '评论': 1320 },
              { '日期': '1/4', '阅读': 1723, '喜欢': 1423, '评论': 1201 },
              { '日期': '1/5', '阅读': 3792, '喜欢': 2492, '评论': 875 },
              { '日期': '1/6', '阅读': 4593, '喜欢': 2293, '评论': 1120 }
            ],
          },
          chartData: {
            columns: ['日期', '留言'],
            rows: [
              { '日期': '1/1', '留言': 20},
              { '日期': '1/2', '留言': 25},
              { '日期': '1/3', '留言': 36},
              { '日期': '1/4', '留言': 12},
              { '日期': '1/5', '留言': 29},
              { '日期': '1/6', '留言': 31}
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
        let m=data.getMonth()+1
        let day=data.getDate()
        let userDataRows=[]
        for(let i=0;i<7;i++){
            let str={}
              str['日期']=m+'/'+((day-6)+i)
              str['阅读']=this.rounds(203,797)
              str['喜欢']=this.rounds(100,197)
              str['评论']=this.rounds(10,20)
              userDataRows.push(str)
        }
        this.userData.rows=userDataRows
       
        let AddUserDataRows=[]
        for(let i=0;i<7;i++){
            let str={}
              str['日期']=m+'/'+((day-6)+i)
              str['留言']=this.rounds(2,13)
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