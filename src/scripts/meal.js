import { chartUtil } from "./chart-util";

export class Meal {
  constructor () {
    this.totalCals = 0;
    this.totalProtein = 0;
    this.totalFat = 0;
    this.totalCarbs = 0;
  }

  pushItem (itemObject) {
    this.totalCals += parseInt(itemObject['Calories']);
    this.totalProtein += parseInt(itemObject['Protein']);
    this.totalFat += parseInt(itemObject['Fat']);
    this.totalCarbs += parseInt(itemObject['Carbohydrates']);
    chartUtil.refresh();
  }
  
  macros () {
    return [this.totalProtein, this.totalFat, this.totalCarbs];
  }
  
  calories () {
    return this.totalCals;
  }
}