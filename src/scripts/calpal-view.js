import { chartUtil } from "./chart-util"
import { Meal } from "./meal";
import { userInput } from "./user-input";

export const CalPalView = {
  initialize () {
    this.meal = new Meal;
    chartUtil.setupChart(this.meal);
    userInput.setupButtons(0, this.meal);
  }
}