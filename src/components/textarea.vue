<template>
  <div>
    <div id="textarea">
      <label for="input">输入相关信息:</label><br/><br/>
      <textarea id="input"
                rows="15"
                cols="60"
                v-model="carData"
                @keyup="processData">

      </textarea>
      <h3 v-show="!isRight">请输入正确格式的汽车信息！</h3>
   </div>
  </div>
</template>
<script>
  import JudgeCar from './../JudgeTheCar'
  export default {
      name:'textArea',
      data(){
          return {
              carData:'',
              isRight:true
          }
      },
      methods:{
            processData(){
                let data = this.carData;
                //匹配验证输入的正则表达式
                let regexp = /^SubmitDate[\s]*:[\s]*\d{4}\/\d{2}\/\d{2}\s(\w+\|\d{4}\/\d{2}\/\d{2}\|.+\|\d+\|[TF]\s)*(\w+\|\d{4}\/\d{2}\/\d{2}\|\w+\|\d+\|[TF])$/;
                if(!regexp.test(data)){
                    this.isRight = false;
                }
                else {
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
                    this.isRight = true;
                    let arr = data.split('\n');
                    arr[0] = (arr[0].match(/\d{4}\/\d{2}\/\d{2}/))[0];
                    let submitDate = {
                        year: parseInt(arr[0].substring(0,4)),
                        month: parseInt(arr[0].substring(5,7)),
                        day: parseInt(arr[0].substring(8,10))
                    };
                    let cars = arr.splice(1);
                    let newCars = [];
                    cars.forEach(val => {
                       let arr = val.split('|');
                       let obj = {};
                       obj.carNo = arr[0];
                       obj.purchaseDate = arr[1];
                       obj.carBrand = arr[2];
                       obj.driveDistance = arr[3];
                       obj.isOverhaul = arr[4];
                       newCars.push(obj);
                    });
                    newCars.forEach(car => {
                      if(JudgeCar.carIsWriteOff(car, submitDate) === 'scrapped'){
                        //do nothing...
                      }               //判断车辆是否已经报废
                      else if(JudgeCar.carIsWriteOff(car, submitDate)){
                        pushToResult(result.WriteOff,car);
                      }               //优先判断车辆是否应该提醒报废
                      else if(JudgeCar.needDistanceRelatedMaintenance(car)){
                        pushToResult(result.DistanceRelatedMaintenance, car);
                      }
                      else if(JudgeCar.needTimeRelatedMaintenance(car, submitDate)){
                        pushToResult(result.TimeRelatedMaintenance,car);
                      }
                    });
                    this.$emit('changeData',result);
                }
            }
      }
  }
</script>
<style scoped>
  #textarea {
    width: 30rem;
    height: 30rem;
    text-align: left;
    margin:auto;
  }
  #input {
    resize: none;
    border-radius: 6px;
  }
  h3 {
    color: red;
  }
</style>
