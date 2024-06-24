// Configurația Firebase (înlocuiește cu detaliile tale de la Firebase)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
            client: document.getElementById('client').value,
            details: document.getElementById('details').value,
            price: document.getElementById('price').value
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
    let html = '<table><tr><th>Data</th><th>Client</th><th>Detalii</th><th>Preț</th></tr>';
    
    for (let key in orders) {
        const order = orders[key];
        html += `<tr>
            <td>${new Date(order.date).toLocaleString()}</td>
            <td>${order.client}</td>
            <td>${order.details}</td>
            <td>${order.price}</td>
        </tr>`;
    }
    
    html += '</table>';
    orderList.innerHTML = html;
}
