$(document).ready(function() {
    loadOrders();

    $('#orderForm').submit(function(e) {
        e.preventDefault();
        var order = {
            date: new Date().toISOString(),
            client: $('#client').val(),
            details: $('#details').val(),
            price: $('#price').val()
        };
        addOrder(order);
        this.reset();
    });
});

function loadOrders() {
    $.getJSON('data.json', function(data) {
        displayOrders(data);
    }).fail(function() {
        console.log("An error occurred while loading the orders.");
    });
}

function addOrder(order) {
    $.getJSON('data.json', function(data) {
        data.push(order);
        displayOrders(data);
        saveOrders(data);
    }).fail(function() {
        console.log("An error occurred while adding the order.");
    });
}

function displayOrders(orders) {
    var html = '<table><tr><th>Data</th><th>Client</th><th>Detalii</th><th>Preț</th></tr>';
    orders.forEach(function(order) {
        html += `<tr><td>${order.date}</td><td>${order.client}</td><td>${order.details}</td><td>${order.price}</td></tr>`;
    });
    html += '</table>';
    $('#orderList').html(html);
}

function saveOrders(orders) {
    // În mod normal, aici am salva datele pe server.
    // Pentru această demonstrație, vom afișa doar un mesaj.
    console.log("Orders saved:", orders);
    alert("Comandă adăugată! Pentru a salva permanent, fă un commit la GitHub.");
}
