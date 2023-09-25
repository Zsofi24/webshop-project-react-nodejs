import { API_URL } from "../constants";

function getBillingAddress() {
    return fetch(`${API_URL}/api/billing-addresses/user`, {
        credentials: 'include'
    })
        .then(resp => resp.json())

}

export const billingAddressService = {
    getBillingAddress

}