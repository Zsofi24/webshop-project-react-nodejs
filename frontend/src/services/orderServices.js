import { API_URL } from "../constants";

function sendOrder(userid, cart) {
    return fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        body: JSON.stringify(userid),
        headers: {"Content-Type": "application/json"}
    })
    .then(resp => resp.json())
    .then(respData => {
            return (fetch(`${API_URL}/api/orders-products`, {
                method: 'POST',
                body: JSON.stringify({orderid: respData.id, cart}),
                headers: {"Content-Type": "application/json"}
            }))
            .then(resp => resp.json());
        })
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