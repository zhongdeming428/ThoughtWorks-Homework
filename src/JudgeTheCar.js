/**
 * Created by Administrator on 2017/10/15.
 */
function getNewDay(dateTemp, days) {
  var dateTemp = dateTemp.split("/");
  var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
  var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
  var rDate = new Date(millSeconds);
  var year = rDate.getFullYear();
  var month = rDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var date = rDate.getDate();
  if (date < 10) date = "0" + date;
  year = parseInt(year);
  month = parseInt(month);
  date = parseInt(date);
  return {
    year, month, date
  }
}
function calculateMonth(car,submitDate){
  let month1 = 12 - window.parseInt((car.purchaseDate.split('/'))[1]);
  let month2 = submitDate.month;
  let month3 = 12 * (submitDate.year - window.parseInt((car.purchaseDate.split('/'))[0]) - 1);
  let months = month1 + month2 + month3;
  return months;
}

//判断汽车是否报废
//如果报废，则返回scrapped
//未到提醒报废日期则返回false
//达到提醒报废日期则返回true
function carIsWriteOff(car, submitDate){
  let writeOffDate = 0;
  let res;
  let months;
  let resMonth;
  let resDay;
  if(car.isOverhaul === 'T'){        //大修车辆3年报废
    writeOffDate = getNewDay(car.purchaseDate,1095);
    console.log(writeOffDate);
    res = writeOffDate.year - submitDate.year;
    if(res > 1){
      return false;
    }
    else if(res === 1){
        months = 12 - writeOffDate.month + submitDate.month;
        if(months === 1){
          return true;
        }
        else {
          return false;
        }
    }
    else if(res === 0){
      resMonth = writeOffDate.month - submitDate.month;
      if(resMonth > 1){
        return false;
      }
      else if(resMonth === 1){
        return true ;
      }
      else if(resMonth === 0){
        resDay = writeOffDate.date - submitDate.day;
        if(resDay > 0){
          return true ;
        }
        else {
          return 'scrapped';
        }
      }
      else {
        return 'scrapped';
      }
    }
    else {
      return 'scrapped';
    }
  }
  else {
    writeOffDate = getNewDay(car.purchaseDate,2190);  //普通车辆6年报废
    console.log(writeOffDate);
    res = writeOffDate.year - submitDate.year;
    if(res > 1){
      return false;
    }
    else if(res === 1){
      months = 12 - writeOffDate.month + submitDate.month;
      if(months === 1){
        return true;
      }
      else {
        return false;
      }
    }
    else if(res === 0){
      resMonth = writeOffDate.month - submitDate.month;
      if(resMonth > 1){
        return false;
      }
      else if(resMonth === 1){
        return true ;
      }
      else if(resMonth === 0){
        resDay = writeOffDate.date - submitDate.day;
        if(resDay > 0){
          return true ;
        }
        else {
          return 'scrapped';
        }
      }
      else {
        return 'scrapped';
      }
    }
    else {
      return 'scrapped';
    }
  }
}
function needTimeRelatedMaintenance(car, submitDate){
    function judgeMonths(maintenanceMonth,months) {
      if(maintenanceMonth - months === 0){
        if((car.purchaseDate.split('/'))[2] > submitDate.day){
          return true;
        }
        else {
          return false;
        }
      }
      else if(maintenanceMonth - months === 1) {
        return true ;
      }
      else {
        return false;
      }
    }
    if(car.isOverhaul === 'T'){        //3个月保养一次
        let months = calculateMonth(car,submitDate);
        let maintenanceMonth = 0;
        for(let i=0;;i++){
          if(i * 3 - months >= 0){
            maintenanceMonth = i * 3;
            break;
          }
        }
        return judgeMonths(maintenanceMonth,months);
    }
    else if(submitDate.year - (car.purchaseDate.split('/'))[0] < 3){  //12个月保养一次
        let months = calculateMonth(car, submitDate);
        let maintenanceMonth = 0;
        for(let i=0;;i++){
          if(i * 12 >= months){
            maintenanceMonth = i * 12;
            break;
          }
        }
        return judgeMonths(maintenanceMonth,months);
    }
    else if(submitDate.year - (car.purchaseDate.split('/'))[0] >= 3)    //6个月保养一次
    {
      let months = calculateMonth(car, submitDate);
      let maintenanceMonth = 0;
      for(let i=0;;i++){
        if(i * 6 >= months){
          maintenanceMonth = i * 6;
          break;
        }
      }
      return judgeMonths(maintenanceMonth,months);
    }
}
function needDistanceRelatedMaintenance(car){   //优先
    if(/^\d+$/.test(String(car.driveDistance / 10000))){
      return true;
    }
    else {
      let tmp = (window.parseInt(car.driveDistance / 10000) + 1) * 10000;
      if(tmp - car.driveDistance <= 500){
        return true ;
      }
      else {
        return false;
      }
    }
}
export default {
  carIsWriteOff, needDistanceRelatedMaintenance, needTimeRelatedMaintenance
}
