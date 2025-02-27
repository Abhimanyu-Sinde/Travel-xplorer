async function fetchRecommendations() {
  try {
      const response = await fetch('travel_recommendation_api.json');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
  }
}

async function searchPlaces() {
  const query = document.getElementById('search').value.toLowerCase();
  const recommendations = await fetchRecommendations();
  const results = [];
  
  recommendations.forEach(country => {
      country.cities.forEach(city => {
          if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
              results.push(city);
          }
      });
  });
  
  displayResults(results);
}

function displayResults(results) {
  const list = document.getElementById('recommendation-list');
  list.innerHTML = '';
  
  if (results.length === 0) {
      list.innerHTML = '<p>No destinations found. Try another search!</p>';
      return;
  }
  
  results.forEach(place => {
      const item = document.createElement('div');
      item.classList.add('result-item');
      item.innerHTML = `
          <img src="${place.imageUrl}" alt="${place.name}" class="result-image">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <button class="visit-btn">Visit</button>
      `;
      list.appendChild(item);
  });
}

function clearResults() {
  document.getElementById('recommendation-list').innerHTML = '';
  document.getElementById('search').value = '';
}
