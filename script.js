window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  const navbar = document.getElementById('navbar');
  const headerHeight = header.offsetHeight;
  const scrollPosition = window.scrollY;

  if (scrollPosition > (headerHeight * 0.9)) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});


const exchangeRate = 15700;


const products = [
  { id: 1, name: "Surf Board", price: exchangeRate * 367.50, category: "board-sports", image: "assets/image/surf-board.jpg" },
  { id: 2, name: "Skateboard", price: exchangeRate * 99.99, category: "board-sports", image: "assets/image/skateboard.jpg" },
  { id: 3, name: "Basketball", price: exchangeRate * 75.50, category: "basketball", image: "assets/image/basketball.jpg" },
  { id: 4, name: "Basketball Shoes", price: exchangeRate * 120.00, category: "basketball", image: "assets/image/basketball-shoes.jpg" },
  { id: 5, name: "Soccer Ball", price: exchangeRate * 45.99, category: "football", image: "assets/image/soccer-ball.jpg" },
  { id: 6, name: "Football Helmet", price: exchangeRate * 150.00, category: "football", image: "assets/image/football-helmet.jpg" },
  { id: 7, name: "Football Shoes", price: exchangeRate * 89.99, category: "football", image: "assets/image/football-shoes.jpg" },
  { id: 8, name: "Golf Club", price: exchangeRate * 150.00, category: "golf", image: "assets/image/golf-club.jpg" },
  { id: 9, name: "Golf Balls", price: exchangeRate * 30.00, category: "golf", image: "assets/image/golf-balls.jpg" },
  { id: 10, name: "Dumbbells", price: exchangeRate * 35.50, category: "gyms", image: "assets/image/dumbbells.jpg" },
  { id: 11, name: "Yoga Mat", price: exchangeRate * 25.00, category: "gyms", image: "assets/image/yoga-mat.jpg" },
  { id: 12, name: "Resistance Bands", price: exchangeRate * 15.00, category: "gyms", image: "assets/image/resistance-bands.jpg" },
  { id: 13, name: "Sports Water Bottle", price: exchangeRate * 15.99, category: "others", image: "assets/image/sports-water-bottle.jpg" },
  { id: 14, name: "Sports Watch", price: exchangeRate * 120.00, category: "others", image: "assets/image/sports-watch.jpg" }
];



const pageSize = 10;


let currentPage = 1;


const categorySelect = document.getElementById('category-select');
const sortBySelect = document.getElementById('sort-by');


function filterProducts(categoryFilter) {
  return categoryFilter === 'all-category'
    ? products
    : products.filter(product => product.category === categoryFilter);
}


