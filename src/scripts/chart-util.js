import Chart from 'chart.js/auto';

export const chartUtil = {
  setupChart (meal) {
    this.meal = meal;
    this.macroCtx = document.getElementById('macros-chart').getContext('2d');
    this.macroData = this.meal.macros();
    this.labels = ['Protein', 'Fat', 'Carbs'];
    this.backgroundColor = ['pink', 'yellow', 'lightblue'];
    this.borderColor = ['red', 'orange', 'blue'];
    this.setDoughnut();
    this.setupToggleChart();
    this.selectedItems = document.getElementById('selected-item');
  },

  refresh () {
    this.macroChart.data.datasets[0].data = this.meal.macros();
    this.macroChart.update();
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
      this.setDoughnut();
    } else {
      this.setBar();
    }
  },

  setBar () {
    this.macroChart = new Chart(this.macroCtx, {
      type: 'bar',
      data: {
        labels: this.labels,
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
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
  },

  setDoughnut () {
    this.macroChart = new Chart(this.macroCtx, {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [{
            label: 'macros',
            data: this.meal.macros(),
            backgroundColor: this.backgroundColor,
            borderColor: this.backgroundColor,
            borderRadius: 50,
            hoverBorderColor: this.borderColor,
            hoverBorderWidth: 10,
            // hoverOffset: 10,
          }]
        },
        options: {
          cutout: '50%',
          radius: '75%',
          rotation: 225
      }
    });
  }
}