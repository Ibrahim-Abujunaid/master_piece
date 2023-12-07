let nav1=document.getElementById("nav1");
let menu =document.getElementById("menu");
menu.onclick=()=>{
        nav1.classList.toggle('activ');
}
function validateSignupForm() {
    var name = document.getElementById("name").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var ageCheckbox = document.getElementById("ageCheckbox").checked;
    var userRadio = document.getElementById("userRadio").checked;
    var renterRadio = document.getElementById("renterRadio").checked;
    var errorElement = document.getElementById("signupError");

    // Simple name validation
    if (!name || !name.match(/^[A-Za-z ]+$/)) {
        errorElement.textContent = "Invalid name";
        return;
    }

    // Simple phone number validation
    if (!phoneNumber || !phoneNumber.match(/^[0-9]+$/)) {
        errorElement.textContent = "Invalid phone number";
        return;
    }

    // Simple email validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorElement.textContent = "Invalid email address";
        return;
    }

    // Simple password length validation
    if (!password || password.length < 6 || password.length > 18) {
        errorElement.textContent = "Password must be between 6 and 18 characters";
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorElement.textContent = "Passwords do not match";
        return;
    }

    // Check if the age checkbox is checked
    if (!ageCheckbox) {
        errorElement.textContent = "You must be above 18 years old";
        return;
    }

    // Check if either user or renter radio button is selected
    if (!userRadio && !renterRadio) {
        errorElement.textContent = "Please select a user type";
        return;
    }

    // Clear any previous error messages
    errorElement.textContent = "";

    // Create the data object to be sent to the server
    var data = {
        name: name,
        email: email,
        phone: phoneNumber,
        password: password,
        role_id: userRadio ? 2 : 3  // Assuming 2 for User and 3 for Renter
    };

    // Fetch API to post data to the server
    fetch('http://127.0.0.1:8000/api/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, /",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server, e.g., show success message or redirect
        console.log(data);
        window.location.href = "../login/login.html"; // Redirect on success
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
        errorElement.textContent = "An error occurred. Please try again later.";
    });
}
