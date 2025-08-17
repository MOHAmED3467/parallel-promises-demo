const urls = [
  "https://dummyjson.com/products/1",
  "https://dummyjson.com/products/2",
  "https://dummyjson.com/products/3",
  "https://dummyjson.com/products/4",
  "https://dummyjson.com/products/5",
  "https://dummyjson.com/products/6"
];

function fetchProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "<p>⏳ Loading products...</p>";

  Promise.all(urls.map(url => fetch(url).then(res => res.json())))
    .then(products => {
      container.innerHTML = "";
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>$${product.price}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      container.innerHTML = `<p style="color:red;">❌ Error loading products</p>`;
      console.error("Error:", error);
    });
}

// First load
fetchProducts();

// Refresh button
document.getElementById("refreshBtn").addEventListener("click", fetchProducts);
