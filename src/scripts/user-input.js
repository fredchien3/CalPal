import cava from '/src/foods/cava.json'

export const userInput = {
  initialize (meal) {
    this.meal = meal;
    this.userInputSlideshowWrapper = document.getElementById('slideshow-wrapper');
    this.selectedItemsDisplay = document.getElementById('selected-items-display');

    this.userInputSlideIdx = 1;
    this.welcomeSlideIdx = 1;
    this.setupUserInputSlides();
    this.displaySlide(this.userInputSlideIdx);
    this.displaySlide(this.welcomeSlideIdx, true)
    this.resetButton = document.getElementById('reset-meal');
    this.resetButton.addEventListener('click', () => {
      meal.reset();
      this.clearItemsDisplay();
    })
  },

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
    this.selectedItemsDisplay.scrollTop = this.selectedItemsDisplay.scrollHeight;
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
    const leftIcon = document.createElement('i');
    leftIcon.className = 'fa-solid fa-caret-left'
    prevButton.appendChild(leftIcon);
    prevButton.addEventListener('click', () => this.incrementSlide(-1));
    const nextButton = document.createElement('a');
    nextButton.className = 'next';
    const rightIcon = document.createElement('i');
    rightIcon.className = 'fa-solid fa-caret-right'
    nextButton.appendChild(rightIcon);
    nextButton.addEventListener('click', () => this.incrementSlide(1));
    this.userInputSlideshowWrapper.appendChild(prevButton);
    this.userInputSlideshowWrapper.appendChild(nextButton);

    document.getElementById('welcome-prev').addEventListener('click', () => this.incrementSlide(-1, true))
    document.getElementById('welcome-next').addEventListener('click', () => this.incrementSlide(1, true))
  },

  setupIndexDots (num) {
    const userInputIndexDots = document.createElement('div');
    userInputIndexDots.className = 'dots-wrapper';
    for (let i = 1; i <= num; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.addEventListener('click', () => this.currentSlide(i));
      userInputIndexDots.appendChild(dot);
    }
    this.userInputSlideshowWrapper.appendChild(userInputIndexDots);

    const welcomeDots = document.getElementsByClassName('welcome-dot');
    for (let i = 0; i < 4; i++) {
      console.log(welcomeDots[i])
      welcomeDots[i].addEventListener('click', () => this.currentSlide(i+1, true));
    }
  },

  incrementSlide (num, welcome = false) {
    if (welcome) {
      this.welcomeSlideIdx += num;
      this.displaySlide(this.welcomeSlideIdx, true)
    } else {
      this.userInputSlideIdx += num;
      this.displaySlide(this.userInputSlideIdx);
    }
  },

  currentSlide (num, welcome = false) {
    if (welcome) {
      this.welcomeSlideIdx = num;
      this.displaySlide(this.welcomeSlideIdx, true)
    } else {
      this.userInputSlideIdx = num;
      this.displaySlide(this.userInputSlideIdx);
    }
  },

  displaySlide (num, welcome = false) {
    if (welcome) {
      let slides = document.getElementsByClassName('welcome-slide-div');
      let dots = document.getElementsByClassName('welcome-dot')

      if (num > slides.length) this.welcomeSlideIdx = 1;
      if (num < 1) { this.welcomeSlideIdx = slides.length };

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" welcome-active", "");
      }
      
      slides[this.welcomeSlideIdx-1].style.display = "flex";
      dots[this.welcomeSlideIdx-1].className += " welcome-active";
    } else {
      let slides = document.getElementsByClassName('user-input-slide-div');
      let dots = document.getElementsByClassName('dot');
      
      if (num > slides.length) this.userInputSlideIdx = 1;
      if (num < 1) { this.userInputSlideIdx = slides.length };
      
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      
      slides[this.userInputSlideIdx-1].style.display = "flex";
      dots[this.userInputSlideIdx-1].className += " active";
    }
  }
}