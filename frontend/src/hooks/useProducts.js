import { useEffect, useReducer } from 'react'
import { productService } from '../services/productServices'

export default function useProducts() {

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
        productService
            .getProducts()
            .then(products => {
                if(isCurrent) {
                    dispatch({ type: 'RESOLVED', response: products})
                }
            })
            .catch(error => {
                dispatch({ type: 'ERROR', error })
            })
        return () => {
            isCurrent = false
        }
    }, [])

  return [state.loading, state.response, state.error]
}
