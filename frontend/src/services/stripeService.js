import { API_URL } from "../constants";

function createPaymentIntent(total) {
    return fetch(`${API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
    })
        .then(res => res.json())
}

// function createCheckout() {
//     return fetch(`${API_URL}/api/checkout/create`, {
//         method: "POST",
//         headers: { 'Content-Type': "application/json"},
//         body: JSON.stringify({
//             items: [
//               { id: 1, quantity: 3 },
//               { id: 2, quantity: 1 },
//             ],
//           })
//     })
//         .then(resp => {
//             if(resp.ok) return resp.json()
//             return resp.json().then(json => Promise.reject(json))
//         })
//         .then(({ url}) => {
//             console.log(url);
//             window.location = url
//         })
//         .catch(e => {
//             console.log(e.error);
//         })
// }

export const stripeService = {
    createPaymentIntent
}