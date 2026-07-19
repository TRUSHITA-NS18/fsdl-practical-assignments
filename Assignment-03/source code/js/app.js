/* ================= PRODUCTS ================= */
const products = [
  // ===== Existing Products (UNCHANGED) =====
  { id: 1, name: "Men Casual Shirt", price: 999, category: "men", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { id: 2, name: "Women Kurti", price: 1499, category: "women", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4lXe_T6D205MGm9_yGRHruod51uVfREnX4w&w=400" },
  { id: 3, name: "Kids Party Wear", price: 799, category: "kids", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81Ta11q6KWHnubLWniyEbLrCH_nHp_30gmA&s" },
  { id: 4, name: "Men Sneakers", price: 2199, category: "men", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772" },
  { id: 5, name: "Women Handbag", price: 1799, category: "women", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUtGmypCAJVOmKLI_bZP0q4lk61FyLaW0diw&w=400" },

  // ===== Newly Added Products =====
  { id: 6, name: "Men Formal Blazer", price: 3499, category: "men", image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0" },
  { id: 7, name: "Men jacket", price: 1999, category: "men", image: "https://m.media-amazon.com/images/I/71zT0tJ2CjL._AC_UY1100_.jpg" },
  { id: 8, name: "Kids Sneakers", price: 1299, category: "kids", image: "https://trufflecollection.co.in/cdn/shop/files/TC-LKCAN4-RED_1_6e31510c-4905-414e-84f7-9a111684bb90_800x.jpg?v=1756387909" },
  { id: 9, name: "Men Wrist Watch", price: 2599, category: "men", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { id: 10, name: "Women Sandals", price: 1599, category: "women", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },

  // ===== Newly Added (2 More) =====
  { id: 11, name: "Women Denim Jacket", price: 2899, category: "women", image: "https://image.hm.com/assets/hm/01/22/012296fb34bf6032135318932fc106e28236b54c.jpg?imwidth=2160" },
  { id: 12, name: "Kids Hoodie", price: 999, category: "kids", image: "https://img.tatacliq.com/images/i13/437Wx649H/MP000000019486736_437Wx649H_202310021017041.jpeg" }
];


const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");

/* ================= LOAD PRODUCTS ================= */
function loadProducts(data) {
  if (!productList) return;
  productList.innerHTML = "";

  data.forEach(p => {
    productList.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card product-card h-100">
          <img src="${p.image}" class="card-img-top">
          <div class="card-body text-center">
            <h6>${p.name}</h6>
            <p class="fw-bold text-danger">₹${p.price}</p>
            <button class="btn btn-success btn-sm w-100 mb-2" onclick="buyNow(${p.id})">Buy Now</button>
            <button class="btn btn-primary btn-sm w-100" onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      </div>`;
  });
}

/* ================= SEARCH & FILTER ================= */
function filterCategory(cat) {
  if (cat === "all") loadProducts(products);
  else loadProducts(products.filter(p => p.category === cat));
}

document.getElementById("search")?.addEventListener("keyup", function () {
  const val = this.value.toLowerCase();
  loadProducts(products.filter(p => p.name.toLowerCase().includes(val)));
});

/* ================= CART ================= */
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(products.find(p => p.id === id));
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function loadCart() {
  if (!cartItems) return;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="text-center text-muted">Cart is empty</p>`;
    return;
  }

  cart.forEach((p, i) => {
    cartItems.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card cart-card h-100">
          <img src="${p.image}" class="card-img-top">
          <div class="card-body text-center">
            <input type="checkbox" class="form-check-input cart-check" value="${p.id}">
            <h6 class="mt-2">${p.name}</h6>
            <p class="fw-bold">₹${p.price}</p>
            <button class="btn btn-danger btn-sm w-100" onclick="removeFromCart(${i})">Remove</button>
          </div>
        </div>
      </div>`;
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

/* ================= BUY ================= */
function buyNow(id) {
  localStorage.setItem("pendingBuy", JSON.stringify([id]));
  window.location.href = "buy.html";
}

function cartBuyNow() {
  const selected = [...document.querySelectorAll(".cart-check:checked")]
    .map(cb => parseInt(cb.value));

  if (selected.length === 0) return alert("Select items");
  localStorage.setItem("pendingBuy", JSON.stringify(selected));
  window.location.href = "buy.html";
}

/* ================= BUY PAGE ================= */
// function loadBuyPage() {
//   const ids = JSON.parse(localStorage.getItem("pendingBuy")) || [];
//   const container = document.getElementById("orderItems");
//   const totalEl = document.getElementById("totalPrice");
//   if (!container) return;

//   let total = 0;
//   container.innerHTML = "";

//   ids.forEach(id => {
//     const p = products.find(x => x.id === id);
//     total += p.price;
//     container.innerHTML += `
//       <div class="d-flex justify-content-between">
//         <span>${p.name}</span>
//         <strong>₹${p.price}</strong>
//       </div>`;
//   });

//   totalEl.innerText = total;
// }
function loadBuyPage() {
  const ids = JSON.parse(localStorage.getItem("pendingBuy")) || [];
  const container = document.getElementById("orderItems");
  const totalEl = document.getElementById("totalPrice");
  if (!container) return;

  let cartData = {};
  ids.forEach(id => {
    cartData[id] = (cartData[id] || 0) + 1;
  });

  container.innerHTML = "";

  function updateTotal() {
    let total = 0;
    Object.keys(cartData).forEach(id => {
      const p = products.find(x => x.id == id);
      total += p.price * cartData[id];
    });
    totalEl.innerText = total;
    localStorage.setItem("orderQuantities", JSON.stringify(cartData));
  }

  Object.keys(cartData).forEach(id => {
    const p = products.find(x => x.id == id);

    container.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <div>
          <strong>${p.name}</strong><br>
          <small class="text-muted">₹${p.price} each</small>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="changeQty(${id}, -1)">−</button>
          <span id="qty-${id}" class="fw-bold">${cartData[id]}</span>
          <button class="btn btn-outline-secondary btn-sm" onclick="changeQty(${id}, 1)">+</button>
        </div>

        <div class="fw-bold text-success">
          ₹<span id="price-${id}">${p.price * cartData[id]}</span>
        </div>
      </div>
    `;
  });

  window.changeQty = function (id, delta) {
    if (cartData[id] + delta <= 0) return;
    cartData[id] += delta;

    const p = products.find(x => x.id == id);
    document.getElementById(`qty-${id}`).innerText = cartData[id];
    document.getElementById(`price-${id}`).innerText = p.price * cartData[id];

    updateTotal();
  };

  updateTotal();
}


function placeOrder() {
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  localStorage.removeItem("pendingBuy");
  window.location.href = "index.html";
}

loadProducts(products);
loadCart();
loadBuyPage();
