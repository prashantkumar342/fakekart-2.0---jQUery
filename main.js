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
  //Categorized product rendering
  var categorizedProductId = new URLSearchParams(window.location.search).get('id')
  $.getJSON('https://fakestoreapi.in/api/products', (data) => {
    var totalPrice = 0
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
    //redirect to a product
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


    //add to cart
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
          const productTitle = product.title.slice(0, 30)
          $('.added-products').append(`
          <table>
            <tr><td rowspan="3"><img src="${product.image}" alt="img"></td></tr>
            <tr><td><p>${productTitle}...</p></td>
            <td rowspan="3"class='btn'><button class="removebtn" id="${product.id}"><b><i class="bi bi-trash3-fill"></i></b></button></td></tr>
            <td><b>Price: $${product.price}</b></td>
            <tr ></tr>
          </table>`)
        }
      })

      cart.forEach(item => {
        if (product.id == item) {
          // var totalPrice = product.price + product.price
          totalPrice += product.price

        }
      })

      // 

    })
    console.log(totalPrice)

    if (cart.length !== 0) {
      $('.price-listing').append(
        `<table>
          <tr><td colspan="2">PRICE DETAILS</td></tr>
          <tr><td>Price (${cart.length} items)</td><td>$${totalPrice}</td>
          </tr>
          <tr><td>Discount</td><td>$0</td>
          </tr>
          <tr><td><b>Total Amount</b></td><td><b>$${totalPrice}</b></td>
          </tr>
        </table>`
      )
    } else {
      $('.price-listing').remove()
      $('.added-products').css({ width: '100%' }).append(
        `<table>
            <tr><td><i class="bi bi-cart3"></i> Cart Is Empty</td></tr>
          </table>`).css({ textAlign: 'center' })
    }

    //navbar
    $('.nav-bar').append(`
    <h2>Fake<h2>Kart</h2>
      </h2>

      <ul>
        <li><a href="index .html">Home</a></li>
        <li><a href="cart.html">Cart</a></li>
      </ul>
    `)
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
