import { cart , removeFromCart , 
  calculateCartQuantity, updateQuantity,
updateDeliveryOption} from "../../data/cart.js";
import {products , getProduct} from "../../data/products.js"
import { formatCurreny } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions, getDeliveryOption } from "../../data/deleveryOptions.js";

import {paymentSummary} from './paymentSummary.js'


export function renderOrderSummary(){
var cartSummary = "";
cart.forEach((cartItems)=>{
    const productId = cartItems.productId;

    var matchedProduct = getProduct(productId);
    var deliveryOptionId = cartItems.deliveryOptionsId;

    var deliveryOption = getDeliveryOption(deliveryOptionId);
    
   


    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");


    
    cartSummary += `<div class="cart-item-container
     js-cart-item-container-${matchedProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString};
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchedProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchedProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurreny(matchedProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchedProduct.id}">${cartItems.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary 
                  js-update-link"
                  data-product-id = "${matchedProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchedProduct.id}">
            <span class="save-quantity-link link-primary js-save-link"
            data-product-id = "${matchedProduct.id}"
            >Save</span>
                  <span class="delete-quantity-link link-primary
                   js-delete-link"
                   data-product-id = "${matchedProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                ${deliveryOptionsHTML(matchedProduct,cartItems)}
                
                
              </div>
            </div>
          </div>`
          
});

function deliveryOptionsHTML(matchedProduct,cartItems) {
    let html = ``;
    deliveryOptions.forEach((deliveryOption)=>{

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,"days");
      
      const dateString = deliveryDate.format("dddd, MMMM D");
      
      const priceString  = deliveryOption.priceCents === 0? 
      "Free": `$${formatCurreny(deliveryOption.priceCents)} -`
      
      const isChecked = deliveryOption.id === cartItems.
      deliveryOptionsId;
    
      html +=  `
    <div class="delivery-option
    js-delivery-option"
    data-product-id = "${matchedProduct.id}"
    data-delivery-option-id = "${deliveryOption.id}">
      <input type="radio"  
      ${isChecked ? "checked":""}
      class="delivery-option-input"
        name="delivery-option-${matchedProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
              
  `
})
    return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummary;


document.querySelectorAll(".js-delete-link").forEach((link)=>{

  link.addEventListener("click",()=>{
    
    const deleteId = link.dataset.productId;
    removeFromCart(deleteId);
    
    const container = document.querySelector(`.js-cart-item-container-${deleteId}`);
    container.remove();
    updateCartQuantity();
    paymentSummary();
  })
})

updateCartQuantity();
function updateCartQuantity() {
      var cartQuantity = calculateCartQuantity();
      
      document.querySelector(".js-return-to-home-link")
            .innerHTML = `${cartQuantity} items`;
}

document.querySelectorAll(".js-update-link")
  .forEach((link)=>{
    link.addEventListener("click",()=>{
      const productId = link.dataset.productId
      

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add("is-editing-quantity");
        
      
    })
  })

  document.querySelectorAll(".js-save-link")
  .forEach((link)=>{
    link.addEventListener("click",()=>{
      const productId = link.dataset.productId;
      console.log(productId);

      const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove("is-editing-quantity");

      updateQuantity(productId,newQuantity);
      updateCartQuantity();
      
      document.querySelector(`.js-quantity-label-${productId}`) .innerHTML = newQuantity;
    })
  })

  document.querySelectorAll(".js-delivery-option")
    .forEach((element)=>{
      element.addEventListener("click",()=>{
        const {deliveryOptionId,productId} = element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        paymentSummary();
      })
    });

  }

  