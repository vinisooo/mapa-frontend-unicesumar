const item = await getItem();
renderItem(item);

// Renderiza na tela item selecionado
function renderItem(item) {
  // Busca todas as tags para inserir as informacoes
  const itemImg = document.getElementById("item-img");
  const itemTitle = document.getElementById("item-title");
  const itemDescription = document.getElementById("item-description");
  const itemPrice = document.getElementById("item-price");
  const itemAddToCart = document.getElementById("item-add-to-cart");

  // Insere informacoes do item
  itemImg.src = item.image;
  itemTitle.textContent = item.name;
  itemDescription.textContent = item.description;
  itemPrice.textContent = `R$${item.price.toFixed(2)}`;
  itemAddToCart.id = item.id;

  itemAddToCart.addEventListener("click", () => {
    addItemToCart(item);
  });

  const reviews = document.getElementById("reviews");

  reviews.innerHTML = "";

  item.reviews.forEach((review) => {
    const reviewHtml = `
      <li class="card">
        <h4>${review.user}</h4>
        <p>${review.comment}</p>
        <span>${review.rating}/5</span>
      </li>
      `;
    reviews.innerHTML += reviewHtml;
  });
}

// Busca item com base no id passado por query param
async function getItem() {
  const params = new URLSearchParams(window.location.search);
  const itemId = Number(params.get("id"));

  const response = await fetch("../../assets/data.json");
  const data = await response.json();

  return data.find((item) => item.id === itemId);
}

// Adiciona item no carrinho
function addItemToCart(item) {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([item]));
    return;
  }

  const parsedCart = JSON.parse(cart);
  parsedCart.push(item);

  localStorage.setItem("cart", JSON.stringify(parsedCart));

  // Mostra mensagem de sucesso na tela
  const cartFeedback = document.querySelector(".cart-feedback");
  cartFeedback.classList.add("show");
  setTimeout(() => {
    cartFeedback.classList.remove("show");
  }, 3000);
}
