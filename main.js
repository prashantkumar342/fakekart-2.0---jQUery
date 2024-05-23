// Home page Products Category Render
$(document).ready(() => {
  const productCategoryUrl = 'https://fakestoreapi.in/api/products/category'
  $.getJSON(productCategoryUrl, (data) => {
    data.categories.forEach(category => {
      $('.product-category').append(
        `<div class="card">
              <button class="category-btn" value="${category}">${category}</button>
              </div>`
      )
    });

    //categorized product redirect
    $('.product-category').on('click', '.category-btn', function () {
      var categorizedPage = `categorized.html?id=${this.value}`
      window.location.href = categorizedPage

    });

  });
  var categorizedProductId = new URLSearchParams(window.location.search).get('id')
  $.getJSON('https://fakestoreapi.in/api/products', (data) => {
    data.products.forEach(product => {
      if (product.category == categorizedProductId) {
        const title = product.title.slice(0, 40)
        $('.product-cards').append(
          `<div class="card" id=${product.id}>
          <div class="card-image">
          <img src="${product.image}" id=${product.id} alt="">
          </div>
          <div class="productdetail" >
          <p id=${product.id} >${title} ....</p>
          <h3>Price: $${product.price}</h3>
          <button class="addtocartbtn" id="${product.id}"><i class="bi bi-cart-plus-fill"></i> Add To Cart</button>
          </div>
          </div>`
        )
      }
    })
    $('.product-cards').on('click', 'p', function () {
      var categorizedPage = `product.html?id=${this.id}`
      window.location.href = categorizedPage
    });
    $('.product-cards').on('click', 'img', function () {
      var categorizedPage = `product.html?id=${this.id}`
      window.location.href = categorizedPage
    });

    var productId = new URLSearchParams(window.location.search).get('id')
    data.products.forEach(product => {
      if (product.id == productId) {
        $('.selected-product').append(`<p>${product.title}</p>`)
        //code is pending to write
      }
    })


    $('.addtocartbtn').click(function () {
      var btnId = this.id
      console.log(btnId)
      var cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(btnId)
      localStorage.setItem('cart', JSON.stringify(cart));
    })
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    data.products.forEach(product => {
      cart.forEach(productid => {
        if (product.id == productid) {
          $('.added-products').append(`
          <div class="product-card">
        <div class="detail">
        <p>${product.title}</p>
          <h3>Price: $${product.price}</h3>
          <button class="removebtn" id="${product.id}">remove</button>
        </div>`)
        }
      })
    })
    $('.removebtn').click(function () {
      location.reload(true);

      const removeBtnId = this.id
      var newCart = cart.filter(function (productid) {
        return productid !== removeBtnId
      })
      console.log(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart));
    })
  })


});
