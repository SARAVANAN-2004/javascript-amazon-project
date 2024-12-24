import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import  { getDeliveryOption } from '../../data/deleveryOptions.js';
import {formatCurreny} from '../utils/money.js'
export function paymentSummary() {
    let productPriceCent = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId);
        productPriceCent += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
        shippingPriceCents += deliveryOption.priceCents;

    });

    const totalBeforeTaxCents = productPriceCent + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;
    
    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            $${formatCurreny(productPriceCent)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurreny(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurreny(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurreny(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurreny(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

          document.querySelector(".js-payment-summary")
          .innerHTML = paymentSummaryHTML;

}