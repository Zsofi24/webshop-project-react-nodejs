import { API_URL } from "../constants";

function getShippingAddress() {
    return fetch(`${API_URL}/api/shipping-addresses/user`, {
        credentials: 'include'
    })
        .then(resp => resp.json())

}

export const shippingAddressService = {
    getShippingAddress
}