import Chart from 'chart.js/auto';

Chart.defaults.font.size = 12;
Chart.defaults.font.family = "'Noto Sans', sans-serif";
Chart.defaults.font.weight = 600;

Chart.defaults.plugins.tooltip.backgroundColor = '#f4effc';
Chart.defaults.plugins.tooltip.titleColor = 'black';
Chart.defaults.plugins.tooltip.bodyColor = 'black';

export const chartUtil = {
  setupChart (meal) {
    this.setInstanceVariables(meal);
    this.setMacroDoughnut();
    this.setupToggleChart();
    this.renderGramMicros();
    this.renderMilligramMicros();
  },

  setInstanceVariables (meal) {
    this.meal = meal;

    this.calorieCounter = document.getElementById('calorie-counter');
    this.proteinCounter = document.getElementById('protein-counter');
    this.fatCounter = document.getElementById('fat-counter');
    this.carbsCounter = document.getElementById('carbs-counter');

    this.macroCtx = document.getElementById('macros-chart').getContext('2d');
    this.macroLabels = ['Protein', 'Fat', 'Carbs'];

    this.gramMicrosCtx = document.getElementById('gram-micros-chart').getContext('2d');
    this.gramMicrosLabels = ['Fiber', 'Sugar'];
    
    this.milligramMicrosCtx = document.getElementById('milligram-micros-chart').getContext('2d');
    this.milligramMicrosLabels = ['Cholestrol', 'Sodium'];


    this.orangeish = '#ff6e6c';
    this.yellowish = '#fbdd74';
    this.purpleish = '#67568c';
    this.backgroundColor = [this.orangeish, this.yellowish, this.purpleish];
    this.borderColor = ['red', 'orange', 'darkblue'];
  },

  refreshAll () {
    this.calorieCounter.innerText = this.meal.totalCals;
    this.proteinCounter.innerText = this.meal.totalProtein;
    this.fatCounter.innerText = this.meal.totalFat;
    this.carbsCounter.innerText = this.meal.totalCarbs;
    this.macroChart.data.datasets[0].data = this.meal.macros();
    this.gramMicrosChart.data.datasets[1].data = this.meal.gramMicros();
    this.milligramMicrosChart.data.datasets[1].data = this.meal.milligramMicros();
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
            label: 'Macros',
            data: this.meal.macros(),
            backgroundColor: this.backgroundColor,
            borderColor: this.backgroundColor,
            hoverBorderColor: this.borderColor,
            hoverBorderWidth: 10,
            barThickness: 35,
            borderRadius: 5,
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
        radius: '90%',
        maintainAspectRatio: false,
        plugins: { 
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return (` ${ctx.label}: ${ctx.raw} g`)
              }
            }
          }
        }
      }
    });
  },

  renderGramMicros () {
    this.gramMicrosChart = new Chart(this.gramMicrosCtx, {
      type: 'bar',
      data: {
        labels: this.gramMicrosLabels,
        datasets: [
          {
            label: 'Recommended Daily (g)',
            data: [25, 50],
            backgroundColor: this.purpleish,
            barThickness: 15,
          },
          {
            label: 'Input (g)',
            data: this.meal.gramMicros(),
            barThickness: 10,
            backgroundColor: this.orangeish,
          }
        ]
      },
      options: {
        plugins: { 
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              title: () => {return ''},
              label: function (ctx) {
                return (` ${ctx.label}: ${ctx.raw} g`)
              }
            }
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
        datasets: [
          {
            label: 'Recommended Daily (mg)',
            data: [300, 2300],
            backgroundColor: this.purpleish,
            barThickness: 10,
          },
          {
            label: 'Input (mg)',
            data: this.meal.milligramMicros(),
            backgroundColor: this.orangeish,
            barThickness: 10,
          }
        ]
      },
      options: {
        plugins: { 
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              title: () => {return ''},
              label: function (ctx) {
                return (` ${ctx.label}: ${ctx.raw} mg`)
              }
            }
          }
        }
      }
    })
  }
}