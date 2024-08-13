import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setisLoading(true)
        setError(null)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        };

        fetch('http://localhost:4000/user/login', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = data || response.status;
                    return Promise.reject(error);
                }

                if (response.ok) {
                    // Save user to local storage
                    localStorage.setItem('user', JSON.stringify(data))

                    // Update the auth context
                    dispatch({
                        type: 'LOGIN',
                        payload: data
                    })

                    setisLoading(false)
                    //setError(null)
                }
            })
            .catch(error => {
                setisLoading(false)
                setError(error.error)
            });
    }

    return { login, isLoading, error }
}