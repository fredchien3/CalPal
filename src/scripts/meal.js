import { chartUtil } from "./chart-util";

export class Meal {
  constructor () {
    this.setInstanceVariables();
  }

  setInstanceVariables () {
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
  
  reset () {
    this.setInstanceVariables();
    chartUtil.refreshAll();
  }

  pushItem (itemObject) {
    this.itemObjects.push(itemObject);
    this.updateStats(itemObject, 1);
    chartUtil.refreshAll();
  }

  popItem (itemObject) {
    this.itemObjects.splice(this.itemObjects.indexOf(itemObject), 1);
    this.updateStats(itemObject, -1);
    chartUtil.refreshAll();
  }

  updateStats (itemObject, mathSign) {
    this.totalCals += ( mathSign * parseInt(itemObject['Calories']));
    this.totalProtein += ( mathSign * parseInt(itemObject['Protein']));
    this.totalFat += ( mathSign * parseInt(itemObject['Total Fat']));
    this.totalCarbs += ( mathSign * parseInt(itemObject['Carbohydrates']));
    this.totalCholestrol += ( mathSign * parseInt(itemObject['Cholestrol']));
    this.totalSodium += ( mathSign * parseInt(itemObject['Sodium']));
    this.totalFiber += ( mathSign * parseInt(itemObject['Fiber']));
    this.totalSugar += ( mathSign * parseInt(itemObject['Sugar']));
  }

  calories () {
    return this.totalCals;
  }
  
  macros () {
    if (this.totalProtein === 0 && this.totalFat === 0 && this.totalCarbs === 0) {
      return [];      
    } else {
      return [this.totalProtein, this.totalFat, this.totalCarbs];
    }
  }

  gramMicros () {
    return [this.totalFiber, this.totalSugar];
  }

  milligramMicros () {
    return [this.totalCholestrol, this.totalSodium];
  }
}