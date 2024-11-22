// Login and Signup Button Event Handlers
const loginButton = document.getElementById('loginButtonL');
const signInButton = document.getElementById('signInButtonS');

if (loginButton) {
    loginButton.addEventListener('click', function() {
        window.location.href = 'login.html';  
    });
}

if (signInButton) {
    signInButton.addEventListener('click', function() {
        window.location.href = 'signup.html';  
    });
}

// Fetch Food Data
async function fetchFoodData() {
    try {
        const mealCount = 20;
        const foodList = document.getElementById('foodList');

        if (foodList) {
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
                    <p>${meal.strInstructions.slice(0, 100)}...</p>
                    <a href="${meal.strSource}" target="_blank">View Full Recipe</a>
                `;
                foodList.appendChild(foodItem);
            }
        }
    } catch (error) {
        console.error('Error fetching food data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchFoodData);

const slider = document.getElementById('imageSliders');
const images = slider ? slider.getElementsByTagName('img') : [];
let currentIndex = 0;

function nextSlide() {
    if (images.length > 0) {
        currentIndex = (currentIndex + 1) % images.length;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

if (images.length > 0) {
    setInterval(nextSlide, 1);
}
const button = document.getElementById('Clickbutton');
const foodApiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; 

let cart = [];

if (button) {
    button.addEventListener('click', function() {
        const newWindow = window.open('',);
        newWindow.document.write(`
            <html>
                <head>
                    <title>Order Food</title>
                    <link rel="stylesheet" href="style.css">
                    <style>
                       
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0fSQhOcHkUBvkBtmMzL3wD4gn-H4n5tgonQ&s'); 
                            background-size: cover;
                            background-position: center;
                            color: white;
                        }

                        h1 {
                            text-align: center;
                            font-size: 3rem;
                        }

                        .food-item {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;  
                            margin: 15px;
                            background: rgba(0, 0, 0, 0.6);
                            border-radius: 10px;
                            padding: 50px;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                            transition: transform 0.3s ease;
                            text-align: center; 
                        }

                        .food-item img {
                            width: 200px;  
                            height: auto;
                            object-fit: cover;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                        }

                        .food-item div h3 {
                            font-size: 1.5rem;
                            font-weight: bold;
                            margin-top: 10px;
                            text-align: center;
                        }

                        .food-item div p {
                            font-size: 1.2rem;
                            font-weight: bold;
                            color: #f39c12;
                            margin: 5px 0;
                            text-align: center;
                        }

                    @media (max-width: 768px) {
                        .food-item img {
                            width: 80%;  
                            max-width: 250px;  
                        }

                        .food-item div h3 {
                            font-size: 1.2rem;
                        }

                        .food-item div p {
                            font-size: 1rem;
                        }
                    }


                        .food-list {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-around;
                            padding: 20px;
                        }

                        .cart {
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            background-color: rgba(0, 0, 0, 0.7);
                            color: white;
                            padding: 15px;
                            border-radius: 8px;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                            width: 250px;
                        }

                        .cart h3 {
                            margin: 0;
                            font-size: 1.5rem;
                        }

                        .cart ul {
                            list-style-type: none;
                            padding: 0;
                        }

                        .cart ul li {
                            margin: 5px 0;
                            font-size: 1rem;
                        }

                        .cart button {
                            background-color: #28a745;
                            color: white;
                            border: none;
                            padding: 10px;
                            border-radius: 5px;
                            cursor: pointer;
                            width: 100%;
                        }

                        .cart button:hover {
                            background-color: #218838;
                        }

                        .order-btn {
                            background-color: #17a2b8;
                            padding: 10px 20px;
                            border: none;
                            color: white;
                            border-radius: 5px;
                            cursor: pointer;
                            margin-top: 10px;
                            width: 100%;
                            font-size: 16px;
                        }

                        .order-btn:hover {
                            background-color: #138496;
                        }
                    </style>
                </head>
                <body>
                    <h1>Available Foods</h1>
                    <div class="food-list" id="food-list"></div>
                    <div class="cart">
                        <h3>Cart</h3>
                        <ul id="cart-items"></ul>
                        <p>Total: $<span id="total-price">0.00</span></p>
                        <button id="checkout-btn">Checkout</button>
                        <button class="order-btn" id="order-btn">Order</button>
                    </div>
                    <script>
                        const cart = [];
                        let total = 0;
                        const foodList = document.getElementById('food-list');
                        const cartItems = document.getElementById('cart-items');
                        const totalPrice = document.getElementById('total-price');
                        const checkoutBtn = document.getElementById('checkout-btn');
                        const orderBtn = document.getElementById('order-btn');

                        function orderFood(foodName, foodPrice) {
                            cart.push({ name: foodName, price: foodPrice });
                            updateCart();
                            alert(foodName + ' has been added to your cart!');
                        }

                        function updateCart() {
                            cartItems.innerHTML = ''; // Clear cart items
                            total = 0;
                            cart.forEach(item => {
                                const listItem = document.createElement('li');
                                listItem.textContent = item.name + ' - $' + item.price.toFixed(2);
                                cartItems.appendChild(listItem);
                                total += item.price;
                            });
                            totalPrice.textContent = total.toFixed(2);
                        }

                        function checkout() {
                            alert('Total: $' + total.toFixed(2) + '. Thank you for your purchase!');
                            cart.length = 0;  // Clear the cart
                            updateCart();  // Update cart UI
                        }

                        // Fetch food data from API
                        fetch('${foodApiUrl}')
                            .then(response => response.json())
                            .then(data => {
                                if (data.meals) {
                                    // Display up to 50 food items
                                    let count = 0;
                                    data.meals.forEach(item => {
                                        if (count >= 50) return; // Limit to 50 items
                                        count++;

                                        const foodDiv = document.createElement('div');
                                        foodDiv.classList.add('food-item');

                                        // Simulated price (you can replace this with actual pricing logic)
                                        const foodPrice = (Math.random() * 20 + 10).toFixed(2);  // Price between $10 and $30

                                        foodDiv.innerHTML = \`
                                            <img src="\${item.strMealThumb}" alt="\${item.strMeal}">
                                            <div>
                                                <h3>\${item.strMeal}</h3>
                                                <p>Price: \$\${foodPrice}</p>
                                                <button onclick="orderFood('\${item.strMeal}', \${foodPrice})">Add to Cart</button>
                                            </div>
                                        \`;

                                        foodList.appendChild(foodDiv);
                                    });
                                } else {
                                    foodList.innerHTML = '<p>No food items found.</p>';
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching data:', error);
                                foodList.innerHTML = '<p>There was an error fetching food items.</p>';
                            });

                        // Checkout Button Event Listener
                        checkoutBtn.addEventListener('click', checkout);

                        // Order Button Event Listener
                        orderBtn.addEventListener('click', () => {
                            alert('Order confirmed! Proceeding to checkout.');
                            checkout();
                        });
                    </script>
                </body>
            </html>
        `);
    });
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
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    console.log('Video has ended');
  }
}

// Scroll to Top Button
let mybutton = document.getElementById("myBtn");

if (mybutton) {
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}
