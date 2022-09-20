import Chart from 'chart.js/auto';

export const chartUtil = {
  setupChart (meal) {
    this.setInstanceVariables(meal);
    this.setMacroDoughnut();
    this.setupToggleChart();
    this.renderGramMicros();
    this.renderMilligramMicros();
    this.resetButton = document.getElementById('reset-meal');
    this.resetButton.addEventListener('click', () => meal.reset())
  },

  setInstanceVariables (meal) {
    this.meal = meal;

    this.calorieCount = document.getElementById('calorie-count');

    this.macroCtx = document.getElementById('macros-chart').getContext('2d');
    this.macroLabels = ['Protein', 'Fat', 'Carbs'];

    this.gramMicrosCtx = document.getElementById('gram-micros-chart').getContext('2d');
    this.gramMicrosLabels = ['Fiber', 'Sugar'];
    
    this.milligramMicrosCtx = document.getElementById('milligram-micros-chart').getContext('2d');
    this.milligramMicrosLabels = ['Cholestrol', 'Sodium'];

    this.backgroundColor = ['pink', 'yellow', 'lightblue'];
    this.borderColor = ['red', 'orange', 'blue'];
  },

  refreshAll () {
    this.calorieCount.innerText = this.meal.totalCals;
    this.macroChart.data.datasets[0].data = this.meal.macros();
    this.gramMicrosChart.data.datasets[0].data = this.meal.gramMicros();
    this.milligramMicrosChart.data.datasets[0].data = this.meal.milligramMicros();
    this.macroChart.update();
    this.gramMicrosChart.update();
    this.milligramMicrosChart.update();
  },

  setupToggleChart () {
    const toggleMacroChart = document.getElementById('toggle-macros-chart');
    toggleMacroChart.addEventListener('click', () => {
      this.toggleChart();
    });
  },

  toggleChart () {
    const type = this.macroChart.config.type;
    this.macroChart.destroy();
    if (type === "bar") {
      this.setMacroDoughnut();
    } else {
      this.setMacroBar();
    }
  },

  setMacroBar () {
    this.macroChart = new Chart(this.macroCtx, {
      type: 'bar',
      data: {
        labels: this.macroLabels,
        datasets: [{
            label: '',
            data: this.meal.macros(),
            backgroundColor: this.backgroundColor,
            borderColor: this.backgroundColor,
            hoverBorderColor: this.borderColor,
            hoverBorderWidth: 10,
            barThickness: 35,
            borderRadius: 50,
        }]
      },
      options: {
        plugins: { 
          legend: {
            display: false,
          }
        }
      }
    });
  },

  setMacroDoughnut () {
    this.macroChart = new Chart(this.macroCtx, {
      type: 'doughnut',
      data: {
        labels: this.macroLabels,
        datasets: [{
            label: 'macros',
            data: this.meal.macros(),
            backgroundColor: this.backgroundColor,
            borderColor: this.backgroundColor,
            hoverBorderColor: this.borderColor,
            hoverBorderWidth: 10,
            borderRadius: 50,
          }]
        },
        options: {
          cutout: '50%',
          radius: '75%',
          rotation: 225
      }
    });
  },

  renderGramMicros () {
    this.gramMicrosChart = new Chart(this.gramMicrosCtx, {
      type: 'bar',
      data: {
        labels: this.gramMicrosLabels,
        datasets: [{
          label: 'fiber and sugar',
          data: this.meal.gramMicros(),
          backgroundColor: 'red',
          barThickness: 5,
        }]
      },
      options: {
        plugins: { 
          legend: {
            display: false,
          }
        }
      }
    })
  },

  renderMilligramMicros () {
    this.milligramMicrosChart = new Chart(this.milligramMicrosCtx, {
      type: 'bar',
      data: {
        labels: this.milligramMicrosLabels,
        datasets: [{
          label: 'cholestrol and sodium',
          data: this.meal.milligramMicros(),
          backgroundColor: 'red',
          barThickness: 5,
        }]
      },
      options: {
        plugins: { 
          legend: {
            display: false,
          }
        }
      }
    })
  }
}