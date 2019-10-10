<template>
    <!-- MarkDown编辑器 -->
    <div class="markdown">
        <div id="main">
            <mavon-editor :value="textTxt" @imgAdd="imgAdd" @change='markdownChange' :ishljs='true' :boxShadow='false' defaultOpen='edit' :toolbars='toolbars'/>
        </div>
    </div>
</template>

<script>
let toolbars={
      bold: true, // 粗体
      header: true, // 标题
      quote: true, // 引用
      link: true, // 链接
      imagelink: true, // 图片链接
      code: true, // code
      table: true, // 表格
      fullscreen: true, // 全屏编辑
      /* 1.3.5 */
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
      save: true, // 保存（触发events中的save事件）
      ol: true, // 有序列表
      ul: true, // 无序列表
      /* 2.2.1 */
      subfield: true, // 单双栏模式
      preview: true, // 预览
  }
export default {
    props:['textTxt'],
    data(){
        return {
            value: '',
            toolbars:toolbars
        }
    },
    methods:{
        markdownChange:function(val){
            this.$emit('addMark',val)
        },
        // 绑定@imgAdd event
        imgAdd(pos, $file){
          this.$alert('本站不支持上传本地图片', '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'error',
                        message:"上传错误"
                    });
                }
            });
        }
    
    }
}
</script>

<style scoped>

</style>