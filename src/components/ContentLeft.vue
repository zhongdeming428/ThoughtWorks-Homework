<template>
  <div id="left-part">
    <div id="tab">
      <span id="input-table"
            class="active_tab"
            ref="inputTable"
            @click="tabClick">
        <router-link to="./table">表格输入</router-link>
      </span>
      <span id="input-textarea"
            ref="inputTextarea"
            @click="tabClick">
        <router-link to="./textarea">文本输入</router-link>
      </span>
    </div>
    <router-view id="router-view" @changeData="passData"></router-view>
  </div>
</template>
<script>
  export default {
      name:'contentLeft',
      methods:{
        tabClick(e){
          if(e.target !== this.$refs.inputTable && e.target !== this.$refs.inputTextarea){
              let tmp = e.target.parentNode;
              this.$refs.inputTable.className = '';
              this.$refs.inputTextarea.className = '';
              tmp.className = 'active_tab';
          }
          else {
//              e.target.className = 'active_tab';
          }
          let obj = {
            TimeRelatedMaintenance:[],
            DistanceRelatedMaintenance:[],
            WriteOff:[]
          };
          this.$emit('changeData',obj);
        },
        passData(data){
            this.$emit('changeData',data);
        }
      }
  }
</script>
<style scoped>
  #left-part {

  }
  #tab {
    width: 30rem;
    border-bottom: 1px solid #c3c3c3;
    margin: 5rem auto;
    margin-bottom: 2rem;
    text-align: left;
    font-size: 0;
    padding-bottom: 0.5rem;
  }
  #input-table,
  #input-textarea {
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem;
    box-sizing: border-box;
  }
  .active_tab {
    background-color: white !important;
    border-top: 3px solid #c3c3c3;
  }
</style>
