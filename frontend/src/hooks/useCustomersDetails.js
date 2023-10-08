import React, { useEffect, useReducer } from 'react'
import { billingAddressService } from '../services/billingAddressService'
import { shippingAddressService } from '../services/shippingAddressService'

export default function useCustomersDetails() {

    let [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'LOADING': {
                return { 
                    ...state,
                    loading: true
                }
            }
            case 'BILLINGRESOLVED': {
                return {
                    ...state,
                    loading: false,
                    billingAddress: action.response,
                    error: null
                }
            }
            case 'SHIPRESOLVED': {
                return {
                    ...state,
                    loading: false,
                    shippingAddress: action.response,
                    error: null
                }
            }
            case 'ERROR': {
                return {
                    ...state,
                    loading: false,
                    response: null,
                    error: action.error
                }
            }
            case 'UPDATE': {
                return {
                    ...state,
                    loading: false,
                    response: action.response,
                    error: null
                }
            }
            default: 
                return state
        }
    }, {
        loading: false,
        error: null,
        shippingAddress: {
                familyname: "",
                surname: "",
                city: "",
                street: "",
                house_number: "",
                postal_code: "",
                tax_number: ""
            },
        billingAddress: {
                familyname: "",
                surname: "",
                city: "",
                street: "",
                house_number: "",
                postal_code: "",
                tax_number: ""
            }
        }        
    )

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING'})
        billingAddressService
            .getBillingAddress()
            .then(billdata => dispatch({ type: 'BILLINGRESOLVED', response: billdata}))
        return () => {
            isCurrent = false
        }

    }, [])

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING'})
        shippingAddressService  
            .getShippingAddress()
            .then(shipdata => dispatch({ type: 'SHIPRESOLVED', response: shipdata}))
        return () => {
            isCurrent = false
        }

    }, [])

  return [state, dispatch]
}
