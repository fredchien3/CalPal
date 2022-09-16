import Chart from 'chart.js/auto';

export const chartUtil = {
  setupChart () {
    this.macroCtx = document.getElementById('macroChart').getContext('2d');
    this.macroData = [81.1, 18.3, 127.8] // protein, fat, carbs
    this.backgroundColor = ['pink', 'yellow', 'lightblue']
    this.borderColor = ['pink', 'yellow', 'lightblue']
    chartUtil.setDoughnut();
  },
  toggleChart () {
    this.macroChart.destroy();
    const type = this.macroChart.config.type;
    if (type === "bar") {
      chartUtil.setDoughnut();
    } else {
      chartUtil.setBar();
    }
  },
  setBar () {
    this.macroChart = new Chart(this.macroCtx, {
      type: 'bar',
      data: {
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [{
            label: '1',
            data: this.macroData,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1,
            barThickness: 50
        }]
        
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
            borderColor: this.borderColor,
            borderWidth: 1
        }]
      }
    });
  }
}