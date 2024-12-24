export var cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
 cart =  [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2
    },{
        productId:  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1
    }
];
}



function saveToCart() {
  localStorage.setItem("cart",JSON.stringify(cart));
}

export function addtocart(productId) {
  
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  ).value;
  
  
  var matcheditem;
  cart.forEach((item)=>{
      if(item.productId === productId){
        matcheditem = item;
      }
  })
  if (matcheditem) {
    matcheditem.quantity += Number(quantitySelector);
  }else{
  cart.push({
    productId : productId,
    quantity: Number(quantitySelector)
  });
}

  saveToCart();
}

export function removeFromCart(productId) {
  
  const newCart = [];

  cart.forEach((item)=>{
    if(item.productId !== productId){
      newCart.push(item);
    }
  })

  cart = newCart;
  console.log(cart);
  saveToCart();

}