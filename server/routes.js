// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();


const reservacion = [

  {
    _id: '01',
    Nombre: '',
    Apellido: '',
    Correo: '',
    Telefono: '',
    Fecha: '',
    Hora: '',
    Mesa: '',
    NumPersonas: '',
    Servicio: ''
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( reservacion );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const reservaciones = {
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Correo: req.body.Correo,
    Telefono: req.body.Telefono,
    Fecha: req.body.Fecha,
    Hora: req.body.Hora,
    Mesa: req.body.Mesa,
    NumPersonas: req.body.NumPersonas,
    Servicio: req.body.Servicio
  };

  reservacion.push( reservaciones );

  console.log(reservacion);


  res.json({
    ok: true,
    reservaciones
  });
});



module.exports = router;