import { ClientContext } from "../context/ClientContext";
import { useContext } from "react";

export const useClientContext = () => {

    const context = useContext(ClientContext)

    if (!context) {
        throw Error('useClientContext must be used inside a ClientContextProvider')
    }

    return context
}