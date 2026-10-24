//grab the HTML elements
const productContainer = document.querySelector(".product-container");
const cartBtn = document.getElementById("cart-btn");
const modalElem = document.getElementById("cart-modal");
const cartCountElem = document.getElementById("cart-count");
const closeBtn = document.querySelector(".close-btn");


let productArray = []
let cart = []

//create a functiion to feth store products from the free end point API
async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const productsArray = await response.json();
        console.log(productsArray);
        displayFetchedProducts(productsArray);
    } catch (error) {
        console.error("Error Fetching products:", error);
        productContainer.innerHTML = "<p>Failed to load products...</p>"
    }
}

//create a function to displa the products on the browser
function displayFetchedProducts(products) {
    const productCard = products.map((product) => {
        return `
            <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.slice(0, 65)}</p>
            <p class="price">$${product.price}</p>
            <button onclick="addToCart"(${product.id})"> Add to Cart</button>
            </div>
        `
    }).join("");
    productContainer.innerHTML = productCard;
}

//creat a function to add item to cart
function addToCart(productId) {
    const product = productArray.find((product) => product.id === productId);

    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCartInterface();
}

function updateCartInterface() {
    //calcuate the total cout
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElem.innerHTML = totalCartItems;

    //item list
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = cart.map((item) => {
        return `
            <div class="cart-items>
                <span>${item.tittle}...(x${item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `
    }).join("");
}

//click the cart button to toggle and display the content of the cart
function toggleCart() {
    document.getElementById("cart-modal").classList.toggle("hidden");
}
cartBtn.addEventListener("click", toggleCart);
closeBtn.addEventListener("click", toggleCart);
//load products when the page loads and the document finishes parsing
document.addEventListener("DOMContentLoaded", fetchProducts);