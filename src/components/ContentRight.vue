<template>
  <div id="right-part">
    <div id="display-panel">
      <h2><i>Output</i></h2>
      <p>
        Reminder<br/>==================<br/>

          * Time-related maintenance coming soon...<br/>
            <span v-for="item in cars.TimeRelatedMaintenance">
              &nbsp;&nbsp;&nbsp;&nbsp;{{item.carBrand}}：{{item.carNo.length}} ( <span v-for="i in item.carNo">{{i}},</span>)
              <br/>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="flash_chara">|</span><br/>
          <br/>
          * Distance-related maintenance coming soon...<br/>
            <span v-for="item in cars.DistanceRelatedMaintenance">
              &nbsp;&nbsp;&nbsp;&nbsp;{{item.carBrand}}：{{item.carNo.length}} ( <span v-for="i in item.carNo">{{i}},</span>)
              <br/>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="flash_chara">|</span><br/>
          <br/>
          * Write-off coming soon...<br/>
            <span v-for="item in cars.WriteOff">
              &nbsp;&nbsp;&nbsp;&nbsp;{{item.carBrand}}：{{item.carNo.length}} ( <span v-for="i in item.carNo">{{i}},</span>)
              <br/>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="flash_chara">|</span><br/>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
      name : 'contentRight',
      props:['cars']
  }
</script>
<style scoped>
  #right-part {
    text-align: left;
  }
  #display-panel {
    width: 80%;
    min-height:80%;
    background-color: white;
    margin-top: 4rem;
    border-radius: 1rem;
    box-shadow: 0 0 2rem #c3c3c3;
    padding: 1px;
    box-sizing: border-box;
  }
  #display-panel > p {
    text-align: left;
    margin: 3rem 5rem;
  }
  h2 {
    width: 5rem;
    margin: 1rem;
    color:cornflowerblue;
  }
  .flash_chara {
    animation: blink 1s infinite steps(1, start);
  }
  @keyframes blink {
    0%, 100% {
      color: white;
    }
    50% {
      color: #000;
    }
  }
</style>
