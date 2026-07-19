let charts = [];

async function fetchTraffic() {
  const city = document.getElementById("cityInput").value || "Pune";

  const res = await fetch(`http://localhost:3000/api/traffic?city=${city}`);
  const data = await res.json();

  document.getElementById("cityName").innerText = city;
  document.getElementById("totalCount").innerText = data.length;
  document.getElementById("updated").innerText =
    "Last updated: " + new Date().toLocaleTimeString();

  // City Image
  const img = document.getElementById("cityImg");

  if (city.toLowerCase() === "pune")
    img.src = "images/pune.jpg";
  else if (city.toLowerCase() === "mumbai")
    img.src = "images/mumbai.jpg";
  else
    img.src = "";

  renderCharts(data);
}

function renderCharts(data) {

  // Destroy old charts before creating new ones
  charts.forEach(c => c.destroy());
  charts = [];

  const vehicle = {};
  const congestion = {};
  const days = {};
  const timeData = {};

  data.forEach(d => {
    vehicle[d.vehicle_type] = (vehicle[d.vehicle_type] || 0) + d.count;
    congestion[d.congestion_level] = (congestion[d.congestion_level] || 0) + 1;
    days[d.day] = (days[d.day] || 0) + d.count;
    timeData[d.time] = (timeData[d.time] || 0) + d.count;
  });

  // 1️⃣ Bar Chart - Vehicles by Type
  charts.push(new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: Object.keys(vehicle),
      datasets: [{
        label: "Vehicle Count",
        data: Object.values(vehicle)
      }]
    }
  }));

  // 2️⃣ Line Chart - Traffic Over Time
  charts.push(new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: data.map(d => d.time),
      datasets: [{
        label: "Traffic",
        data: data.map(d => d.count),
        fill: true
      }]
    }
  }));

  // 3️⃣ Pie Chart - Congestion Levels
  charts.push(new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: Object.keys(congestion),
      datasets: [{
        label: "Congestion",
        data: Object.values(congestion)
      }]
    }
  }));

  // 4️⃣ Doughnut Chart - Day Wise Traffic
  charts.push(new Chart(document.getElementById("doughnutChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(days),
      datasets: [{
        label: "Day Traffic",
        data: Object.values(days)
      }]
    }
  }));

  // 5️⃣ Radar Chart - Vehicle Comparison
  charts.push(new Chart(document.getElementById("radarChart"), {
    type: "radar",
    data: {
      labels: Object.keys(vehicle),
      datasets: [{
        label: "Vehicle Comparison",
        data: Object.values(vehicle)
      }]
    }
  }));

  // 6️⃣ NEW Bar Chart - Traffic Count by Time
  charts.push(new Chart(document.getElementById("timeBarChart"), {
    type: "bar",
    data: {
      labels: Object.keys(timeData),
      datasets: [{
        label: "Traffic Count by Time",
        data: Object.values(timeData)
      }]
    }
  }));
}

fetchTraffic();
