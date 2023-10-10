import { useEffect, useReducer } from "react";
import { orderServices } from "../services/orderServices";

export default function useUserOrders() {

    let [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'LOADING': {
                    return { ...state, loading: true }
            }
            case 'RESOLVED': {
                return {
                    ...state,
                    loading: false,
                    response: action.response,
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
            default: 
                return state
        }
    }, {
        loading: false,
        response: null,
        error: null
    })

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' })
        orderServices
            .getUserOrders()
            .then(orders => {
                if(isCurrent) {
                    dispatch({ type: 'RESOLVED', response: orders })
                }
            })
            .catch(error => dispatch({ type: 'ERROR', error }))
        return () => isCurrent = false;
    }, [])

    return [state, dispatch]
}
