// nav bar toggle
let nav1=document.getElementById("nav1");
let menu =document.getElementById("menu");
menu.onclick=()=>{
        nav1.classList.toggle('activ');
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
                const option = document.createElement("INPUT");
            const label = document.createElement("LABEL");

            // Set checkbox attributes
            option.setAttribute("type", "checkbox");
            option.value = item.id;

            // Set label text
            label.textContent = item.name;

            // Append checkbox and label to select
            selectBrands.appendChild(option);
            selectBrands.appendChild(label);
            selectBrands.appendChild(document.createElement("br"));

            // Optionally, you can associate the label with the checkbox
            label.htmlFor = option.id;
                });
            })
            .catch(error => console.error('Error fetching brands data:', error));
    
        // Fetch locations data from the API
        fetch('http://127.0.0.1:8000/api/locations/')
            .then(response => response.json())
            .then(data => {
                // Populate brands select
                data.forEach(item => {
             const option = document.createElement("INPUT");
            const label = document.createElement("LABEL");

            // Set checkbox attributes
            option.setAttribute("type", "checkbox");
            option.value = item.id;

            // Set label text
            label.textContent = item.name;

            // Append checkbox and label to select
            selectLocation.appendChild(option);
            selectLocation.appendChild(label);
            selectLocation.appendChild(document.createElement("br"));

            // Optionally, you can associate the label with the checkbox
            label.htmlFor = option.id;
                });
            })
            .catch(error => console.error('Error fetching locations data:', error));
    });