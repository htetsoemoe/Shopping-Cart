let basket = JSON.parse(localStorage.getItem("data")) || [];


let shoppingCart = document.getElementById('shopping-cart');
let label = document.getElementById('label');

// to calculate total item and show notification on cart icon
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map(eachItemInBasket => eachItemInBasket.item).reduce((prev, next) => prev + next, 0);
}

// if page load, calculation will call 
calculation();


let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map(itemInBasket => {
                let{ id, item } = itemInBasket;
                let searchedItem = shopItemsData.find(itemInData => itemInData.id === id) || [];
                let{img, name, price} = searchedItem;
                return `
                <div class="cart-item">
                    <img width="100" src=${img} alt="" />
                
                    <div class="details">
                    
                        <div class="title-price-x">
                            <div class="title-price">
                                <h3>${name}</h3>
                                <h4 class="cart-item-price">$ ${price}</h4>
                            </div>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                    
                        <div class="cart-buttons">
                            <div class="buttons">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id=${id} class="quantity">${item}</div>
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                            </div>
                            <h3>Total: ${item * price}</h3>
                        </div> 
                    </div>
              </div>
                `;
            }).join("")
        ); 
    } else {
        shoppingCart.innerHTML = "";
        label.innerHTML = `
            <h2 class="cart-empty-text">Sorry! Your cart is Empty.</h2>
            <a href="index.html">
                <button class="btn">Back to Home</button>
            </a>
        `;
    }
};

generateCartItems();

// increment function
let increment = id => {
    let selectedItem = id;
    let searchedItem = basket.find(item => item.id === selectedItem.id);

    if (searchedItem === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        searchedItem.item += 1;
    }

    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

// decrement function
let decrement = id => {
    let selectedItem = id;
    let searchedItem = basket.find(item => item.id === selectedItem.id);

    if (searchedItem === undefined || searchedItem.item === 0) {
        return;
    } else {
        searchedItem.item -= 1;
    }

    update(selectedItem.id);

    // remove item from basket with number of item is zero 
    basket = basket.filter(item => item.item !== 0);

    generateCartItems();

    // reset basket to localStorage
    localStorage.setItem("data", JSON.stringify(basket));
};

// update function
let update = id => {
    let searchedItem = basket.find(item => item.id === id);
    document.getElementById(id).innerHTML = searchedItem.item;
    calculation();
    totalAmount();
}

// remove item from your shopping cart
let removeItem = id => {
    let selectedItem = id;

    // item in shopping card id not equal in basket item's id
    // if item id is equal with basket item's id, remove from basket
    basket = basket.filter(item => item.id !== selectedItem.id);

    calculation();
    generateCartItems();
    totalAmount();

    localStorage.setItem("data", JSON.stringify(basket));
}

/**
 * ! Used to calculate total amount of the selected Products
 * ! with specific quantity
 * ? When basket is blank, it will show nothing
 */

 let totalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { id, item } = x;
          let filterData = shopItemsData.find((x) => x.id === id);
          return filterData.price * item;
        })
        .reduce((x, y) => x + y, 0);
  
      return (label.innerHTML = `
      <h2 class="total-amount">Total Bill : $ ${amount}</h2>
      <div class="btn-group">
      <button onclick="clearCart()" class="removeAll btn">Clear Cart</button>
        <button class="checkout btn">Checkout</button>
      </div>
      `);
    } else return;
  };
  
  totalAmount();

  let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  }
