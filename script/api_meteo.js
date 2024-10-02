const TOKEN = '426a99a5e0024d3e16f3622e499809dc4d55ff6f651cf0f00a67a0353d18bd88'; //500 appels/jour maximum

let request = '/api/location/city';

async function getResponse(request){
    let jsonDoc;

    await fetch("https://api.meteo-concept.com"+request+"?token="+TOKEN) //TEST
    .then(response => {
        if(!response.ok) throw new Error('Problème de réponse');

        jsonDoc = response.json();
        console.log(jsonDoc + "\n\n" + response.json());
    }).catch(error => {
        console.error('Problème : ', error);
    });

    return jsonDoc;
}


console.log(getResponse("/api/ephemeride/0")+"\nDONE");
