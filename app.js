let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Potato',
        image: 'https://www.thesenior.com.au/images/transform/v1/crop/frm/172374647/732e67e9-8c4d-44b0-bf6e-7947c11c2974.jpeg/r0_0_5000_2811_w1200_h678_fmax.jpg',
        price: 40
    },
    {
        id: 2,
        name: 'Tomato',
        image: 'https://img2.exportersindia.com/product_images/bc-full/2019/10/6584025/fresh-tomato-1571037554-5115005.jpeg',
        price: 30
    },
    {
        id: 3,
        name: 'Onion',
        image: 'https://5.imimg.com/data5/ES/NA/MY-10133939/big-size-onion-500x500.jpg',
        price: 35
    },
    {
        id: 4,
        name:  'Small Onions',
        image: 'https://www.greendna.in/cdn/shop/products/onion_e5012b99-3371-4b2c-a690-d06dc409a6d5_1200x1200.jpg?v=1594886707',
        price: 20
    },
    {
        id: 5,
        name: 'Garlic',
        image: 'https://hawthornfarm.ca/cdn/shop/files/music10_1024x1024@2x.jpg?v=1691163112',
        price: 32
    },
    {
        id: 6,
        name: 'Lemon',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWi78W4GmPTiQfxGmQD9XXaIKY8aIME2Oscg&usqp=CAU',
        price: 20
    },
    {
        id: 7,
        name: 'Honey',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl5gTgjmiNhjb6_zJh61AG6hHWFaPeIczbrA&usqp=CAU',
        price: 50
    },
    {
        id: 8,
        name: 'Vegetable oil',
        image: 'https://cdn.cdnparenting.com/articles/2021/03/16184136/1680944782.webp',
        price: 80
    },
    {
        id: 9,
        name: 'Curd',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMl8KAGbZgbzM3OIHGT7bYCtqwnf-3RbCE9A&usqp=CAU',
        price: 30
    },
    {
        id: 10,
        name: 'Butter',
        image: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/04/butter-curls-1296x728-header.jpg?w=1155&h=1528',
        price: 50
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}