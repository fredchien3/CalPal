import Chart from 'chart.js/auto';

export const chartUtil = {
  setupChart (meal) {
    this.meal = meal;
    this.macroCtx = document.getElementById('macroChart').getContext('2d');
    this.macroData = this.meal.macros();
    this.backgroundColor = ['pink', 'yellow', 'lightblue'];
    this.borderColor = ['red', 'orange', 'blue'];
    this.setDoughnut();
    this.setupToggleChart();
  },

  refresh () {
    this.macroChart.data.datasets[0].data = this.meal.macros();
    this.macroChart.update();
  },

  setupToggleChart () {
    const toggleMacroChart = document.getElementById('toggleMacroChart');
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
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [{
            label: '',
            data: this.macroData,
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
      }
    });
  },

  setDoughnut () {
    this.macroChart = new Chart(this.macroCtx, {
      type: 'doughnut',
      data: {
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [{
            label: 'macros',
            data: this.macroData,
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
          radius: '50%',
          rotation: 225
      }
    });
  }
}