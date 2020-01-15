<template>
  <div id="container"> 
    <span class="successText">{{text}}</span>
  </div>  
</template>

<script>
export default {
  data(){
    return{
      text:''
    }
  },
  created(){
    this.text = 'webpack 配置 vue 启动成功！'
  }
}
</script>

<style lang="less">
  body{
    margin: 0;
    width: 100%;
    height: 100%;
  }
  #container{
    width: 100%;
    height: 100%;
    .successText{
      font-weight: bold;
      font-size: 50px;
    }
  }
</style>