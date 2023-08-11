function sendOrder(userid, cart) {
    return fetch(`http://localhost:3031/api/orders`, {
        method: 'POST',
        body: JSON.stringify(userid),
        headers: {"Content-Type": "application/json"}
    })
    .then(resp => resp.json())
    .then(respData => {
            return (fetch(`http://localhost:3031/api/orders-products`, {
                method: 'POST',
                body: JSON.stringify({orderid: respData.id, cart}),
                headers: {"Content-Type": "application/json"}
            }))
            .then(resp => resp.json());
        })
}

function getUserOrders() {
    return fetch(`http://localhost:3031/api/orders/user`, {
        credentials: 'include'
    })
    .then(resp => resp.json())
}

export const orderServices = {
    sendOrder,
    getUserOrders
}