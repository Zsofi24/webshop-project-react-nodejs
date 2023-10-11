import { useEffect, useReducer } from "react";
import { orderServices } from "../services/orderServices";
import { useParams } from "react-router-dom";

export default function useUserOrders() {

    const { orderid } = useParams();

    let [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'LOADING': {
                    return { ...state, loading: true }
            }
            case 'ORDERS': {
                return {
                    ...state,
                    loading: false,
                    orders: action.orders,
                    error: null
                }
            }
            case 'ORDER': {
                return {
                    ...state,
                    loading: false,
                    order: action.order,
                    error: null
                }
            }
            case 'ERROR': {
                return {
                    ...state,
                    loading: false,
                    orders: null,
                    error: action.error
                }
            }
            default: 
                return state
        }
    }, {
        loading: false,
        orders: null,
        order: null,
        error: null
    })

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' })
        orderServices
            .getUserOrders()
            .then(orders => {
                if(isCurrent) {
                    dispatch({ type: 'ORDERS', orders })
                }
            })
            .catch(error => dispatch({ type: 'ERROR', error }))
        return () => isCurrent = false;
    }, [])


    useEffect(() => {
        let isCurrent = true;
        if(orderid) {
            dispatch({ type: 'LOADING' })
            orderServices
                .getOrder(orderid)
                .then(order => {
                    if(isCurrent) {
                        dispatch({ type: 'ORDER', order })
                    }
                })
                .catch(error => dispatch({ type: 'ERROR', error }))
    
        }
        return () => isCurrent = false;
    }, [])

    return [state, dispatch]
}
