// nav bar toggle
let nav1 = document.getElementById("nav1");
let menu = document.getElementById("menu");
menu.onclick = () => {
        nav1.classList.toggle('activ');
}



let order = document.getElementById('order');
console.log(order)
let role = sessionStorage.getItem('roleId')
console.log(role);
if (role == 3) {
        order.addEventListener('click', (e) => {
                window.location.href = 'Orders/orders.html';
        });
}else{
        order.addEventListener('click', (e) => {
                window.location.href = 'OrdersRenter/OrdersRenter.html';
        }); 
}