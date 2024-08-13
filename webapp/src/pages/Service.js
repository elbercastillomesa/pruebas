import { useEffect } from 'react'
import { useServiceContext } from '../hooks/useServiceContext'
import ServiceArticle from '../components/ServiceArticle'
import ServiceForm from '../components/ServiceForm'
import { useAuthContext } from '../hooks/useAuthContext'

const Service = () => {

    const {service, dispatch} = useServiceContext()
    const { user } = useAuthContext()

    useEffect( 
        () => {
            const fetchServices = async () => {
                const response = await fetch(
                    'http://localhost:4000/services',
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    }
                )
                const json = await response.json()

                if (response.ok) {
                    dispatch({
                        type: 'GET_SERVICES', 
                        payload: json
                    })
                }
            }
            
            if (user) {
                fetchServices()
            }            
        }, 
        [dispatch, user]
    )

    const servicesIterator = () => {
        return service?.map(
            (service) => (                
                <ServiceArticle key={service.id} service={service} />
            )
        )
    }

    return (        
        <section className="service-tab">
            <div className="service-list">
                {servicesIterator()}
            </div>            
            <ServiceForm />
        </section>
    )
}

export default Service;