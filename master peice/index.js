// nav bar toggle
let nav1 = document.getElementById("nav1");
let menu = document.getElementById("menu");
menu.onclick = () => {
  nav1.classList.toggle('activ');
}
//       counter
let valueDisplays = document.querySelectorAll('.num');
let interval = 1000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute('data-value'));

  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

let signupButtonNav = document.getElementById('addBtn');

let loginButtonNav = document.getElementById('loginbtn');

// Check if the user is logged in
const Role = sessionStorage.getItem('roleId');
const isLoggedIn = sessionStorage.getItem('isLoggedin');
if (isLoggedIn == 'true' && Role == 1) {
  loginButtonNav.textContent = 'Dashboard';
  loginButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = 'admin';
  });
  signupButtonNav.textContent = 'Log out';
  signupButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = 'index.html';
    sessionStorage.clear();
  });

} else if (isLoggedIn === 'true') {
  // Change text and behavior for logged-in users
  signupButtonNav.textContent = 'Profile';
  loginButtonNav.textContent = 'Log out';

  loginButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = '/index.html';
    sessionStorage.setItem("isLoggedin", "false");
  });

  signupButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = '/profile/profile.html';
  });
} else {
  signupButtonNav.addEventListener('click', (e) => {

    window.location.href = "signup.html"
  });

  loginButtonNav.addEventListener('click', (e) => {
    window.location.href = "/login/login.html"
  });
}

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