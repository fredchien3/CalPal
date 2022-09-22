
# CalPal

[CalPal](https://fredchien3.github.io/CalPal/) is a data visualization webapp that allows users to view the nutritional value of their custom meals.
It receives the user's selection of bowl choices and displays the total calorie, macronutrient, and micronutrient breakdowns.
The goal of the app is to empower users to make more informed nutritional decisions in support of their goals.


## Instructions

- Select from a list of food items, step-by-step:

<img src="src/gifs/1-user-input-gif.gif" width="300" alt="user input gif">

- Deselect items if you change your mind:

<img src="src/gifs/2-deselecting.gif" width="400" alt="deselection gif">

- Toggle the view of macronutrients between a pie chart (proportion) and bar chart (amount in grams)

<img src="src/gifs/3-toggle-macro.gif" height="300" alt="toggle macros chart gif">

- Hide/show the two micronutrients charts

<img src="src/gifs/4-toggle-micros.gif" width="400" alt="toggle micros charts gif">

## Technologies, Libraries, APIs

- Vanilla JavaScript: for handling buttons, toggles, and food item tallying 
- Webpack: compiling stylesheets and JS script files
- Chart.js: rendering the nutritional charts using Canvas

## Technical Implementation Details

The data comes from a JSON file containing each step of the CAVA ordering process. Each step holds an array of all its food choices, and each choice holds its nutrient information.

```json
// Example food item:
{
  "Item": "Braised Lamb",
  "Calories": "210",
  "Calories from fat": "110",
  "Total Fat": "12",
  "Saturated Fat": "6",
  "Trans fat": "0",
  "Cholestrol": "65",
  "Sodium": "240",
  "Carbohydrates": "2",
  "Fiber": "1",
  "Sugar": "0",
  "Protein": "24"
}
```

The the user inputs interface is dynamically generated from the JSON file. 

```javascript
// Each slide div is generated based on the JSON file's steps.
setupUserInputSlides () {
  const numberOfSlides = cava.steps.length;

  cava.steps.forEach((step, i) => {
    const stepNumber = i + 1;

    const slideDiv = document.createElement('div');
    slideDiv.className = 'user-input-slide-div';

    const slideNum = document.createElement('div');
    slideNum.className = 'user-input-slide-number';
    slideNum.classList.add('noselect');
    slideNum.innerText = stepNumber + ' / ' + numberOfSlides;
    slideDiv.appendChild(slideNum);

    const slideTitle = document.createElement('div');
    slideTitle.className = "step-title";
    slideTitle.classList.add('noselect');
    slideTitle.innerText = step.name;
    slideDiv.appendChild(slideTitle);
    
    const stepChoices = document.createElement('div');
    stepChoices.className = 'choices-div'
    step.items.forEach(itemObject => {
      stepChoices.appendChild(this.generateButton(itemObject));
    })
    slideDiv.appendChild(stepChoices);
    
    this.userInputSlideshowWrapper.appendChild(slideDiv);
  })
  this.setupPrevAndNextButtons();
  this.setupIndexDots(numberOfSlides);
},

// Then, the slide is populated with a button for each food item.
generateButton (itemObject) {
  const button = document.createElement('button');
  button.className = itemObject.Item;
  button.classList.add("user-input-button");
  button.innerText = itemObject.Item;
  button.addEventListener('click', () => {
    this.handleItemSelect(itemObject);
  })
  return button;
}

// When a food item button is clicked, it does two things: 
// 1. It adds the corresponding food item's nutritional info to the behind-the-scenes Meal class
// 2. It creates a corresponding button in the selected-items-display
handleItemSelect (itemObject) {
  this.meal.pushItem(itemObject);
  const ul = document.createElement('ul')
  const button = document.createElement('button');
  button.className = itemObject.Item;
  button.classList.add("user-input-button");
  button.innerText = itemObject.Item;
  this.selectedItemsDisplay.appendChild(button);
  this.selectedItemsDisplay.scrollTop = this.selectedItemsDisplay.scrollHeight;
  button.addEventListener('click', () => {
    this.meal.popItem(itemObject);
    this.selectedItemsDisplay.removeChild(button);
  })
},
```

## Future Functionality

- Multiple build-your-bowl chains to select from

- Saving functionality, allowing users to save their built bowls

- A comparison feature that allows users to view different saved bowls side-by-side, even across different chains

- Allergy indicators on the food item buttons

## Implementation Timeline

(tentative and aggressive)
 - ~~Thursday Afternoon: Submit initial proposal, create repo, mockup wireframe, and begin final proposal~~
 - ~~Friday Afternoon & Weekend: Complete initial project setup, research APIs~~
 - ~~Monday: Populate food data and backend logic for calculating outputs~~
 - ~~Tuesday: Build out frontend~~
 - ~~Wednesday: Polish~~
 - Thursday Morning: Deploy on GitHub, sip champagne
