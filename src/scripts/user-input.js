import cava from "/src/foods/cava.json"

export const userInput = {
  setupButtons (meal) {
    this.meal = meal;
    this.userInputs = document.getElementById('user-inputs-wrapper');
    this.selectedItemsDisplay = document.getElementById('selected-items-display');

    cava.steps.forEach(step => {
      const togglePanel = document.createElement("button");
      togglePanel.className = "toggle-panel";
      togglePanel.innerText = step.name;

      this.userInputs.appendChild(togglePanel);
      const ul = document.createElement("ul");
      ul.className = "panel";
      ul.id = step.name;
      step.items.forEach(itemObject => {
        ul.appendChild(this.generateButton(itemObject, ul));
      });
      this.userInputs.appendChild(ul);

      togglePanel.addEventListener('click', () => {
        togglePanel.classList.toggle("active");
        ul.classList.toggle("show-panel")
      });
    })
  },
  
  generateButton (itemObject, ul) {
    const button = document.createElement("button");
    button.className = itemObject.Item;
    button.innerText = itemObject.Item;
    ul.appendChild(button);
    button.addEventListener('click', () => {
      this.handleItemSelect(itemObject);
    })
    return button;
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