const sortButton = document.getElementById('sortButton');
const popUp = document.getElementById('popUp');

sortButton.addEventListener('click',function(event)  {
  popUp.style.display = 'block';
  event.stopPropagation()
})

document.addEventListener('click', function() {
    popUp.style.display = 'none';
 });
//-----------------------------------------------------------------------------------
 const poplnks = document.querySelectorAll('.drpdwn-lnk');
 const featured = document.querySelector('.featured')

 poplnks.forEach(poplnk => {
    poplnk.addEventListener('click', function(event) { 
        event.preventDefault();

        poplnks.forEach(link => link.classList.remove('active'))
        poplnk.classList.add ('active');

        // featured.innerHTML = '';
        featured.innerHTML = poplnk.innerHTML;

        const sortValue = poplnk.innerHTML.trim(); 
        console.log(`Selected Sort Option: ${sortValue}`);
        if (sortValue === 'Price:Low to High') {
            productData.sort((a, b) => {
                const priceA = Number(a.price.current.replace(/,/g, '')); 
                const priceB = Number(b.price.current.replace(/,/g, ''));
                return priceA - priceB;
            });
        } else if (sortValue === 'Price:High to Low') {
            productData.sort((a, b) => {
                const priceA = Number(a.price.current.replace(/,/g, '')); 
                const priceB = Number(b.price.current.replace(/,/g, ''));
                return priceB - priceA;
            });
        }else{
            fetchProductData(); 
            return;
        }

        
        currentPage = 1;
        renderProducts();
        updatePaginationLinks();
    })
 })

 //---------------------------------------------------------------------------------------------------------
 let currentPage = 1;
 const itemsPerPage = 10;
 let productData = [];
 const totalPages =3;
 
 

