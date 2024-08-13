import { useEffect } from 'react'
import { useClientContext } from '../hooks/useClientContext' 
import ClientArticle from '../components/ClientArticle'
import ClientForm from '../components/ClientForm'
import { useAuthContext } from '../hooks/useAuthContext'

const Client = () => {

    const {clients, dispatch} = useClientContext()
    const { user } = useAuthContext()

    useEffect( 
        () => {
            const fetchClients = async () => {
                const response = await fetch(
                    'http://localhost:4000/clients',
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    }
                )
                const json = await response.json()

                if (response.ok) {
                    dispatch({
                        type: 'GET_CLIENTS',
                        payload: json
                    })
                }
            }
            
            if (user) {
                fetchClients()
            }
        }, 
        [dispatch, user]
    )

    const clientIterator = () => {
        return clients?.map(
            (client) => (                
                <ClientArticle key={client.id} client={client} />
            )
        )
    }

    return (        
        <section className="client-tab">
            <div className="client-list">
                {clientIterator()}
            </div>
            <ClientForm />
        </section>                
    )
}

export default Client;