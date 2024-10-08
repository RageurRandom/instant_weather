const TOKEN = '426a99a5e0024d3e16f3622e499809dc4d55ff6f651cf0f00a67a0353d18bd88'; //500 appels/jour maximum


//let request = '/api/location/city';

async function getResponse(insee){
    let jsonDoc;
    try {
    const response = await fetch("https://api.meteo-concept.com/api/forecast/daily/0?token="+TOKEN+"&insee="+insee) //TEST
    if(!response.ok) throw new Error('Problème de réponse:' + response.status);
    jsonDoc = await response.json();
        //console.log(jsonDoc);
    }
    catch(error) {
        console.error('Problème : ', error);
    };

    return jsonDoc;
}

getResponse(35238).then(data => {
    const forecast = data.forecast; // Accéder à l'objet "forecast"
    if (forecast) {
        console.log(forecast.tmin + "\nDONE");
        console.log(forecast.tmax + "\nDONE");
        console.log(forecast.probarain + "\nDONE");
        console.log(forecast.sun_hours + "\nDONE");
    } else {
        console.log("Prévisions non disponibles");
    }
});