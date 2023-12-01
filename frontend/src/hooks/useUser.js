import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../services/userServices';
import { orderServices } from '../services/orderServices';

export default function useProduct() {

    const { userid } = useParams();

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
            case 'ORDERRESOLVED': {
                return {
                    ...state,
                    loading: false,
                    error: null,
                    orders: action.orders
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
        response: {
              id: "",
              isAdmin: false,
              username: "",
              email: "",
              created: "",
              password: ""
            },
        orders: null,
        error: null
    })

    useEffect(() => {
        let isCurrent = true;
        if(userid) {
            dispatch({ type: 'LOADING' })
            userService
                .getUserById(userid)
                .then(user => {
                    if(isCurrent) {
                        dispatch({ type: 'RESOLVED', response: user})
                    }
                })
                .catch(error => {
                    dispatch({ type: 'ERROR', error })
                })
        }
        return () => {
            isCurrent = false
        }
    }, [])

    useEffect(() => {
        let isCurrent = true;
        dispatch({ type: 'LOADING' })
        orderServices
            .getUserOrdersById(userid)
            .then(orders => {
                if(isCurrent) {
                    dispatch({ type: 'ORDERRESOLVED', orders: orders})
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