async function fetchProductData() {
  try {
      const response = await fetch('mobile.json'); 
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      productData = data.products;
      filteredData = productData;
      renderProducts();
      updatePaginationLinks(); 
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

function renderProducts(products = filteredData) {
  const mobSectionContainer = document.getElementById('mobSection'); 
  mobSectionContainer.innerHTML = ''; 

  
  const start = (currentPage - 1) * itemsPerPage; 
  const end = start + itemsPerPage;
  const productsToRender = products.slice(start, end);

  productsToRender.forEach(product => {
      const mobileSectionHTML = `
          <div class="mob-section">
              <div class="mob-container">
                  <div class="mob-content">
                      <div class="mob-inner">
                          <div class="mob-real">
                              <div class="puisg-row">
                                  <div class="mob-img">
                                      <div class="mob-img-inner">
                                          <div class="mob-img-container">
                                              <div class="mob-img-relative">
                                                  <div class="mob-img-fin">
                                                      <img src="${product.image}" alt="">
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="mob-details">
                                      <div class="mob-details-inner">
                                          <div class="mob-details-spacing">
                                              <div class="mob-name">
                                                  <h2 class="mob-hed2">
                                                      <a href="#" class="mob-hed2-a">
                                                          <span class="mob-hed2-span">${product.description}</span>
                                                      </a>
                                                  </h2>
                                              </div>
                                              <div class="mob-stars-review">
                                                  <div class="stars">
                                                      <span class="star-content">
                                                          <span class="star-img">
                                                              <a href="#" class="star-img-a">
                                                                  <i class="starig"></i>
                                                                  <i class="a-icon"></i>
                                                              </a>
                                                          </span>
                                                      </span>
                                                      <span class="star-number">${product.stars}</span>
                                                  </div>
                                                  <div class="reviews">
                                                      <span class="review-num">${product.reviews}</span>
                                                  </div>
                                              </div>
                                              <div class="pdc-row">
                                                  <div class="prow-col1">
                                                      <div class="prow-col1-inner">
                                                          <div class="price-container">
                                                              <div class="great-ind">
                                                                  <a href="#" class="great-ind-img">
                                                                      <span class="great-ind-span">
                                                                          <span class="grtind-spn2">
                                                                              <span class="badge-text">Great Indian Festival</span>
                                                                          </span>
                                                                      </span>
                                                                  </a>
                                                              </div>
                                                              <div class="inr-price">
                                                                  <div class="a-row">
                                                                      <a href="#" class="mrpice-a">
                                                                          <span class="a-price-new">
                                                                              <span class="a-offscreen" style="font-size: 12px;">₹</span>
                                                                              <span class="a-offscreen">${product.price.current}</span>
                                                                          </span>
                                                                          <div class="old-price">
                                                                              <span class="mrp-price">M.R.P:</span>
                                                                              <span class="tp-price">
                                                                                  <span class="a-off">₹${product.price.original}</span>
                                                                              </span>
                                                                          </div>
                                                                      </a>
                                                                      <span class="a-letter-space"></span>
                                                                      <span>${product.price.discount}</span>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div class="delivery">
                                                              <div class="delivery-container">
                                                                  <div class="delivery-prime">
                                                                      <span class="delivery-prime-span">
                                                                          <span class="delivery-prime-span2">
                                                                              <i class="prime-i"></i>
                                                                          </span>
                                                                      </span>
                                                                  </div>
                                                                  <div class="arw">
                                                                      <span class="free-delivery">
                                                                          <span class="a-color-base">FREE delivery</span>
                                                                          <span class="delivery-date">Wed, 23 Oct</span>
                                                                      </span>
                                                                  </div>
                                                                  <div class="arw">
                                                                      <span class="fastest-delivery">
                                                                          <span class="fstdel">Or fastest delivery</span>
                                                                          <span class="delivery-date">Today</span>
                                                                      </span>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div class="Service-install">
                                                              <div class="serinst">
                                                                  <span>Service: Installation</span>
                                                              </div>
                                                          </div>
                                                          <div class="add-to-cart">
                                                              <div class="addtcrt-container">
                                                                  <div class="addcrt-content">
                                                                      <div class="acart">
                                                                          <div class="cart-container">
                                                                              <div class="cart-fv">
                                                                                  <span class="cart-kjf">
                                                                                      <div class="mfj">
                                                                                          <span class="mkfj">
                                                                                              <span class="button-inner">
                                                                                                  <button class="button-text">Add to Cart</button>
                                                                                              </span>
                                                                                          </span>
                                                                                      </div>
                                                                                  </span>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div class="colors">
                                                              <div class="colors-container">
                                                                  <div class="colors-content" style="border-color: #111;">
                                                                      <span class="circles-spn" style="background-color: black;">
                                                                          <span class="clr-fill"></span>
                                                                      </span>
                                                                  </div>
                                                                  <div class="colors-content" style="border-color: white;">
                                                                      <span class="circles-spn" style="background-color: silver;">
                                                                          <span class="clr-fill"></span>
                                                                      </span>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div class="prow-col2">
                                                      <div class="prow-col2-inner"></div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;

      mobSectionContainer.innerHTML += mobileSectionHTML; 
  });
 
}


function updatePaginationLinks() {
  const previousButton = document.getElementById('previousButton');
  const nextButton = document.getElementById('nextButton');

 
  previousButton.classList.toggle('active', currentPage > 1);
  previousButton.onclick = currentPage > 1 ? () => goToPage(currentPage - 1) : null;

  
  const pageLinks = document.querySelectorAll('.pagenation1');
  pageLinks.forEach((link, index) => {
      const pageNumber = index + 1;
      link.className = currentPage === pageNumber ? 'pagenation1 active' : 'pagenation1';
      link.onclick = () => goToPage(pageNumber);
  });

  
  nextButton.classList.toggle('active', currentPage < totalPages);
  nextButton.onclick = currentPage < totalPages ? () => goToPage(currentPage + 1) : null;
}

function goToPage(page) {
  currentPage = page;
  renderProducts();
  updatePaginationLinks();
}
//------------------------------------------------------------------------------------------------------------------------------
const filterButtons = document.querySelectorAll('.brand-container');
let selectedBrands =[];
const  squares = document.querySelectorAll('.brnd-icon');

function filteredProducts() {

    
    displayedProducts = productData.filter(product => 
        selectedBrands.length === 0 || 
        selectedBrands.some(selectedBrand => 
            product.description.toLowerCase().includes(selectedBrand.toLowerCase())
        )
    );
    productData = displayedProducts;
    renderProducts();
    updatePaginationLinks();
}

squares.forEach(square => {
    square.addEventListener('click', function() {
        const checkbox = this.previousElementSibling; 
        const brand = this.closest('.brand-container').getAttribute('data-brand');
        console.log("Selected Brands after click:", selectedBrands);

        

        if (selectedBrands.includes(brand)) {
          
            square.classList.remove('active'); 
            checkbox.checked = false; 
            selectedBrands = selectedBrands.filter(b => b !== brand); 
        } else {
            
            square.classList.add('active'); 
            checkbox.checked = true; 
            selectedBrands.push(brand); 
        }
        
        console.log("Selected Brands after click:", selectedBrands);
       
       currentPage = 1;
        filteredProducts();

        
    });
});

// Fetch product data on page load
fetchProductData();

// ------------------------------------------------------------------------------------------------------------
