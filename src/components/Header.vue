<template>
  <div id="header">
    <h1><i>DADA Car Management System</i></h1>
  </div>
</template>
<script>
  export default {
      name:'headPart'
  }
</script>
<style scoped>
  #header {
    width: 100%;
    height:6rem;
    background-color: cornflowerblue;
    color: #fff;
    position: relative;
  }
  h1 {
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    left: 3rem;
  }
</style>
