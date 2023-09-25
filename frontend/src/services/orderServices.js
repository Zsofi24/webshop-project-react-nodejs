import { API_URL } from "../constants";

function sendOrder(userId, cart, total, shippingAddress , billingAddress) {
    return fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        body: JSON.stringify({ userId, total, cart, shippingAddress, billingAddress }),
        headers: {"Content-Type": "application/json"}
    })
    .then(resp => resp.json())
    // .then(respData => {
    //         return (fetch(`${API_URL}/api/orders-products`, {
    //             method: 'POST',
    //             body: JSON.stringify({orderid: respData.id, cart}),
    //             headers: {"Content-Type": "application/json"}
    //         }))
    //         .then(resp => resp.json());
    //     })
}

function getUserOrders() {
    return fetch(`${API_URL}/api/orders/user`, {
        credentials: 'include'
    })
    .then(resp => resp.json())
}

export const orderServices = {
    sendOrder,
    getUserOrders
}