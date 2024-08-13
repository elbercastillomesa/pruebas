import { ServiceContext } from "../context/ServiceContext";
import { useContext } from "react";

export const useServiceContext = () => {

    const context = useContext(ServiceContext)
    
    if (!context) {
        throw Error('useServiceContext must be used inside a ServiceContextProvider')
    }

    return context
}