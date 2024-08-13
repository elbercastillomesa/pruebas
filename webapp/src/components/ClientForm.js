import { useState } from "react"
import { useClientContext } from "../hooks/useClientContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ClientForm = () => {

    const { dispatch } = useClientContext()
    const { user } = useAuthContext()
    
    const [identificacion  , setID] = useState('')
    const [nombres , setName] = useState('')
    const [apellidos  , setLastName] = useState('')
    const [tipoIdentificacion , setIDType] = useState('')
    const [fechaNacimiento , setDOB] = useState('')
    const [numeroCelular , setPhone] = useState('')
    const [correoElectronico , setEmail] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState( [] )

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('The user should be logged in')
            return
        }

        const client = {identificacion, nombres, apellidos, tipoIdentificacion, fechaNacimiento, numeroCelular, correoElectronico}

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }, 
        };

        fetch('http://localhost:4000/clients', requestOptions)
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
                    setName('')
                    setLastName('')
                    setIDType('')
                    setDOB('')
                    setPhone('')
                    setError(null)
                    setEmptyFields( [] )
                    dispatch({
                        type: 'CREATE_CLIENT',
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
            <h3>Agregar Cliente</h3>

            { error && <div className="error">{error}</div> }

            <label>ID</label>
            <input
                type="text"
                onChange={ (e) => setID(e.target.value) }
                value={identificacion}
                className={emptyFields.includes('identificacion') ? 'error' : '' }
            />

            <label>Tipo ID</label>
            <select 
                value={tipoIdentificacion}
                onChange={ (e) => setIDType(e.target.value) }
                className={emptyFields.includes('tipoIdentificacion') ? 'error' : '' }
            >
                <option value="CC">Cedula</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cedula de Extranjeria</option>
                <option value="RC">Registro Civil</option>
            </select>

            <label>Nombres</label>
            <input
                type="text"
                onChange={ (e) => setName(e.target.value) }
                value={nombres}
                className={emptyFields.includes('nombres') ? 'error' : '' }
            />

            <label>Apellidos </label>
            <input
                type="text"
                onChange={ (e) => setLastName(e.target.value) }
                value={apellidos}
                className={emptyFields.includes('apellidos') ? 'error' : '' }
            />

            <label>Fecha de Nacimiento</label>
            <input
                type="date"                            
                onChange={ (e) => setDOB(e.target.value) }
                value={fechaNacimiento}
                className={emptyFields.includes('fechaNacimiento') ? 'error' : '' }
            />

            <label>Numero de Celular</label>
            <input
                type="number"
                onChange={ (e) => setPhone(e.target.value) }
                value={numeroCelular}
                className={emptyFields.includes('numeroCelular') ? 'error' : '' }
            />

            <label>Correo Electronico</label>
            <input
                type="text"
                onChange={ (e) => setEmail(e.target.value) }
                value={correoElectronico}
                className={emptyFields.includes('correoElectronico') ? 'error' : '' }
            />

            <button>Agregar</button>

        </form>
    )
}

export default ClientForm