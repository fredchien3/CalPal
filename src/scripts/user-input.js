import cava from "/src/foods/cava.json"

export const userInput = {
  setupButtons (stepIdx, meal) {
    this.meal = meal;
    this.userInputsUl = document.getElementById('user-inputs-ul');
    this.selectedItemsDisplay = document.getElementById('selected-items-display');

    const stepObject = cava.steps[stepIdx];
    stepObject.items.forEach(itemObject => {
      this.generateButton(itemObject);
    })
  },
  
  generateButton (itemObject) {
    const ul = document.createElement("ul")
    const button = document.createElement("button");
    button.className = itemObject.Item;
    button.innerText = itemObject.Item;
    this.userInputsUl.appendChild(button);
    button.addEventListener('click', () => {
      this.handleItemSelect (itemObject);
    })
  },

  handleItemSelect (itemObject) {
    this.meal.pushItem(itemObject);
    const ul = document.createElement("ul")
    const button = document.createElement("button");
    button.className = itemObject.Item;
    button.innerText = itemObject.Item;
    this.selectedItemsDisplay.appendChild(button);
    button.addEventListener('click', () => {
      this.meal.popItem(itemObject);
      this.selectedItemsDisplay.removeChild(button);
    })
  }
}