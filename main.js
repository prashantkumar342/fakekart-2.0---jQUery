// Home page Products Category Render
$(document).ready(() => {
  $('.nav-bar').append(
    `<h2>Fake<h2>Kart</h2>
      </h2>

      <ul>
        <li><a href="index%20.html"><i class="bi bi-house-door"></i></a></li>
        <li><a href="cart.html"><i class="bi bi-cart3"></i></a></li>
        <li><a href=""><i class="bi bi-card-checklist"></i></a></li>
      </ul>`
  )
  const productCategoryUrl = 'https://fakestoreapi.in/api/products/category'
  $.getJSON(productCategoryUrl, (data) => {
    data.categories.forEach(category => {
      $('.product-category').append(
        `<div class="card">
              <button class="category-btn" value="${category}">${category}</button>
              </div>`
      )
    });
    //home page header slider & content

    $.getJSON('https://fakestoreapi.in/api/products?limit=10', imgData => {
      imgData.products.forEach(img => {
        $('.slider').append(
          `<img id="${img.id}" src="${img.image}">`
        )
      })
      //slider onclick 
      $('.slider').on("click", "img", function () {
        var categorizedPage = `product.html?id=${this.id}`
        window.location.href = categorizedPage
      })
    })

    //header 4 product rendering
    $.getJSON('https://fakestoreapi.in/api/products?limit=4', product => {
      product.products.forEach(item => {
        $('.headerproductslist').append(
          `<div class="card" id="${item.id}">
  <div class="image"><img src="${item.image}" alt="">
  </div>
  <button class="title">${item.title.slice(0, 10)}</button>
  <button class="price">$${item.price}</button>
  <button class="discount"><i class="bi bi-tag-fill"></i> ${item.discount}% off</button>
</div>`
        )

      })
    })
    //showcase home page
    $.getJSON('https://fakestoreapi.in/api/products?limit=12', product => {
      product.products.forEach(item => {
        $('.productsHome').append(
          `<div class="card">
          <div class="image" >
            <img src="${item.image} " id="${item.id}"alt="">
          </div>
          <div class="productDetails">
            <p class="title" id="${item.id}">${item.title.slice(0, 15)}</p>
            <p class="price" id="${item.id}"><i class="bi bi-tag-fill"></i> $${item.price}</p>
            <button class="addtocart" id="${item.id}"><i class="bi bi-cart-plus-fill"></i></button>
          </div>
      </div>`
        )
      })
      $('.productsHome').on("click", "p", function () {
        var categorizedPage = `product.html?id=${this.id}`
        window.location.href = categorizedPage
      })
      $('.productsHome').on("click", "img", function () {
        var categorizedPage = `product.html?id=${this.id}`
        window.location.href = categorizedPage
      })
      $('.productsHome').on("click", ".addtocart", function () {
        var btnId = this.id
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(btnId)
        localStorage.setItem('cart', JSON.stringify(cart));
      })
    })

    //categorized product redirect
    $('.product-category').on('click', '.category-btn', function () {
      var categorizedPage = `categorized.html?id=${this.value}`
      window.location.href = categorizedPage

    });

  });
  //Categorized product rendering
  var categorizedProductId = new URLSearchParams(window.location.search).get('id')
  $.getJSON('https://fakestoreapi.in/api/products?limit=150', (data) => {
    var totalPrice = 0
    var totalDisount = 0
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
    $('.headerproductslist').on("click", ".card", function () {
      var categorizedPage = `product.html?id=${this.id}`
      window.location.href = categorizedPage
    })
    $('.product-cards').on('click', 'p', function () {
      var categorizedPage = `product.html?id=${this.id}`
      window.location.href = categorizedPage
    });
    $('.added-products').on('click', 'p', function () {
      var categorizedPage = `product.html?id=${this.id}`
      window.location.href = categorizedPage
    });
    $('.product-cards').on('click', 'img', function () {
      var categorizedPage = `product.html?id=${this.id}`
      window.location.href = categorizedPage
    });
    $('.added-products').on('click', 'img', function () {
      var categorizedPage = `product.html?id=${this.id}`
      window.location.href = categorizedPage
    });

    var productId = new URLSearchParams(window.location.search).get('id')
    data.products.forEach(product => {
      if (product.id == productId) {
        $('.selected-product').append(`
        <img src="${product.image}" alt="">
      <div class="product-details">
        <h3>${product.title}</h3>
        <div class="fbtngrp">
        <p class="btn rating"><i class="bi bi-star-half"></i> ratings </p>
          <p class="btn clr"><i class="bi bi-palette2" ></i> ${product.color}</p><br>
        </div>
        <div class="sbtngrp">
          <p class="btn price"><i class="bi bi-tag-fill"></i> Price: $${product.price}</p>
          <p class="btn tocart" id="${product.id}"><i class="bi bi-cart-plus-fill"></i> add to cart</p>
        </div>
        <p class="desc">${product.description}</p>
      </div>
        `)
      }
    })


    //add to cart
    $('.addtocartbtn').click(function () {
      var btnId = this.id
      var cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(btnId)
      localStorage.setItem('cart', JSON.stringify(cart));
    })
    $('.btn.tocart').click(function () {
      var btnId = this.id
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
            <tr><td rowspan="3"><img src="${product.image}" id="${product.id}" alt="img"></td></tr>
            <tr><td><p id="${product.id}">${productTitle}...</p></td>
            <td rowspan="3"class='btn'><button class="removebtn" id="${product.id}"><b><i class="bi bi-trash3-fill"></i></b></button></td></tr>
            <td><b>Price: $${product.price}</b></td>
            <tr ></tr>
          </table>`)
        }
      })
      cart.forEach(item => {
        if (product.id == item) {
          totalPrice += product.price
          const discount = Math.trunc(product.discount / product.price * 100)
          totalDisount += discount
        }
      })
    })
    $('.removebtn').click(function () {
      location.reload(true);
      const removeBtnId = this.id
      var newCart = cart.filter(function (productid) {
        return productid !== removeBtnId
      })
      localStorage.setItem('cart', JSON.stringify(newCart));
    })
    if (cart.length !== 0) {
      $('.price-listing').append(
        `<table>
          <tr><td colspan="2">PRICE DETAILS</td></tr>
          <tr><td>Price (${cart.length} items)</td><td>$${totalPrice}</td>
          </tr>
          <tr><td>Discount</td><td>-$${totalDisount}</td>
          </tr>
          <tr><td><b>Total Amount</b></td><td><b>$${totalPrice - totalDisount}</b></td>
          </tr>
        </table>`
      )
      $('.checkout').append(
        `<input type="checkbox" id="tnc">
        <label style="word-wrap:break-word" for="tnc">I have read all of Terms & Conditions i agree all of these</label></br>`
      )

    } else {
      $('.price-listing').remove()
      $('.added-products').css({ width: '100%' }).append(
        `<table>
            <tr><td><i class="bi bi-cart3"></i> Cart Is Empty</td></tr>
          </table>`).css({ textAlign: 'center' })
    }

    //redirect to checkout and order summy page
    $('.checkout').on('click', '#tnc', function () {
      if (this.checked) {
        $('.checkout').append(`<button id="checkoutbtn"><i class="bi bi-cart-check-fill"></i> checkout</button>`)
        $('#checkoutbtn').click(function () {
          var checkoutPage = './checkout.html'
          window.location.href = checkoutPage
        })
      }
      else {
        $('#checkoutbtn').remove()
      }
    })
    //checkout and ourder summary page
    // render Address form dynamically on click
    const addr = JSON.parse(localStorage.getItem("addresses")) || []
    $('.new-addr').click(() => {
      $('.new-addr').text(`Enter New Address`).css({ backgroundColor: "gray", color: "black", textAlign: "left", width: "fit-content" })
      $('.address').append(
        `<form id="addressForm">
          <table>
            <tr>
              <td><input type="text" id="fname" required placeholder="first name"></td>
              <td><input type="text" id="lname" required placeholder="last name"></td>
              <td><input type="tel" id="phone" required placeholder="phone"></td>
            </tr>
            <tr>
              <td><input type="text" id="city" required placeholder="city"></td>
              <td><input type="text" id="landmark" required placeholder="Landmark"></td>
              <td><input type="text" id="pincode" required placeholder="pincode"></td>
            </tr>
          </table>
          <button type="submit" id="addr-save-btn"><i class="bi bi-geo-alt-fill"></i> Save Address</button>
        </form>`
      )
    })

    //render saved deliver Addresses

    function renderDeliverAddresses(data) {
      var addrId = 0
      data.forEach(addr => {

        addrId += 1
        $('.addresses-list').append(
          ` <table>
                <tr>
                  <td><input type="radio" id="${addrId}" name="seladdr">
                    <label for="${addrId}">${addr.fname} ${addr.lname}, ${addr.landmark}, ${addr.city},
                      pincode:${addr.pincode}</label>
                    <div class="addr-remove-btn"><button data-id="${addr.id}" class="addr-remove"><i
                          class="bi bi-x-square-fill"></i> remove</button></div>
                  </td>
                </tr>
              </table>
            `
        )
      })
    }
    //get addr data from form 
    $(".address").on("submit", "#addressForm", () => {
      const fname = $("#fname").val()
      const lname = $('#lname').val()
      const phone = $('#phone').val()
      const city = $('#city').val()
      const landmark = $('#landmark').val()
      const pincode = $('#pincode').val()

      const address = JSON.parse(localStorage.getItem("addresses")) || []
      address.push({ id: Math.random().toString(), fname, lname, phone, city, landmark, city, pincode })
      localStorage.setItem("addresses", JSON.stringify(address))
      $('#addressForm')[0].reset()
      // renderDeliverAddresses(address)
    })
    //addr remove btn
    $('.addresses-list').on("click", ".addr-remove", function () {
      window.location.reload()
      const btnId = this.dataset.id
      const addr = JSON.parse(localStorage.getItem("addresses")) || []
      const newAddr = addr.filter(addrs => addrs.id !== btnId)
      localStorage.setItem("addresses", JSON.stringify(newAddr))
      // renderDeliverAddresses(newAddr)
    })

    //get address form data to save

    renderDeliverAddresses(addr)

  })
});
