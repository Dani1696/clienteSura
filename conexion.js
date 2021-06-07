//RUTINA PARA IR AL SERVIDOR Y TRAER DATOS

//1. Definir la url conexion
let urlPost="https://accounts.spotify.com/api/token";

//2. Definir los datos que se envian al servidor POST(enviando datos)
let llave1="grant_type=client_credentials";
let llave2="client_id=35ffd21fd89e4d0f9a385183078aa4de";
let llave3="client_secret=1319a4e993424b48b04b03b15bdb977c";

//3. Construir la peticion a enviar
let peticionPost={
    method:"POST",
    headers:{"Content-Type": 'application/x-www-form-urlencoded'},//lleva informacion de un cliente a un servidor
    body:llave1+'&'+llave2+'&'+llave3//Datos a llevar
}

//4.Llamar al servidor
fetch(urlPost,peticionPost)
     .then(function(respuesta){
         return(respuesta.json())

     })
     .then(function(datos){
         //console.log(datos);
         //console.log(datos.access_token);
         //console.log(datos.token_type);
         let token=datos.token_type+" "+datos.access_token;
         console.log(token);
         traerCanciones(token);
     })

     //5. Crear una funcion para guardar la rutina de codigo que trae las canciones
     function traerCanciones(token){

        //1. CREAR UNA VARIABLE QUE ALMACENE LA URL DEL SERVICIO DE SPOTIFY, identificar la url

        let url="https://api.spotify.com/v1/artists/7jy3rLJdDQY21OgRLCZ9sD/top-tracks?market=US";

        //2. configurar el metodo http, las cabeceras y el body de la peticion a enviar

        let peticion={
            method:"GET",
            headers:{Authorization:token}
        }

        //4. crear un llamado al servidor y le llevamos nuestros parametros FETCH

        fetch(url,peticion)

        .then(function(respuesta){
            return(respuesta.json())
        })
        .then(function(datosLlegada){
            console.log(datosLlegada);//accediendo al objeto de llegada
            console.log(datosLlegada.tracks);// arreglo de 10 elementos
            console.log(datosLlegada.tracks[0]);
            console.log(datosLlegada.tracks[0].name);
            console.log(datosLlegada.tracks[0].preview_url);
            console.log(datosLlegada.tracks[0].album.images[0].url);

            let canciones=datosLlegada.tracks;
            pintarDatos(canciones);
        })

         //5. Pintando las canciones en el html

   function pintarDatos(canciones){

    let contenedorPadre=document.getElementById("contenedorPadre");

    //recorremos el arreglo de canciones
    canciones.map(function(cancion){

        //Creo un div con la clase col
        let columna=document.createElement('div');
        columna.classList.add("col");

        //creo on div con la clase card h-100
        let tarjeta=document.createElement('div');
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100");

        //Imagen de la tarjeta
        let imagen=document.createElement('img')
        imagen.classList.add("card-img-top");
        imagen.src=cancion.album.images[0].url;

        //Titulo de la tarjeta
        let titulo=document.createElement('h3');
        titulo.classList.add("text-center");
        titulo.textContent=cancion.name;

        //Cancion de la tarjeta
        let audio=document.createElement('audio');
        audio.classList.add("w-100");
        audio.setAttribute("controls","");
        audio.src=cancion.preview_url;

        //Anidamos componentes

        //La foto esta por dentro de la tarjeta
        tarjeta.appendChild(imagen);

        //El titulo esta dentro de la tarjeta
        tarjeta.appendChild(titulo);

        //El audio está dentro de la tarjeta
        tarjeta.appendChild(audio);

        //La tarjeta está por dentro de la columna
        columna.appendChild(tarjeta);

        //La columna está por dentro de la fila
        contenedorPadre.appendChild(columna);
    });


     }

//2. identificar si para consumir el API necesito un token

//let token= "Bearer BQBQbXIWfEUEPD2-07dAJSVyaCk-qoTp7hAuVhvBsj--nWgy0_3VwY3Oq6tGBytZCu7-FQO1jFjeLthXVSzFuOK7tgjxVzukIBA81Ywh62YWIHS4KFDLGVcz8TFyI26BxvqNkBOqkVpKhpj73lD-oqPCwte1XPc";


    }




