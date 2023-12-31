import React, { useEffect, useReducer } from 'react'
import { categoryService } from '../services/categoryService'
import { useSearchParams } from 'react-router-dom';

export default function useCategories() {

    const [searchParams, setSearchParams] = useSearchParams();

    let [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'LOADING': {
                return {
                    ...state,
                    loading: true
                }
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
        pageSize: 5,
        page: 1
    })

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' });
        // let query = '';
        // searchParams.forEach((key, value) => {
        //     query = query + `${value}=${key}&`;
        // })
        categoryService
            .getCategories(searchParams)
            .then(categories => {
                if(isCurrent) {
                    dispatch({ 
                        type: 'RESOLVED', 
                        response: categories.categories,
                        total: categories.total,
                        totalPages: (Math.ceil(categories.total / state.pageSize))
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
