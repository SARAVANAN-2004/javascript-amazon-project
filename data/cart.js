export var cart = [];

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
}