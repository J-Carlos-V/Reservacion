/*let newServicesWorker;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>{
        navigator.serviceWorker.register('sw.js').then(
            registerEvent => {
                registerEvent.addEventListener('updatefound', () => {
                     newServicesWorker = registerEvent.installing;
                     newServicesWorker.addEventListener('statechange', () =>{
                         
                         switch (newServicesWorker.state) {
                             case 'installed':
                                showSnackbarUpdate();
                                 break;
                         }
                     });
                });
            }
        );
    });
}


function showSnackbarUpdate() {
    let x = document.getElementById("snackbar");
    x.className = "show";
  } 

  let launchUpdate = document.getElementById('launchUpdate');

  launchUpdate.addEventListener('click', () => {
	newServicesWorker.postMessage({
		action: 'skipWaiting'
	});
    for (let index = 0; index < 2; index++) {
        window.location.reload();
        window.location.reload();
        window.location.reload();
        console.log('recargando');
    }
});
*/

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
    
}

//obtener reserva del server


function getReservacion(){
    fetch('api')
    .then(res => res.json())
    .then( posts => {
        console.log(posts);
    })
}


getReservacion();

postBtn.on('click', function() {

    var mensaje = txtMensaje.val();
    if ( mensaje.length === 0 ) {
        cancelarBtn.click();
        return;
    }

    var data = {
        Nombre: Nombre,
        Apellido: Apellido,
        Correo: Correo,
        Telefono: Telefono,
        Fecha: Fecha,
        Hora: Hora,
        Mesa: Mesa,
        NumPersonas: NumPersonas,
        Servicio: Servicio
    };


    fetch('api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    })
    .then( res => res.json() )
    .then( res => console.log( 'app.js', res ))
    .catch( err => console.log( 'app.js error:', err ));



    

});
