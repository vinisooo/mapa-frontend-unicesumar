function renderItems(items) {
  const itemList = document.getElementById("item-list");
  itemList.innerHTML = "";

  // Remove itens repetidos
  const notDuplicated = items.filter(
    (item, index, self) => self.findIndex((i) => i.id === item.id) === index
  );

  notDuplicated.forEach((item) => {
    // Conta quantas vezes o item aparece
    const itemQtd = items.filter((i) => i.id === item.id).length;

    const itemHtml = `
      <li class="item-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span>R$${item.price.toFixed(2)}</span>
        <span>Quantidade: ${itemQtd}</span>
        <button class="btn pink" data-id="${item.id}">Remover</button>
      </li>
    `;
    itemList.innerHTML += itemHtml;
  });

  // Adiciona event listeners nos botões de remover
  const removeButtons = itemList.querySelectorAll(".btn.pink");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      removeItem(id);
      const updatedItems = getItems();
      renderItems(updatedItems);
      getTotalValue(updatedItems);
    });
  });
}

// Calcula e renderiza valor total
function getTotalValue(items) {
  const total = items.reduce((acc, item) => acc + item.price, 0);
  document.getElementById("total").textContent = total.toFixed(2);
}

// Busca itens do localStorage
function getItems() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Remove todas as instâncias de um item com o id especificado
function removeItem(itemId) {
  const cart = getItems();
  const index = cart.findIndex((item) => item.id === itemId);
  if (index === -1) return;

  cart.splice(index, 1); // remove apenas 1 item
  localStorage.setItem("cart", JSON.stringify(cart));
}

const items = getItems();
renderItems(items);
getTotalValue(items);
