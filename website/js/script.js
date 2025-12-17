

/*alles voor button*/
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("wishlist-button")) {
    const button = event.target;

    if (button.classList.contains("active")) {
      button.classList.remove("active");
      button.style.backgroundColor = "";
    } else {
      button.classList.add("active");
      button.style.backgroundColor = "blue";
    }
  }
});

// Winkelwagen bijhouden
let cart = [];

// Product toevoegen aan de winkelwagen
function addToCart(productName, price, imageUrl) {
  // Controleer of het product al in de winkelwagen zit
  let product = cart.find(item => item.name === productName);

  if (product) {
    // Verhoog de hoeveelheid als het product al bestaat
    product.quantity += 1;
  } else {
    // Voeg een nieuw product toe aan de winkelwagen
    cart.push({ name: productName, price: price, image: imageUrl, quantity: 1 });
  }

  // Update de winkelwagen
  updateCart();
}

// Winkelwagen bijwerken
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  // Maak de lijst leeg
  cartItems.innerHTML = '';
  let total = 0;

  // Loop door elk product in de winkelwagen
  cart.forEach(product => {
    total += product.price * product.quantity;

    // Maak een lijstitem voor elk product
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="50" height="50" style="margin-right: 10px;">
      ${product.name} - €${product.price.toFixed(2)} x ${product.quantity}
      <button onclick="decreaseQuantity('${product.name}')">-</button>
      <button onclick="increaseQuantity('${product.name}')">+</button>
      <button class="remove-button" onclick="removeItem('${product.name}')">Verwijder</button>
    `;
    cartItems.appendChild(listItem);
  });

  // Update het totaalbedrag in de <span>
  cartTotal.textContent = total.toFixed(2);
}

// Hoeveelheid verhogen
function increaseQuantity(productName) {
  let product = cart.find(item => item.name === productName);

  if (product) {
    // Verhoog de hoeveelheid
    product.quantity += 1;
    updateCart();
  }
}

// Hoeveelheid verlagen
function decreaseQuantity(productName) {
  let product = cart.find(item => item.name === productName);

  if (product) {
    // Verlaag de hoeveelheid
    product.quantity -= 1;

    // Verwijder het product als de hoeveelheid 0 of minder is
    if (product.quantity <= 0) {
      cart = cart.filter(item => item.name !== productName);
    }

    updateCart();
  }
}

// Verwijder specifiek product
function removeItem(productName) {
  cart = cart.filter(item => item.name !== productName); // Verwijder het product
  updateCart();
}

// Checkout functie
function checkout() {
  if (cart.length === 0) {
    alert("Je winkelwagen is leeg!");
  } else {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Bedankt voor je aankoop! Totaalbedrag: €${total.toFixed(2)}`);
    cart = []; // Leeg de winkelwagen na het afrekenen
    updateCart();
  }
}
//  API opdracht.
const customersContainer = document.getElementById("users");

fetch("https://randomuser.me/api/?results=12")
  .then(resp => resp.json())
  .then(data => {
    let customers = data.results;

    customers.forEach(customer => {
      let customerCard = document.createElement("li");
      customerCard.className = "customer";

      customerCard.innerHTML = `
        <img src="${customer.picture.large}">
        <h3>${customer.name.title} ${customer.name.first} ${customer.name.last}</h3>
        <p>Land: ${customer.location.country}</p>`
        ;

      customersContainer.appendChild(customerCard);
    });
  }).catch(error => console.error("Fout:", error));


/*Leaflet opdracht*/
let map = L.map('map').setView([51.2287, 4.4177], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.2293, 4.4166]).addTo(map)
  .bindPopup('<b>Napelsstraat 70</b><br>2000 Antwerpen');

L.marker([51.2285, 4.4178]).addTo(map)
  .bindPopup('<b>Binnenvaartstraat 50</b><br>2000 Antwerpen');

L.marker([51.2311, 4.4201]).addTo(map)
  .bindPopup('<b>Kempenstraat 100</b><br>2030 Antwerpen');

