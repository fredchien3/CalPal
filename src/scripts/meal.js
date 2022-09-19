import { chartUtil } from "./chart-util";

export class Meal {
  constructor () {
    this.totalCals = 0;
    this.totalProtein = 0;
    this.totalFat = 0;
    this.totalCarbs = 0;
    this.itemObjects = [];
  }

  pushItem (itemObject) {
    this.itemObjects.push(itemObject);
    this.totalCals += parseInt(itemObject['Calories']);
    this.totalProtein += parseInt(itemObject['Protein']);
    this.totalFat += parseInt(itemObject['Total Fat']);
    this.totalCarbs += parseInt(itemObject['Carbohydrates']);
    chartUtil.refresh();
  }

  popItem (itemObject) {
    this.itemObjects.splice(this.itemObjects.indexOf(itemObject), 1);
    this.totalCals -= parseInt(itemObject['Calories']);
    this.totalProtein -= parseInt(itemObject['Protein']);
    this.totalFat -= parseInt(itemObject['Total Fat']);
    this.totalCarbs -= parseInt(itemObject['Carbohydrates']);
    chartUtil.refresh();
  }

  printItems () {
    const arr = this.itemObjects.map(ele => ele.Item);
    console.log(arr);
  }
  
  macros () {
    return [this.totalProtein, this.totalFat, this.totalCarbs];
  }
  
  calories () {
    return this.totalCals;
  }
}