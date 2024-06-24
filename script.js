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

// Inițializează Firebase
firebase.initializeApp(firebaseConfig);

// Referință către baza de date
const database = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
    loadOrders();

    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const order = {
            date: new Date().toISOString(),
            clientName: document.getElementById('clientName').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            orderDetails: document.getElementById('orderDetails').value,
            cost: document.getElementById('cost').value,
            paymentStatus: document.getElementById('paymentStatus').value,
            paymentMethod: document.getElementById('paymentMethod').value
        };
        addOrder(order);
        this.reset();
    });
});

function addOrder(order) {
    database.ref('orders').push(order)
        .then(() => {
            console.log('Order added successfully');
        })
        .catch((error) => {
            console.error('Error adding order: ', error);
        });
}

function loadOrders() {
    database.ref('orders').on('value', (snapshot) => {
        const orders = snapshot.val();
        displayOrders(orders);
    }, (error) => {
        console.error('Error loading orders: ', error);
    });
}

function displayOrders(orders) {
    const orderList = document.getElementById('orderList');
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
}
