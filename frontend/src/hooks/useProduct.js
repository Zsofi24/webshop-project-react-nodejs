import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/productServices';
import { categoryService } from '../services/categoryService';

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
            case 'CATEGORYRESOLVED': {
                return {
                    ...state,
                    loading: false,
                    error: null,
                    categories: action.categories
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
        categories: null,
        error: null
    })

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' })
        productService
            .getOneProduct(productid)
            .then(product => {
                console.log(product, "prod");
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

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' })
        categoryService
            .getCategories()
            .then(categories => {
                console.log(categories, "cat");
                if(isCurrent) {
                    dispatch({ type: 'CATEGORYRESOLVED', categories})
                }
            })
            .catch(error => {
                dispatch({ type: 'ERROR', error })
            })
        return () => {
            isCurrent = false
        }
    }, [])

  return [state, dispatch]
}
