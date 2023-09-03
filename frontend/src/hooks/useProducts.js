import { useEffect, useReducer } from 'react'
import { productService } from '../services/productServices'
import { useSearchParams } from 'react-router-dom';

export default function useProducts() {

    const [searchParams, setSearchParams] = useSearchParams();

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
            case 'PAGECHANGE': {
                return {
                    ...state,
                    error: null,
                    loading: false,
                    currentPage: action.currentPage
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
        pageSize: 5,
        currentPage: 1
    })

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' });
        let query = '';
        searchParams.forEach((key, value) => {
            query = query + `${value}=${key}&`;
        })
        productService
            .getProducts(query)
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
        return () => {
            isCurrent = false
        }
    }, [searchParams])

  return [state, dispatch]
}
