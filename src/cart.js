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
                        <p>${name}</p>
                        <p class="cart-item-price">$ ${price}</p>
                        </div>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                
                    <div class="cart-buttons">
                        <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                
                    <h3>$ ${item * price}</h3>
                    
                    </div>
              </div>
                `;
            }).join("")
        ); 
    } else {
        shoppingCart.innerHTML = "";
        label.innerHTML = `
            <h2>Cart is Empty!</h2>
            <a href="index.html">
                <button class="home-btn">Back to Home</button>
            </a>
        `;
    }
};

generateCartItems();
