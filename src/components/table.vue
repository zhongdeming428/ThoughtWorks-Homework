<template>
  <div id="table-div">
    <div id="submit-date">
      <label for="year">提交日期：</label>
      <input type="number" id="year"
             v-model="submitDate.year"
             @click="submitData"
             placeholder="年"/> /
      <input type="number"
             v-model="submitDate.month"
             @click="submitData"
             placeholder="月"/> /
      <input type="number"
             v-model="submitDate.day"
             @click="submitData"
             placeholder="日"/>
    </div>
    <table class="table">
      <thead>
        <th width="19%"><label for="license-plate-number">车牌号</label></th>
        <th width="18%"><label for="date-of-purchase">购买日期</label></th>
        <th width="15%"><label for="car-brand">品牌名称</label></th>
        <th width="26%"><label for="drive-distance">目前运行公里数</label> </th>
        <th width="15%"><label for="is-overhaul">有无大修</label></th>
        <th width="7%"></th>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td>{{item.carNo}}</td>
          <td>{{item.purchaseDate}}</td>
          <td>{{item.carBrand}}</td>
          <td>{{item.driveDistance}}</td>
          <td>{{item.isOverhaul}}</td>
          <td></td>
        </tr>
        <tr>
          <td width="19%">
            <input type="text"
                   id="license-plate-number"
                   v-model="newItem.carNo"/>
          </td>
          <td width="18%">
            <input type="text"
                   id="date-of-purchase"
                   v-model="newItem.purchaseDate"/>
          </td>
          <td width="15%">
            <input type="text"
                   id="car-brand"
                   v-model="newItem.carBrand"/>
          </td>
          <td width="26%">
            <input type="number"
                   id="drive-distance"
                   v-model="newItem.driveDistance"/>
          </td>
          <td width="15%">
            <input type="checkbox"
                   id="is-overhaul"
                   v-model="newItem.isOverhaul"/>
          </td>
          <td width="7%">
            <input type="button"
                   value="+"
                   @click="addNew"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import JudgeCar from './../JudgeTheCar'
  export default {
    name:'inputTable',
    data(){
        return {
            newItem:{
              carNo:'',
              purchaseDate:'',
              carBrand:'',
              driveDistance:'',
              isOverhaul:false
            },
            items:[],
            submitDate:{
                year:'',
                month:'',
                day:''
            }
        }
    },
    methods:{
        addNew(){        //添加新内容到表格中
            let keys = Object.keys(this.newItem);
            for(let key of keys){
                if(this.newItem[key] === ''){
                    window.alert('所有属性均不能为空！');
                    return false;
                }
            }
            keys = Object.keys(this.submitDate);
            for(let key of keys){
                if(this.submitDate[key] === ''){
                    window.alert('所有属性均不能为空！');
                    return false;
                }
            }
            if(this.newItem.isOverhaul){
                this.newItem.isOverhaul = 'T';
            }
            else {
                this.newItem.isOverhaul = 'F';
            }
            if(!/^\d{4}\/\d{2}\/\d{2}$/.test(this.newItem.purchaseDate)){
                alert('购买日期的格式为"YYYY/MM/DD"!');
                this.newItem.purchaseDate = '';
                return false;
            }
            if(!/^\d+$/.test(this.newItem.driveDistance)){
                window.alert('目前运行公里数必须为正整数！');
                return false;
            }
            this.items.push(this.newItem);
            this.newItem = {
              carNo:'',
              purchaseDate:'',
              carBrand:'',
              driveDistance:'',
              isOverhaul:false
            };
            this.submitData();
        },
        submitData(){         //提交数据到父组件，同步更新右边视图，这里不使用Vuex
            let result = {      //结果对象
                TimeRelatedMaintenance:[],
                DistanceRelatedMaintenance:[],
                WriteOff:[]
            };
            let pushToResult = function (obj,car) {   //用于向结果对象中添加数据
              if(obj.length === 0){                   //提高重用性
                obj.push({
                  carBrand:car.carBrand,
                  carNo:[car.carNo]
                });
              }
              else {
                let flag = true;
                obj.forEach(val => {
                  if (val.carBrand === car.carBrand) {
                    val.carNo.push(car.carNo);
                    flag = false;
                  }
                });
                if(flag){
                  obj.push({
                    carBrand:car.carBrand,
                    carNo:[car.carNo]
                  });
                }
              }
            };
            let submitDateObj = {};
            submitDateObj.year = parseInt(this.submitDate.year);
            submitDateObj.month = parseInt(this.submitDate.month);
            submitDateObj.day = parseInt(this.submitDate.day);
            //将字符串转换为纯数字,便于后面计算
            this.items.forEach(car => {
                if(JudgeCar.carIsWriteOff(car, submitDateObj) === 'scrapped'){
                    //do nothing...
                }               //判断车辆是否已经报废
                else if(JudgeCar.carIsWriteOff(car, submitDateObj)){
                    pushToResult(result.WriteOff,car);
                }               //优先判断车辆是否应该提醒报废
                else if(JudgeCar.needDistanceRelatedMaintenance(car)){
                    pushToResult(result.DistanceRelatedMaintenance, car);
                }
                else if(JudgeCar.needTimeRelatedMaintenance(car, submitDateObj)){
                    pushToResult(result.TimeRelatedMaintenance,car);
                }
            });
//            console.log('timerelated'+ result.TimeRelatedMaintenance);
//            console.log('distancerelated'+result.DistanceRelatedMaintenance);
//            console.log('writeoff'+result.WriteOff);
            this.$emit('changeData',result);
        }
    }
  }
</script>
<style scoped>
  #table-div {
    width:30rem;
    margin:auto;
  }
  .table {
    margin:2rem auto;
    width: 30rem;
    border-collapse: collapse !important;
    max-width: 100%;
    background-color: #fff;
    border-radius: 6px;
  }
  .table > tbody > tr > td  > input {
    border-radius: 3px;
    border:1px solid #c3c3c3;
  }
  .table > tbody > tr > td  > input[type='button'] {
    background-color: #337ab7;
    color: #fff;
    border:none;
    cursor: pointer;
  }
  th {
    height:2rem;
    vertical-align: middle;
    /*border:1px solid #c3c3c3;*/
    height: 3rem;
  }
  td {
    font-size: 0.6rem;
    height:2rem;
    vertical-align: middle;
    /*border:1px solid #c3c3c3;*/
  }
  tr {
    /*border:1px solid #c3c3c3;*/
    border-top:1px solid #c0caed;
    height: 3rem;
  }
  tr:hover {
    background-color: aqua;
  }
  #submit-date {
    width: 30rem;
    margin:0.5rem auto;
    text-align: left;
  }
  #submit-date input {
    width: 5rem;
  }
  tbody input {
    width: 80%;
  }
</style>
