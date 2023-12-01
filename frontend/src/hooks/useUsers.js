import { useEffect, useReducer } from 'react';
import { userService } from '../services/userServices';
import { useSearchParams } from 'react-router-dom';

export default function useUsers() {

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
        pageSize: 15,
        page: 1
    })

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' });
        let timeout = searchParams.get("q") ? 1500 : 1
        let timer = setTimeout(() => {
        userService
            .getUsers(searchParams)
            .then(users => {
                if(isCurrent) {
                        dispatch({ 
                            type: 'RESOLVED', 
                            response: users.users, 
                            total: users.total,
                            totalPages: (Math.ceil(users.total / state.pageSize))
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
