import { renderOrderSummary } from './checkout/orderSummary.js';
import {paymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';

renderCheckoutHeader();
renderOrderSummary();
paymentSummary();