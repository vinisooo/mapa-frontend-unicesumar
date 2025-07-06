// Funcao responsavel pela exibicao dos itens
async function renderProducts(category) {
  // Importa dados mockados no JSON
  const response = await fetch("../../assets/data.json");
  const products = await response.json();

  const list = document.getElementById("item-list");

  if (!list) return;

  // esvazia conteudo da lista atual
  list.innerHTML = "";

  // Filtra os dados com base na categoria selecionada
  const filtered =
    category === "Todos"
      ? products
      : products.filter((product) => {
          return product.category === category;
        });

  // percorre por cada item filtrado
  filtered.forEach((item) => {
    // Cria html do item da iteracao
    const itemHtml = `
      <li class="item-card">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div>
          <span>R$${item.price.toFixed(2)}</span>
          <a href="../item/item.html?id=${
            item.id
          }" class="btn white">Ver Item</a>
        </div>
      </li>
    `;
    // adiciona html do item atual na lista
    list.innerHTML += itemHtml;
  });

  // adiciona evento de clique para cada botao de adicionar ao carrinho
  const addButtons = document.getElementsByClassName("btn white");

  Array.from(addButtons).forEach((addBtn) => {
    addBtn.addEventListener("click", () => addItemToCart(addBtn.id));
  });

  // marca o botao da categoria como selecionado
  setCurrentFilter(category);
}

// Estabelece categorias com base nos itens
async function setCategories() {
  // Importa dados mockados no JSON
  const response = await fetch("/assets/data.json");
  const products = await response.json();

  // utiliza set para buscar lista de categorias sem duplicacao
  const categories = new Set(products.map((product) => product.category));

  const categoriesList = document.getElementById("categories");

  if (!categoriesList) return;

  categories.forEach((category) => {
    const categoryHtml = `
      <button class="btn white category-button" id="${category}">${category}</button>
    `;
    categoriesList.innerHTML += categoryHtml;
  });

  // adiciona evento de clique para cada botao de categoria
  const categoryButtons = document.getElementsByClassName("category-button");

  Array.from(categoryButtons).forEach((catBtn) => {
    catBtn.addEventListener("click", () => renderProducts(catBtn.id));
  });
}

// Altera o estilo do botao de categoria que esta sendo utilizado para a busca
function setCurrentFilter(category) {
  const categoryButton = document.getElementById(category);
  const allCategoryButtons = document.getElementsByClassName("category-button");

  if (!categoryButton) return;

  Array.from(allCategoryButtons).forEach((catBtn) => {
    catBtn.classList.remove("selected");
  });

  categoryButton.classList.add("selected");
}

renderProducts("Todos");
setCategories();
