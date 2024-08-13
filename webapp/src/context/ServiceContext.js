import { createContext, useReducer } from 'react'


export const ServiceContext = createContext()

export const serviceReducer = (state, action) => {
    switch(action.type) {
        case 'GET_SERVICES':
            return { 
                services: action.payload 
            }
        case 'CREATE_SERVICE':
            return { 
                services: [action.payload, ...state.services]
            }
        case 'DELETE_SERVICE':
            return {
                services: state.services.filter( (services) => services.id !== action.payload.id )
            }
        case 'UPDATE_SERVICE':            
            return {
                services: state.services.map(services => services.id === action.payload.id ? action.payload : services)
            }
        default:
            return state
    }
}

export const ServiceContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        serviceReducer, 
        { services: null }
        )

    return(
        <ServiceContext.Provider value={ {...state, dispatch} }>
            { children }
        </ServiceContext.Provider>
    )
}