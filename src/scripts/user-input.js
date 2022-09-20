import cava from '/src/foods/cava.json'

export const userInput = {
  initialize (meal) {
    this.meal = meal;
    this.slideshowWrapper = document.getElementById('slideshow-wrapper');
    this.selectedItemsDisplay = document.getElementById('selected-items-display');

    this.slideIdx = 1;
    this.setupSlides();
    this.displaySlide(this.slideIdx);
    this.resetButton = document.getElementById('reset-meal');
    this.resetButton.addEventListener('click', () => {
      meal.reset();
      this.clearItemsDisplay();
    })
  },

  setupSlides () {
    const numberOfSlides = cava.steps.length;

    cava.steps.forEach((step, i) => {
      const stepNumber = i + 1;

      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide-div';

      const slideNum = document.createElement('div');
      slideNum.className = 'slide-number';
      slideNum.innerText = stepNumber + ' / ' + numberOfSlides;
      slideDiv.appendChild(slideNum);

      const slideTitle = document.createElement('div');
      slideTitle.className = "step-title";
      slideTitle.innerText = step.name;
      slideDiv.appendChild(slideTitle);
      
      const stepChoices = document.createElement('div');
      stepChoices.className = 'choices-div'
      step.items.forEach(itemObject => {
        stepChoices.appendChild(this.generateButton(itemObject));
      })
      slideDiv.appendChild(stepChoices);
      
      this.slideshowWrapper.appendChild(slideDiv);
    })
    this.setupPrevAndNextButtons();
    this.setupIndexDots(numberOfSlides);
  },
  
  generateButton (itemObject) {
    const button = document.createElement('button');
    button.className = itemObject.Item;
    button.classList.add("user-input-button");
    button.innerText = itemObject.Item;
    button.addEventListener('click', () => {
      this.handleItemSelect(itemObject);
    })
    return button;
  },

  handleItemSelect (itemObject) {
    this.meal.pushItem(itemObject);
    const ul = document.createElement('ul')
    const button = document.createElement('button');
    button.className = itemObject.Item;
    button.classList.add("user-input-button");
    button.innerText = itemObject.Item;
    this.selectedItemsDisplay.appendChild(button);
    button.addEventListener('click', () => {
      this.meal.popItem(itemObject);
      this.selectedItemsDisplay.removeChild(button);
    })
  },

  clearItemsDisplay () {
    while (this.selectedItemsDisplay.firstChild) this.selectedItemsDisplay.removeChild(this.selectedItemsDisplay.firstChild);
  },

  setupPrevAndNextButtons () {
    const prevButton = document.createElement('a');
    prevButton.className = 'prev';
    prevButton.addEventListener('click', () => this.incrementSlide(-1));
    prevButton.innerText = '<';
    const nextButton = document.createElement('a');
    nextButton.className = 'next';
    nextButton.addEventListener('click', () => this.incrementSlide(1));
    nextButton.innerText = '>';
    this.slideshowWrapper.appendChild(prevButton);
    this.slideshowWrapper.appendChild(nextButton);
  },

  setupIndexDots (num) {
    const indexDots = document.createElement('div');
    for (let i = 1; i <= num; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.addEventListener('click', () => this.currentSlide(i));
      indexDots.appendChild(dot);
    }
    this.slideshowWrapper.appendChild(indexDots);
  },

  incrementSlide (num) {
    this.slideIdx += num;
    this.displaySlide(this.slideIdx);
  },

  currentSlide (num) {
    this.slideIdx -= num;
    this.displaySlide(this.slideIdx);
  },

  displaySlide (num) {
    let slides = document.getElementsByClassName('slide-div');
    let dots = document.getElementsByClassName('dot');

    if (num > slides.length) this.slideIdx = 1;
    if (num < 1) { this.slideIdx = slides.length };

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[this.slideIdx-1].style.display = "flex";
    dots[this.slideIdx-1].className += " active";
  }
}