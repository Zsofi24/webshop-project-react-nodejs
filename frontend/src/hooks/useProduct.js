import { useEffect, useReducer } from 'react'
import { productService } from '../services/productServices'
import { useParams } from 'react-router-dom'

export default function useProduct() {

    const { productid } = useParams();

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
        response: null,
        error: null
    })

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' })
        productService
            .getOneProduct(productid)
            .then(product => {
                if(isCurrent) {
                    dispatch({ type: 'RESOLVED', response: product})
                }
            })
            .catch(error => {
                dispatch({ type: 'ERROR', error })
            })
        return () => {
            isCurrent = false
        }
    }, [])

  return [state.loading, state.response, state.error, dispatch]
}
