async function fetchFoodData() {
    try {
        const mealCount = 20; 
        const foodList = document.getElementById('foodList');
        
        foodList.innerHTML = '';

        for (let i = 0; i < mealCount; i++) {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();

            const meal = data.meals[0];

            const foodItem = document.createElement('div');
            foodItem.classList.add('foodItem');
            
            foodItem.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strInstructions.slice(0, 100)}...</p> <!-- Showing first 100 characters of instructions -->
                <a href="${meal.strSource}" target="_blank">View Full Recipe</a>
            `;
            
            foodList.appendChild(foodItem);
        }
    } catch (error) {
        console.error('Error fetching food data:', error);
    }
}


document.addEventListener('DOMContentLoaded', fetchFoodData);

const slider = document.getElementById('imageSliders');
const images = slider.getElementsByTagName('img');
let currentIndex = 0;
  
function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(nextSlide,6000); 
const button = document.getElementById('Clickbutton');

const foodApiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'; 

button.addEventListener('click', function() {
    const newWindow = window.open('', '_blank');

    fetch(foodApiUrl)
        .then(response => response.json()) 
        .then(data => {
            if (data.meals) {
                const foodItems = data.meals;
                newWindow.document.write('<html><head><title>Order Food</title><link rel="stylesheet" href="style.css"></head><body>');
                newWindow.document.write('<h1>Available Foods</h1>');
                
                foodItems.forEach(item => {
                    newWindow.document.write(`
                        <div class="food-item">
                            <img src="${item.strMealThumb}" alt="${item.strMeal}">
                            <h3>${item.strMeal}</h3>
                            <button onclick="orderFood('${item.strMeal}')">Order Now</button>
                        </div>
                    `);
                });

                newWindow.document.write('</body></html>');
            } else {
                newWindow.document.write('<p>No food items found.</p>');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            newWindow.document.write('<p>There was an error fetching food items.</p>');
        });
});

function orderFood(foodName) {
    alert(`You have ordered: ${foodName}`);
}




var videoId = '4aZr5hZXP_s'; 

function onYouTubeIframeAPIReady() {
  var player = new YT.Player('youtube', {
    videoId: videoId, 
    playerVars: {
      autoplay: 1,     
      loop: 1,         
      rel: 0,          
      playlist: videoId
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.Video();  
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    console.log('Video has ended');
  }
}