//grab the HTML elements
const productContainer = document.querySelector(".product-container");
const cartBtn = document.getElementById("cart-btn");
const modalElem = document.getElementById("cart-modal");
const cartCountElem = document.getElementById("cart-count");

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
            </div>
        `
    }).join("");
    productContainer.innerHTML = productCard;
}
//load products when the page loads and the document finishes parsing
document.addEventListener("DOMContentLoaded", fetchProducts);