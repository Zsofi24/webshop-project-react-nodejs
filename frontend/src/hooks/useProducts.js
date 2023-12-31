import { useEffect, useReducer } from 'react'
import { productService } from '../services/productServices'
import { useSearchParams } from 'react-router-dom';

export default function useProducts() {

    const [searchParams] = useSearchParams();

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
                    total: action.total,
                    totalPages: action.totalPages,
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
            case 'DELETE': {
                return {
                    ...state,
                    loading: false,
                    response: action.response,
                    error: null
                }
            }
            case 'PAGECHANGE': {
                return {
                    ...state,
                    error: null,
                    loading: false,
                    page: action.page
                }
            }
            default: 
                return state
        }
    }, {
        loading: false,
        response: null,
        error: null,
        total: null,
        totalPages: 1,
        pageSize: 10,
        page: 1
    })

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' });
        let timeout = searchParams.get("q") ? 1500 : 1
        let timer = setTimeout(() => {
        productService
            .getProducts(searchParams)
            .then(products => {
                if(isCurrent) {
                        dispatch({ 
                            type: 'RESOLVED', 
                            response: products.products, 
                            total: products.total,
                            totalPages: (Math.ceil(products.total / state.pageSize))
                        })

                    }
                })
                .catch(error => {
                    dispatch({ type: 'ERROR', error })
                })
        }, timeout)
        return () => {
            clearTimeout(timer)
            isCurrent = false

        }
    }, [searchParams])

  return [state, dispatch]
}
