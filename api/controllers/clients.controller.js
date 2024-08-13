const Clients = require('../models/clients.model');
const Services = require('../models/services.model');


// GET All
const getAllClients = async (req, res) => {

    const user_id = req.user.identificacion
    
    const clients = await Clients.findAll({
        where: {
            ...req.query,
            user_id
        },
        order: [['createdAt', 'DESC']] 
      });

    res.status(200).send(clients)
}

// GET single
const getClient = async (req, res) => {
    const { id } = req.params

    const client = await Services.findOne({ 
        where: { identificacion: id } 
    })

    if (!client) {
        return  res.status(404).send(
            {error : "The Client ID was not found."}
        )
    }

    res.status(200).send(client)
}

// POST single
const createClient = async (req, res) => {

    const {identificacion, nombres, apellidos, tipoIdentificacion, fechaNacimiento, numeroCelular, correoElectronico} = req.body

    let emptyFields = []

    if(!identificacion) { emptyFields.push('identificacion') }
    if(!nombres) { emptyFields.push('nombres') }
    if(!apellidos) { emptyFields.push('apellidos') }
    if(!tipoIdentificacion) { emptyFields.push('tipoIdentificacion') }
    if(!fechaNacimiento) { emptyFields.push('fechaNacimiento') }
    if(!numeroCelular) { emptyFields.push('numeroCelular') }
    if(!correoElectronico) { emptyFields.push('correoElectronico') }

    if(emptyFields.length > 0) { 
        return res.status(400).send({ 
            error: 'Please fill all fields.',
            emptyFields
        })
    }

    try {
        const identificacion = req.user.identificacion
        const client = await Clients.create({identificacion, nombres, apellidos, tipoIdentificacion, fechaNacimiento, numeroCelular, correoElectronico})
        res.status(200).send(client)

    } catch (error) {
        res.status(400).send(
            {error : error.message}
        )
    }
}

// DELETE single
const deleteClient = async (req, res) => {
    const { id } = req.params

    const client = await Clients.destroy({ 
        where: { identificacion: id } 
    })

    console.log(client)

    if (client == false) {
        return  res.status(400).send(
            {error : "The Client ID was not found."}
        )
    }

    res.sendStatus(200).send(client)
}

// UPDATE single
const updateClient = async (req, res) => {
    const { identificacion } = req.params
    const { nombres, apellidos, tipoIdentificacion, fechaNacimiento, numeroCelular, correoElectronico} = req.body    
    let emptyFields = []

    if(!identificacion) { emptyFields.push('identificacion') }
    if(!nombres) { emptyFields.push('nombres') }
    if(!apellidos) { emptyFields.push('apellidos') }
    if(!tipoIdentificacion) { emptyFields.push('tipoIdentificacion') }
    if(!fechaNacimiento) { emptyFields.push('fechaNacimiento') }
    if(!numeroCelular) { emptyFields.push('numeroCelular') }
    if(!correoElectronico) { emptyFields.push('correoElectronico') }

    if(emptyFields.length > 0) { 
        return res.status(400).send({ 
            error: 'Please fill all fields.',
            emptyFields
        })
    }

    try {
        const client = await Clients.update(
            {identificacion, nombres, apellidos, tipoIdentificacion, fechaNacimiento, numeroCelular, correoElectronico},
            { where: { identificacion: identificacion } }
        );

        if (client == false) {
            return  res.status(400).send(
                {error : "The Client ID was not found."}
            )
        }
    
        res.status(200).send(client)
        
    } catch (error) {
        res.status(400).send(
            {error : error.message}
        )        
    }    
}

module.exports = {
    getAllClients,
    getClient,
    createClient,
    deleteClient,
    updateClient
}