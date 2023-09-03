import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { categoryService } from '../services/categoryService';

export default function useCategory() {

    const { categoryid } = useParams();

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
        categories: null,
        error: null
    })

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' })
        categoryService
            .getOneCategory(categoryid)
            .then(category => {
                if(isCurrent) {
                    dispatch({ type: 'RESOLVED', response: category})
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
