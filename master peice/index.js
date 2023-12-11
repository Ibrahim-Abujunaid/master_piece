// nav bar toggle
let nav1 = document.getElementById("nav1");
let menu = document.getElementById("menu");
menu.onclick = () => {
  nav1.classList.toggle('activ');
}
//       counter


 // Fetch data from the API
 fetch('http://127.0.0.1:8000/api/count')
 .then(response => response.json())
 .then(countData => {
    console.log(countData)
     // Update the HTML content with the retrieved data
     document.getElementById('counterContainer').innerHTML = `
         <div class="container">
             <img src="./img/icons/1.JPG" alt="">
             <span class="num" data-value="${countData.Cars}">${countData.Cars}</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Available Cars</span>
         </div>
         <div class="container">
             <img src="./img/icons/2.JPG" alt="">
             <span class="num" data-value="${countData.Client}">${countData.Client}</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Happy Clients</span>
         </div>
         <div class="container">
             <img src="./img/icons/3.JPG" alt="">
             <span class="num" data-value="${countData.CarWithDriver}">${countData.CarWithDriver}</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Car with Drivers</span>
         </div>
         <div class="container">
             <img src="./img/icons/4.JPG" alt="">
             <span class="num" data-value="30">0</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Years of Experience</span>
         </div>
     `;
     let valueDisplays = document.querySelectorAll('.num');
let interval = 1000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute('data-value'));

  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue >= endValue) {
      clearInterval(counter);
    }
  }, duration);
});
 })
 .catch(error => console.error('Error fetching count:', error));

 

document.addEventListener("DOMContentLoaded", function () {
  // Get the select elements
  var selectBrands = document.getElementById("brands");
  var selectLocation = document.getElementById("location");

  // Fetch brands data from the API
  fetch('http://127.0.0.1:8000/api/brands/')
      .then(response => response.json())
      .then(data => {
          // Populate brands select
          data.forEach(item => {
              var option = document.createElement("option");
              option.value = item.id;
              option.text = item.name;
              selectBrands.appendChild(option);
          });
      })
      .catch(error => console.error('Error fetching brands data:', error));

  // Fetch locations data from the API
  fetch('http://127.0.0.1:8000/api/locations/')
      .then(response => response.json())
      .then(data => {
          // Populate locations select
          data.forEach(item => {
              var option = document.createElement("option");
              option.value = item.id;
              option.text = item.name;
              selectLocation.appendChild(option);
          });
      })
      .catch(error => console.error('Error fetching locations data:', error));
});

fetch('http://127.0.0.1:8000/api/cars?withDriver=0')
.then(response => response.json())
.then(data => {
    // Limit the number of cars to display
    const carsToDisplay = data.slice(0, 4);
    
    // Populate the car container with fetched data
    populateCarContainer(carsToDisplay);
})
.catch(error => console.error('Error fetching data:', error));

function populateCarContainer(cars) {
const carContainer = document.getElementById('carContainer');

// Iterate through the cars and generate HTML for each card
cars.forEach(car => {
    const carCard = document.createElement('div');
    carCard.classList.add('arr-col');

    carCard.innerHTML = `
        <div class="img">
            <img src="http://127.0.0.1:8000/car/img/${car.img}" alt="${car.brand} Car">
        </div>
        <h5>${car.brand} Car</h5>
        <div class="rating">
            <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <div class="review">
                <span>${car.name}</span>
            </div>
        </div>
        <div class="features">
            <span><i class="fa-solid fa-location-dot"></i>${car.location}</span>
            <span><i class="fa-solid fa-gear"></i>${car.gear}</span>
            <span><i class="fa-solid fa-bolt"></i>${car.fuel_type}</span>
            <span><i class="fa-solid fa-car"></i>Car</span>
        </div>
        <div class="price">
            <p>${car.price_day}JD/Day</p>
            <a href='/SingleCar/SingleCar.html#${car.id}'><button>Rent Now</button></a>
        </div>
    `;

    carContainer.appendChild(carCard);
});
}

fetch('http://127.0.0.1:8000/api/cars?withDriver=1')
 .then(response => response.json())
 .then(data => {
     // Limit the number of cars to display
     const carsToDisplay = data.slice(0, 4);
     
     // Populate the car container with fetched data
     populateCarContainer1(carsToDisplay);
 })
 .catch(error => console.error('Error fetching data:', error));

function populateCarContainer1(cars) {
 const carContainer = document.getElementById('carContainer1');

 // Iterate through the cars and generate HTML for each card
 cars.forEach(car => {
     const carCard = document.createElement('div');
     carCard.classList.add('arr-col');

     carCard.innerHTML = `
         <div class="img">
             <img src="http://127.0.0.1:8000/car/img/${car.img}" alt="${car.brand} Car">
         </div>
         <h5>${car.brand} Car</h5>
         <div class="rating">
             <div class="stars">
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
             </div>
             <div class="review">
                 <span>${car.name}</span>
             </div>
         </div>
         <div class="features">
             <span><i class="fa-solid fa-location-dot"></i>${car.location}</span>
             <span><i class="fa-solid fa-gear"></i>${car.gear}</span>
             <span><i class="fa-solid fa-bolt"></i>${car.fuel_type}</span>
             <span><i class="fa-solid fa-car"></i>With driver</span>
         </div>
         <div class="price">
             <p>${car.price_day}JD/Day</p>
             <a href='/SingleCarWdriver/SingleCarWdriver.html#${car.id}'><button>Rent Now</button></a>
         </div>
     `;
    
     carContainer.appendChild(carCard);
 });
}

