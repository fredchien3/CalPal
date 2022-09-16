import Chart from 'chart.js/auto';

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector('body');
  // const test = document.createElement('p');
  // test.innerText = "Hello world!";
  // body.appendChild(test);
  const ctx = document.getElementById('macroChart').getContext('2d');
  const macroData = [12, 19, 3] // protein, fat, carbs
  const macroPolarChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [{
            label: 'foodProtein',
            data: macroData,
            backgroundColor: [
              'red',
              'yellow',
              'blue'
            ],
            borderColor: [
              'red',
              'yellow',
              'blue'
            ],
            borderWidth: 1
        }]
    }
  });
})