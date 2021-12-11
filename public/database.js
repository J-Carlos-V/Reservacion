const reservacionDB = window.indexedDB;

const form = document.getElementById('form')

if (reservacionDB) {
    let database
    const request = reservacionDB.open('ReservacionesDB', 1)

    request.onsuccess = () => {
        database = request.result
        console.log('OPEN', database)
    } 

    request.onupgradeneeded = () => {
        database = request.result
        console.log('Create', database)
        const objectStore = database.createObjectStore('reservaciones',{
            autoIncrement: true
        })
    }

    request.onerror = (error) => {
        console.log('Error', error)
    }

    const addData = (data) => {
        const transaction = database.transaction(['reservaciones'],
        'readwrite')
        const objectStore = transaction.objectStore('reservaciones');
        const request = objectStore.add(data)
    }

    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        const data ={
            Nombre: e.target.nombre.value,
            Apellido: e.target.apellido.value,
            Correo: e.target.correo.value,
            Telefono: e.target.telefono.value,
            Fecha: e.target.fecha.value,
            Hora: e.target.tiempo.value,
            Mesa: e.target.mesa.value,
            NumPersonas: e.target.numpersonas.value,
            Servicio: e.target.servicio.value
        }
        console.log(data)
        addData(data)
    })
}