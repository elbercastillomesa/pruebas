const Clients = require('../models/clients.model');
const Services = require('../models/services.model');


// GET All
const getAllServices = async (req, res) => {

    const user_id  = req.user.id
    
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
const getService = async (req, res) => {
    const { identification } = req.params

    const service = await Services.findOne({ 
        where: { identification: identification } 
    })

    if (!service) {
        return  res.status(404).send(
            {error : "The Service ID was not found."}
        )
    }

    res.status(200).send(service)
}

// POST single
const createService = async (req, res) => {

    const {identificacion, ultimaFacturacion, ultimoPago, fechaInicio, servicio} = req.body

    let emptyFields = []

    if(!identificacion) { emptyFields.push('identificacion') }
    if(!ultimaFacturacion) { emptyFields.push('ultimaFacturacion') }
    if(!ultimoPago) { emptyFields.push('ultimoPago') }
    if(!fechaInicio) { emptyFields.push('fechaInicio') }
    if(!servicio) { emptyFields.push('servicio') }

    if(emptyFields.length > 0) { 
        return res.status(400).send({ 
            error: 'Please fill all fields.',
            emptyFields
        })
    }

    try {
        
        const service = await Services.create({identificacion, ultimaFacturacion, ultimoPago, fechaInicio, servicio})
        res.status(200).send(service)

    } catch (error) {
        res.status(400).send(
            {error : error.message}
        )
    }
}

// DELETE single
const deleteService = async (req, res) => {
    const { identificacion } = req.params

    const client = await Services.destroy({ 
        where: { identificacion: identificacion } 
    })

    console.log(service)

    if (service == false) {
        return  res.status(400).send(
            {error : "The Service ID was not found."}
        )
    }

    res.sendStatus(200).send(service)
}

// UPDATE single
const updateService = async (req, res) => {
    
    const { identificacion, ultimaFacturacion, ultimoPago, fechaInicio, servicio}  = req.body    
    let emptyFields = []

    if(!identificacion) { emptyFields.push('identificacion') }
    if(!ultimaFacturacion) { emptyFields.push('ultimaFacturacion') }
    if(!ultimoPago) { emptyFields.push('ultimoPago') }
    if(!fechaInicio) { emptyFields.push('fechaInicio') }
    if(!servicio) { emptyFields.push('servicio') }

    if(emptyFields.length > 0) { 
        return res.status(400).send({ 
            error: 'Please fill all fields.',
            emptyFields
        })
    }

    try {
        const service = await Services.update(
            {identificacion, ultimaFacturacion, ultimoPago, fechaInicio, servicio},
            { where: { identificacion: identificacion } }
        );

        if (service == false) {
            return  res.status(400).send(
                {error : "The Service ID was not found."}
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
    getAllServices,
    getService,
    createService,
    deleteService,
    updateService
}