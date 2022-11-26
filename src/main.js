let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket);

let shop = document.getElementById('shop');
// console.log(shop);

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map(
        (item) => {
            let { id, name, price, desc, img } = item;// data destructuring
            let itemInBasket = basket.find(item => item.id === id) || [];
            return `
            <div id="product-id-${id}" class="item">
                <img src="${img}" width="200px" alt="shirt-photo">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id="${id}" class="quantity">
                                ${itemInBasket.item === undefined ? 0 : itemInBasket.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    ).join(""));
}

generateShop();

let increment = (id) => {   
    let selectedItem = id; // id returns <div id="${id}" class="quantity">0</div>
    //console.log(selectedItem.id);

    let searchedItem = basket.find((itemInBasket) => 
        itemInBasket.id === selectedItem.id
    );

    if (searchedItem === undefined) { // if item doesn't exit in basket array
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else { // if item is already exit in basket
        searchedItem.item += 1;
    }

    // console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) => {
    let selectedItem = id; // id returns <div id="${id}" class="quantity">0</div>

    let searchedItem = basket.find(itemInBasket => itemInBasket.id === selectedItem.id);

    if (searchedItem === undefined || searchedItem.item === 0) {
        return
    }else {
        searchedItem.item -= 1;
    }

    // console.log(basket);
    update(selectedItem.id);
    
    // remove item from basket with number of item is zero 
    basket = basket.filter(itemInBasket => itemInBasket.item !== 0);
    console.log(basket);

    // finally set basket to localStorage
    localStorage.setItem("data", JSON.stringify(basket));
}

// if user clicks plus or minus, update data on searchItem
let update = (id) => {
    let searchItem = basket.find(itemInBasket => itemInBasket.id === id);
    // console.log(searchItem.item);
    document.getElementById(id).innerHTML = searchItem.item;

    // User clicks increment or decrement icon everytime calculation() will call.
    calculation();
}

// to calculate total item and show notification on cart icon
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map(eachItemInBasket => eachItemInBasket.item).reduce((prev, next) => prev + next, 0);
}

// if page load, calculation will call 
calculation();