import { chartUtil } from "./scripts/chartUtil"

document.addEventListener("DOMContentLoaded", () => {
  chartUtil.setupChart();
  const toggleMacroChart = document.getElementById('toggleMacroChart');
  toggleMacroChart.addEventListener('click', () => {
    chartUtil.toggleChart();
  });
})