import { chartUtil } from "./chart-util";

export class Meal {
  constructor () {
    this.totalCals = 0;
    this.totalProtein = 0;
    this.totalFat = 0;
    this.totalCarbs = 0;
    this.totalCholestrol = 0; // mg
    this.totalSodium = 0;     // mg
    this.totalFiber = 0;      // g
    this.totalSugar = 0;      // g
    this.itemObjects = [];
  }

  pushItem (itemObject) {
    this.itemObjects.push(itemObject);

    this.totalCals += parseInt(itemObject['Calories']);
    this.totalProtein += parseInt(itemObject['Protein']);
    this.totalFat += parseInt(itemObject['Total Fat']);
    this.totalCarbs += parseInt(itemObject['Carbohydrates']);

    this.totalCholestrol += parseInt(itemObject['Cholestrol']);
    this.totalSodium += parseInt(itemObject['Sodium']);
    this.totalFiber += parseInt(itemObject['Fiber']);
    this.totalSugar += parseInt(itemObject['Sugar']);

    chartUtil.refreshAll();
  }

  popItem (itemObject) {
    this.itemObjects.splice(this.itemObjects.indexOf(itemObject), 1);
    this.totalCals -= parseInt(itemObject['Calories']);
    this.totalProtein -= parseInt(itemObject['Protein']);
    this.totalFat -= parseInt(itemObject['Total Fat']);
    this.totalCarbs -= parseInt(itemObject['Carbohydrates']);

    this.totalCholestrol -= parseInt(itemObject['Cholestrol']);
    this.totalSodium -= parseInt(itemObject['Sodium']);
    this.totalFiber -= parseInt(itemObject['Fiber']);
    this.totalSugar -= parseInt(itemObject['Sugar']);
    
    chartUtil.refreshAll();
  }

  reset () {
    this.totalCals = 0;
    this.totalProtein = 0;
    this.totalFat = 0;
    this.totalCarbs = 0;
    this.totalCholestrol = 0;
    this.totalSodium = 0;
    this.totalFiber = 0;
    this.totalSugar = 0;
    this.itemObjects = [];
    chartUtil.refreshAll();
  }

  printItems () {
    const arr = this.itemObjects.map(ele => ele.Item);
    console.log(arr);
  }
  
  calories () {
    return this.totalCals;
  }
  
  macros () {
    return [this.totalProtein, this.totalFat, this.totalCarbs];
  }

  gramMicros () {
    return [this.totalFiber, this.totalSugar];
  }

  milligramMicros () {
    return [this.totalCholestrol, this.totalSodium];
  }
}