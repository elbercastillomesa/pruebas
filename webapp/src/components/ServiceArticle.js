import React, { useState } from 'react';
import { useServiceContext } from '../hooks/useServiceContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Service = ({ service }) => {

  const { dispatch } = useServiceContext()
  const { user } = useAuthContext()

  const [editing, setEditing] = useState(false);
  let [formData, setFormData] = useState(service);
  const [error, setError] = useState(null)

  const serviceDate = (date) => {
    let serviceDate = date && new Date(date).toISOString().slice(0, 10)
    return serviceDate
  };

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

    const creationDate = serviceDate(formData.creationDate)
    formData = { ...formData, creationDate }

    requestOptions.body = JSON.stringify(formData)
    requestOptions.method = 'PATCH'

    fetch('http://localhost:4000/services/' + service.id, requestOptions)
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
            type: 'UPDATE_SERVICE',
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
    
    if(!user) {
      setError('The user should be logged in')
      return
    }

    requestOptions.method = 'DELETE'

    fetch('http://localhost:4000/services/' + service.id, requestOptions)
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
            type: 'DELETE_SERVICE',
            payload: service
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
        <article className="service-details">
          <form className="editing" onSubmit={handleUpdate}>
            
            <h3>Edita el servicio</h3>

            {error && <div className="error">{error}</div>}

            <label>ID</label>
            <input
                type="text"
                name="identificacion"
                value={formData.identificacion }
                onChange={handleChange}
            />

            <label>Servicio</label>
            <select value={formData.servicio } onChange={handleChange} name="servicio">
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
              name="fechaInicio"
              value={serviceDate(formData.fechaInicio )}
              onChange={handleChange}
            />

            <label>Ultima Facturacion</label>
            <input
              type="date"
              name="ultimaFacturacion"
              value={serviceDate(formData.ultimaFacturacion )}
              onChange={handleChange}
            />

            <label>Ultimo Pago</label>
            <input
              type="date"
              name="ultimoPago"
              value={serviceDate(formData.ultimoPago )}
              onChange={handleChange}
            />

            <button>Guardar</button>
            <button type="button" className='discard' onClick={cancelEdit}>Descartar</button>
          </form>
        </article>
      ) : (
        <article className="service-details">
          <div className='details'>            
            <h4>{service.identificacion}</h4>
            <p>Ultima Facturacion: {serviceDate(service.ultimaFacturacion )}</p>
          </div>
          <div className='actions'>
            <button type="button" className='edit' onClick={handleEdit}>
              Editar servicio
            </button>
            <span className='delete' onClick={handleDelete}>Borrar</span>
          </div>
        </article>
      )}
    </div>
  )
}

export default Service