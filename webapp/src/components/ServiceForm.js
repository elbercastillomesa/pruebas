import { useState } from "react"
import { useServiceContext } from '../hooks/useServiceContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ServiceForm = () => {

    const { dispatch } = useServiceContext()
    const { user } = useAuthContext()

    const [identificacion, setID] = useState('')
    const [servicio , setService] = useState('')    
    const [fechaInicio , setInitialDate] = useState('')
    const [ultimaFacturacion  , setLastPayroll] = useState('')
    const [ultimoPago  , setLastPayment] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState( [] )
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('The user should be logged in')
            return
        }

        const service = { identificacion, servicio, fechaInicio, ultimaFacturacion, ultimoPago }

        const requestOptions = {
            method: 'POST',            
            body: JSON.stringify(service),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },            
        };

        fetch('http://localhost:4000/services', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = data || response.status;
                    return Promise.reject(error);
                }

                if (response.ok) {
                    setID('')
                    setService('')
                    setInitialDate('')
                    setLastPayroll('')
                    setLastPayment('')                    
                    setError(null)
                    setEmptyFields( [] )
                    dispatch({
                        type: 'CREATE_MOVIE', 
                        payload: data
                    })
                }
            })
            .catch(error => {
                setError(error.error)
                setEmptyFields(error.emptyFields)
            });
    }

    return (

        <form className="create" onSubmit={handleSubmit}>
            <h3>Nuevo Servicio</h3>

            {error && <div className="error">{error}</div>}

            <label>ID</label>
            <input
                type="text"
                onChange={ (e) => setID(e.target.value) }
                value={identificacion}
                className={emptyFields.includes('identificacion') ? 'error' : '' }
            />

            <label>Servicio</label>
            <select 
                onChange={ (e) => setService(e.target.value) }
                value={servicio}
                className={emptyFields.includes('servicio') ? 'error' : '' }
            >
              <option value="internet200">Internet 200 MB</option>
              <option value="internet400">Internet 400 MB</option>
              <option value="internet600">Internet 600 MB</option>
              <option value="dtv">Directv Go</option>
              <option value="paramount">Paramount+</option>
              <option value="win">Win+</option>
            </select>

            <label>Fecha Inicio</label>
            <input
                type="date"               
                onChange={ (e) => setInitialDate(e.target.value) }
                value={fechaInicio}
                className={emptyFields.includes('fechaInicio') ? 'error' : '' }
            />

            <label>Ultima Facturacion</label>
            <input
                type="date"
                onChange={ (e) => setLastPayroll(e.target.value) }
                value={ultimaFacturacion}
                className={emptyFields.includes('ultimaFacturacion') ? 'error' : '' }
            />

            <label>Ultimo Pago</label>
            <input
                type="date"
                onChange={ (e) => setLastPayment(e.target.value) }
                value={ultimoPago}
                className={emptyFields.includes('ultimoPago') ? 'error' : '' }
            />

            <button>Agregar Servicio</button>

        </form>
    )
}

export default MoviesForm