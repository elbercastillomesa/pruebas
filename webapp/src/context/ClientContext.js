import { createContext, useReducer } from 'react'


export const ClientContext = createContext()

export const clientReducer = (state, action) => {
    switch(action.type) {
        case 'GET_CLIENTS':
            return { 
                clients: action.payload 
            }
        case 'CREATE_CLIENT':
            return { 
                clients: [action.payload, ...state.clients]
            }
        case 'DELETE_CLIENT':
            return {
                clients: state.clients.filter( (clients) => clients.id !== action.payload.id )
            }
        case 'UPDATE_CLIENT':            
            return {
                clients: state.clients.map(clients => clients.id === action.payload.id ? action.payload : clients)
            }
        default:
            return state
    }
}

export const ClientContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        clientReducer, 
        { clients: null }
        )

    return(
        <ClientContext.Provider value={ {...state, dispatch} }>
            { children }
        </ClientContext.Provider>
    )
}