function sortProducts(filteredProducts, criteria) {
  let sortedProducts;
  if (criteria === "cheapest") {
    sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (criteria === "priciest") {
    sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else {
    sortedProducts = filteredProducts; 
  }
  return sortedProducts;
}


function renderProducts(page) { 
  const productList = document.getElementById('product-list');
  const productCount = document.getElementById('product-count');
  productList.innerHTML = ''; // Clear existing products

  // Get selected category and sorting option
  const selectedCategory = categorySelect.value;
  const selectedSortOption = sortBySelect.value;

  // Filter and sort products
  let filteredProducts = filterProducts(selectedCategory);
  filteredProducts = sortProducts(filteredProducts, selectedSortOption);

  // Slice the filtered products based on the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredProducts.length);
  const pageProducts = filteredProducts.slice(startIndex, endIndex);

  // Update product count
  productCount.innerText = `${filteredProducts.length} Products in All Categories`;

  // Render the products for the current page
  pageProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
       <img src="${product.image}" alt="${product.name}">
      <div class="product-detail">
          <p class="product-name">${product.name}</p>
<p class="product-price">Rp. ${product.price.toLocaleString('id-ID')}</p>
          <a href="detail-product.html?id=${product.id}" class="btn-product">Detail Product</a>
      </div>
    `;
    productList.appendChild(productCard);
  });

  
  updatePaginationControls(filteredProducts.length);
}


function updatePaginationControls(filteredProductCount) {
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');
  const pageNumber = document.getElementById('page-number');
  const totalPages = Math.ceil(filteredProductCount / pageSize);

  
  prevButton.disabled = currentPage === 1;
  
  nextButton.disabled = currentPage === totalPages;

  
  pageNumber.innerText = `Page ${currentPage} of ${totalPages}`;
}


document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts(currentPage);
  }
});


document.getElementById('next-page').addEventListener('click', () => {
  const filteredProducts = filterProducts(categorySelect.value);
  if (currentPage < Math.ceil(filteredProducts.length / pageSize)) {
    currentPage++;
    renderProducts(currentPage);
  }
});


sortBySelect.addEventListener('change', function () {
  renderProducts(currentPage);
});


categorySelect.addEventListener('change', function () {
  currentPage = 1; 
  renderProducts(currentPage);
});


const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const categoryValue = card.getAttribute('data-category');
    categorySelect.value = categoryValue;

    
    categoryCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    currentPage = 1; 
    renderProducts(currentPage);
  });
});


window.addEventListener('DOMContentLoaded', () => {
  
  const defaultCategory = categorySelect.value;
  const defaultCard = document.querySelector(`.category-card[data-category="${defaultCategory}"]`);

  
  if (defaultCard) {
    categoryCards.forEach(card => card.classList.remove('selected'));
    defaultCard.classList.add('selected');
  }

  
  renderProducts(currentPage);
});


renderProducts(currentPage);





const searchContainer = document.querySelector('.search-container');
const searchForm = searchContainer.querySelector('form');
const searchInput = searchContainer.querySelector('input[name="search"]');


const suggestionsContainer = document.createElement('div');
suggestionsContainer.classList.add('search-suggestions');
suggestionsContainer.style.cssText = `
  position: absolute;
  top: 100%;
  left: 0;
  right: 0 ;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
  display: none;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
searchContainer.style.position = 'relative';
searchContainer.appendChild(suggestionsContainer);


function handleSearch(event) {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  
  if (!searchTerm) {
      suggestionsContainer.style.display = 'none';
      return;
  }
  
  
  const matchingProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm)
  );
  
  
  if (matchingProducts.length > 0) {
      suggestionsContainer.innerHTML = matchingProducts
          .map(product => `
              <div class="suggestion-item" data-product-id="${product.id}">
                  <div class="suggestion-content">
                      <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover;">
                      <div class="suggestion-details">
                          <div>${product.name}</div>
                          <div style="color: #666;">Rp. ${product.price.toLocaleString('id-ID')}</div>
                      </div>
                  </div>
              </div>
          `).join('');
          
      // Add styles to suggestion items
      const suggestionItems = suggestionsContainer.querySelectorAll('.suggestion-item');
      suggestionItems.forEach(item => {
          item.style.cssText = `
              padding: 10px;
              cursor: pointer;
              border-bottom: 1px solid #eee;
          `;
          item.querySelector('.suggestion-content').style.cssText = `
              display: flex;
              align-items: center;
              gap: 10px;
          `;
          item.querySelector('.suggestion-details').style.cssText = `
              display: flex;
              flex-direction: column;
          `;
          
          
          item.addEventListener('mouseenter', () => {
              item.style.backgroundColor = '#f5f5f5';
          });
          item.addEventListener('mouseleave', () => {
              item.style.backgroundColor = 'white';
          });
      });
      
      suggestionsContainer.style.display = 'block';
  } else {
      suggestionsContainer.innerHTML = `
          <div style="padding: 10px; color: #666;">
              No products found
          </div>
      `;
      suggestionsContainer.style.display = 'block';
  }
}


suggestionsContainer.addEventListener('click', (event) => {
  const suggestionItem = event.target.closest('.suggestion-item');
  if (suggestionItem) {
      const productId = suggestionItem.dataset.productId;
      window.location.href = `detail-product.html?id=${productId}`;
  }
});


searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm) {
      const firstMatch = products.find(product => 
          product.name.toLowerCase().includes(searchTerm)
      );
      if (firstMatch) {
          window.location.href = `detail-product.html?id=${firstMatch.id}`;
      }
  }
});


searchInput.addEventListener('input', handleSearch);


document.addEventListener('click', (event) => {
  if (!searchContainer.contains(event.target)) {
      suggestionsContainer.style.display = 'none';
  }
});


searchInput.addEventListener('keydown', (event) => {
  const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
  let currentIndex = Array.from(suggestions).findIndex(item => 
      item.style.backgroundColor === '#f5f5f5'
  );
  
  switch (event.key) {
      case 'ArrowDown':
          event.preventDefault();
          if (currentIndex < suggestions.length - 1) {
              if (currentIndex >= 0) {
                  suggestions[currentIndex].style.backgroundColor = 'white';
              }
              suggestions[currentIndex + 1].style.backgroundColor = '#f5f5f5';
              suggestions[currentIndex + 1].scrollIntoView({ block: 'nearest' });
          }
          break;
          
      case 'ArrowUp':
          event.preventDefault();
          if (currentIndex > 0) {
              suggestions[currentIndex].style.backgroundColor = 'white';
              suggestions[currentIndex - 1].style.backgroundColor = '#f5f5f5';
              suggestions[currentIndex - 1].scrollIntoView({ block: 'nearest' });
          }
          break;
          
      case 'Enter':
          if (currentIndex >= 0) {
              event.preventDefault();
              const productId = suggestions[currentIndex].dataset.productId;
              window.location.href = `detail-product.html?id=${productId}`;
          }
          break;
          
      case 'Escape':
          suggestionsContainer.style.display = 'none';
          searchInput.blur();
          break;
  }
});