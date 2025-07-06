renderEmphasisItems();

// Busca os itens em destaque
async function getEmphasisItem() {
  const response = await fetch("/assets/data.json");
  const data = await response.json();

  const emphasis = data.filter((product) => product.emphasis);
  return emphasis;
}

// Renderiza os itens em destaque na <ul id="emphasis-items">
async function renderEmphasisItems() {
  const items = await getEmphasisItem();
  const container = document.getElementById("emphasis-items");

  container.innerHTML = ""; // limpa antes de renderizar

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "item-card";

    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <a href="/pages/item/item.html?id=${item.id}" class="btn white">Ver Item</a>
    `;

    container.appendChild(li);
  });
}

const form = document.querySelector(".form-contact");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const mensagem = document.getElementById("mensagem");

if (form) {
  form.addEventListener("submit", function (e) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
      alert("Por favor, preencha todos os campos.");
      e.preventDefault();
      return;
    }

    if (!emailRegex.test(email.value)) {
      alert("Por favor, insira um e-mail válido.");
      e.preventDefault();
    }
  });
}
