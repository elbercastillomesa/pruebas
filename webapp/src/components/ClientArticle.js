import React, { useState } from 'react';
import { useClientContext } from '../hooks/useClientContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ClientArticle = ({ client }) => {

    const { dispatch } = useClientContext()
    const { user } = useAuthContext()

    const [editing, setEditing] = useState(false);
    let [formData, setFormData] = useState(client);
    const [error, setError] = useState(null)

    const handleEdit = () => {
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    let requestOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('The user should be logged in')
            return
        }

        requestOptions.body = JSON.stringify(formData)
        requestOptions.method = 'PATCH'

        fetch('http://localhost:4000/clients/' + client.id, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.error) || response.status;
                    return Promise.reject(error);
                }

                if (response.ok) {
                    setEditing(false);
                    dispatch({
                        type: 'UPDATE_CLIENT',
                        payload: formData
                    })
                }
            })
            .catch(error => {
                setError(error)
                console.error('There was an error!', error);
            });
    };

    const handleDelete = async () => {

        if (!user) {
            setError('The user should be logged in')
            return
        }

        requestOptions.method = 'DELETE'

        fetch('http://localhost:4000/clients/' + client.id, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.error) || response.status;
                    return Promise.reject(error);
                }

                if (response.ok) {
                    dispatch({
                        type: 'DELETE_CLIENT',
                        payload: client
                    })
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (       
        <div>
            {editing ? (
                <article className="client-details">
                    <form className="editing" onSubmit={handleUpdate}>

                        <h3>Editar el Cliente</h3>

                        {error && <div className="error">{error}</div>}

                        <label>ID</label>
                        <input
                            type="text"
                            name="identificacion"
                            value={formData.identificacion }
                            onChange={handleChange}
                        />

                        <label>Tipo ID</label>
                        <select value={formData.tipoIdentificacion} onChange={handleChange} name="tipoIdentificacion">
                            <option value="CC">Cedula</option>
                            <option value="TI">Tarjeta de Identidad</option>
                            <option value="CE">Cedula de Extranjeria</option>
                            <option value="RC">Registro Civil</option>
                        </select>

                        <label>Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                        />

                        <label>Apellidos </label>
                        <input
                            type="text"
                            name="apellidos"
                            value={formData.apellidos }
                            onChange={handleChange}
                        />

                        <label>Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                        />

                        <label>Numero de Celular</label>
                        <input
                            type="number"
                            name="numeroCelular"
                            value={formData.numeroCelular }
                            onChange={handleChange}
                        />

                        <label>Correo Electronico</label>
                        <input
                            type="text"
                            name="correoElectronico"
                            value={formData.correoElectronico }
                            onChange={handleChange}
                        />

                        <button>Guardar Cambios</button>
                        <button type="button" className='discard' onClick={cancelEdit}>Descartar Cambios</button>
                    </form>
                </article>
            ) : (
                <article className="client-details">
                    <div className='details'>                        
                        <h4>{client.nombres} - {client.apellidos}</h4>
                        <p>Correo Electronico: {client.correoElectronico}</p>
                        <p>Numero de Celular: {client.numeroCelular}</p>
                    </div>
                    <div className='actions'>
                        <button type="button" className='edit' onClick={handleEdit}>
                            Editar Cliente
                        </button>
                        <span className='delete' onClick={handleDelete}>Borrar Cliente</span>
                    </div>
                </article>
            )}
        </div>
    )
}

export default ClientArticle