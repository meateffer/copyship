// Configurația Firebase (înlocuiește cu detaliile tale de la Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDtHNk2IdYbw4pkjyKqcGORPAfJFE7p5qw",
  authDomain: "copyshop-b3085.firebaseapp.com",
  databaseURL: "https://copyshop-b3085-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "copyshop-b3085",
  storageBucket: "copyshop-b3085.appspot.com",
  messagingSenderId: "685394039842",
  appId: "1:685394039842:web:b53504809c81bb6988a67b"
};

console.log('Script starting');

// Inițializează Firebase
firebase.initializeApp(firebaseConfig);

// Referință către baza de date
const database = firebase.database();

function initApp() {
    console.log('Initializing app');
    const orderForm = document.getElementById('orderForm');
    console.log('orderForm found:', !!orderForm);

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            const order = {
                date: new Date().toISOString(),
                clientName: document.getElementById('clientName')?.value || '',
                phoneNumber: document.getElementById('phoneNumber')?.value || '',
                orderDetails: document.getElementById('orderDetails')?.value || '',
                cost: document.getElementById('cost')?.value || '',
                paymentStatus: document.getElementById('paymentStatus')?.value || '',
                paymentMethod: document.getElementById('paymentMethod')?.value || ''
            };
            console.log('Order data:', order);
            addOrder(order);
            this.reset();
        });
    } else {
        console.error('Order form not found');
    }

    loadOrders();
}

function addOrder(order) {
    console.log('Adding order:', order);
    database.ref('orders').push(order)
        .then(() => {
            console.log('Order added successfully');
        })
        .catch((error) => {
            console.error('Error adding order:', error);
        });
}

function loadOrders() {
    console.log('Loading orders');
    database.ref('orders').on('value', (snapshot) => {
        const orders = snapshot.val();
        console.log('Orders loaded:', orders);
        displayOrders(orders);
    }, (error) => {
        console.error('Error loading orders:', error);
    });
}

function displayOrders(orders) {
    console.log('Displaying orders');
    const orderList = document.getElementById('orderList');
    if (!orderList) {
        console.error('Order list element not found');
        return;
    }

    let html = `<table>
        <tr>
            <th>Data</th>
            <th>Client</th>
            <th>Telefon</th>
            <th>Detalii</th>
            <th>Cost</th>
            <th>Status Plată</th>
            <th>Metodă Plată</th>
        </tr>`;
    
    for (let key in orders) {
        const order = orders[key];
        html += `<tr>
            <td>${new Date(order.date).toLocaleString()}</td>
            <td>${order.clientName}</td>
            <td>${order.phoneNumber}</td>
            <td>${order.orderDetails}</td>
            <td>${order.cost} RON</td>
            <td>${order.paymentStatus}</td>
            <td>${order.paymentMethod}</td>
        </tr>`;
    }
    
    html += '</table>';
    orderList.innerHTML = html;
    console.log('Orders displayed');
}

document.addEventListener('DOMContentLoaded', initApp);
console.log('Script loaded');
