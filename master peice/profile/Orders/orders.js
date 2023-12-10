// nav bar toggle
let nav1=document.getElementById("nav1");
let menu =document.getElementById("menu");
menu.onclick=()=>{
        nav1.classList.toggle('activ');
}

   let isLoggedIn=sessionStorage.getItem("isLoggedin");
   let role=sessionStorage.getItem("roleId")
   if(isLoggedIn!="true"){
        window.location.href="/login/login.html";
        alert("login please");
   }else if(isLoggedIn=="true"&&role==2){
        window.location.href="/profile/OrdersRenter/OrdersRenter.html"
   }
  
  let name11=document.getElementById('name');
     name11.textContent=sessionStorage.getItem('name')

   // Fetch user ID from sessionStorage
   const userId = sessionStorage.getItem('userId');

   // Fetch data from the API
   fetch(`http://127.0.0.1:8000/api/rents/${userId}`)
       .then(response => response.json())
       .then(rentData => {
           // Populate HTML structure for each rent
           rentData.forEach(rent => {
               // Extract only the date part
               const startDate = rent.start.split(' ')[0];
               const endDate = rent.end.split(' ')[0];

               var rentHtml = `
                   <div class="card" data-rent-id="${rent.id}">
                       <img src="http://127.0.0.1:8000/car/img/${rent.img}" class="card-img" alt="Car Image">
                       <div class="card-body">
                           <h3>${rent.brand}</h3>
                           <p><strong>Landlord:</strong>${rent.landlord}</p>
                           <p><strong>Rental Date:</strong>${startDate}</p>
                           <p><strong>Return Date:</strong>${endDate}</p>
                           <p><strong>Transmission:</strong>${rent.gear}</p>
                           <p><strong>Fuel Type:</strong>${rent.fuel_type}</p>
                           <p><strong>Location:</strong>${rent.location}</p>
                           <p><strong>Driver:</strong>${rent.withDriver}</p>
                           <p><strong>Cost:</strong>${rent.total_price} JD</p>
                           <p class="status ${rent.status.toLowerCase()}">${rent.status}</p>
                           <div class="actions">
                               <i class="fa-solid fa-trash delete ${rent.status.toLowerCase() == 'accepted' ? 'invisible' : ''}" onclick="deleteRent(${rent.id})"></i>
                           </div>
                       </div>
                   </div>
               `;

               // Append the rentHtml to the rentsContainer
               document.getElementById('rentsContainer').innerHTML += rentHtml;
           });
       })
       .catch(error => console.error('Error fetching rents:', error));

       fetch(`http://127.0.0.1:8000/api/rejects/${userId}`)
       .then(response => response.json())
       .then(rentData => {
           // Populate HTML structure for each rent
           rentData.forEach(rent => {
               // Extract only the date part
               const startDate = rent.start.split(' ')[0];
               const endDate = rent.end.split(' ')[0];

               var rentHtml = `
                   <div class="card" data-rent-id="${rent.id}">
                       <img src="http://127.0.0.1:8000/car/img/${rent.img}" class="card-img" alt="Car Image">
                       <div class="card-body">
                           <h3>${rent.brand}</h3>
                           <p><strong>Landlord:</strong>${rent.landlord}</p>
                           <p><strong>Rental Date:</strong>${startDate}</p>
                           <p><strong>Return Date:</strong>${endDate}</p>
                           <p><strong>Transmission:</strong>${rent.gear}</p>
                           <p><strong>Fuel Type:</strong>${rent.fuel_type}</p>
                           <p><strong>Location:</strong>${rent.location}</p>
                           <p><strong>Driver:</strong>${rent.withDriver}</p>
                           <p class="status ${rent.status.toLowerCase()}">${rent.status}</p>
                           <div class="actions">
                               <i class="fa-solid fa-trash delete ${rent.status.toLowerCase() == 'accepted' ? 'invisible' : ''}" onclick="deleteRent1(${rent.id})"></i>
                           </div>
                       </div>
                   </div>
               `;

               // Append the rentHtml to the rentsContainer
               document.getElementById('rentsContainer').innerHTML += rentHtml;
           });
       })
       .catch(error => console.error('Error fetching rents:', error));
       function deleteRent1(rentId) {
        
        // Perform the deletion using the API
        fetch(`http://127.0.0.1:8000/api/rejects/${rentId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted rent from the UI
                const cardToDelete = document.querySelector(`.card[data-rent-id="${rentId}"]`);
                if (cardToDelete) {
                    cardToDelete.remove();
                }
            } else {
                console.error('Error deleting rent:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting rent:', error));
    
}
   // Function to delete a rent by ID
   function deleteRent(rentId) {
        
           // Perform the deletion using the API
           fetch(`http://127.0.0.1:8000/api/rents/${rentId}`, {
               method: 'DELETE',
           })
           .then(response => {
               if (response.ok) {
                   // Remove the deleted rent from the UI
                   const cardToDelete = document.querySelector(`.card[data-rent-id="${rentId}"]`);
                   if (cardToDelete) {
                       cardToDelete.remove();
                   }
               } else {
                   console.error('Error deleting rent:', response.statusText);
               }
           })
           .catch(error => console.error('Error deleting rent:', error));
       
   }
   