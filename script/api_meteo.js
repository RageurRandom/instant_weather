const TOKEN = '426a99a5e0024d3e16f3622e499809dc4d55ff6f651cf0f00a67a0353d18bd88'; //500 appels/jour maximum

let request = '/api/location/beaches';

fetch('https://api.meteo-concept.com'+request+'?token='+TOKEN).then(response => {
    if(!response.ok) throw new Error('Problème de réponse');

    return response.json;
}).then(data => {
    console.log(data);
});