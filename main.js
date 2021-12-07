let newServicesWorker;

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
        console.log('recargando');
    }
});

