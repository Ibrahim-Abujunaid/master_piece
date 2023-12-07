// nav bar toggle
let nav1 = document.getElementById("nav1");
let menu = document.getElementById("menu");
menu.onclick = () => {
    nav1.classList.toggle('activ');
}

// Function to toggle blur class on specified elements
function toggleBlur(isBlur) {
    const elementsToBlur = document.querySelectorAll('.header, .footer, section');
    elementsToBlur.forEach(element => {
        if (isBlur) {
            element.classList.add('blur');
        } else {
            element.classList.remove('blur');
        }
    });
}

// Function to toggle driver details pop-up
function toggleDriverPopup(isVisible) {
    const driverPopup = document.getElementById('driverPopup');
    if (isVisible) {
        driverPopup.style.display = 'block';
        toggleBlur(true); // Blur effect on pop-up display
    } else {
        driverPopup.style.display = 'none';
    }
}

// Add Car Form Script
document.getElementById('addCar').addEventListener('click', function () {
    document.getElementById('addCarForm').style.right = '0';
    toggleBlur(true); // Blur effect on form display
});

document.getElementById('closeForm').addEventListener('click', function () {
    document.getElementById('addCarForm').style.right = '-400px';
    toggleBlur(false); // Remove blur effect when form is closed
    toggleDriverPopup(false);

});

document.getElementById('driver').addEventListener('change', function () {
    // Check if the driver option is selected
    const driverOption = document.getElementById('driver');
    if (driverOption.value === "1") {
        toggleDriverPopup(true);
    } else {
        toggleDriverPopup(false);
    }
});

// Close the driver pop-up on clicking the close button
document.getElementById('closeDriverPopup').addEventListener('click', function () {
    toggleDriverPopup(false);
});

document.getElementById("submitDriverDetails").addEventListener('click', function () {
    // Add logic to submit driver details here

    // Close the driver popup after submitting details
    toggleDriverPopup(false);
});

function logout(){
    sessionStorage.clear();
    window.location.href="/index.html"
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
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and populate brands and locations options (similar to the previous example)
 
    // Car Form
    var addVehicleButton = document.getElementById("addVehicle");
    if (true) {
        addVehicleButton.addEventListener("click", function () {
            console.log("11")
            const carData = {
                "img": document.getElementById("carImage").value,
                "car_license": document.getElementById("CarLicense").value,
                "price_day": document.getElementById("cost").value,
                "withDriver": document.getElementById("driver").value === "1",
                "availability": true,
                "status": "pending",
                "brand_id": document.getElementById("brands").value,
                "owner_id": sessionStorage.getItem("userid"),
                "location_id": document.getElementById("location").value,
                "gear": document.getElementById("transmission").value,
                "fuel_type": document.getElementById("fuelType").value
            };
            console.log(carData);

            // Perform the POST request
            fetch('http://127.0.0.1:8000/api/cars', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json, text-plain, /",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify(carData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
                console.log('Car added successfully:', data);
            })
            .catch(error => console.error('Error adding car:', error));
        });
    }

    // Driver Form
    var submitDriverButton = document.getElementById("submitDriverDetails");
    if (submitDriverButton) {
        submitDriverButton.addEventListener("click", function () {
            // Prepare driver data
            const driverData = {
                "user_id": sessionStorage.getItem("userid"),
                "img": document.getElementById("driverImage").value,
                "driver_license": document.getElementById("driverLicense").value,
                "age": document.getElementById("driverAge").value
            };

            // Perform the POST request
            fetch('http://127.0.0.1:8000/api/drivers', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json, text-plain, /",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify(driverData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
                console.log('Driver details submitted successfully:', data);
            })
            .catch(error => console.error('Error submitting driver details:', error));
        });
    }
});