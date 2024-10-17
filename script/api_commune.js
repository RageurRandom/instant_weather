const TOKEN = '426a99a5e0024d3e16f3622e499809dc4d55ff6f651cf0f00a67a0353d18bd88'; //500 appels/jour maximum

const postalCodeInput = document.getElementById('postal-code');
const validateButton = document.getElementById('validate')
let dropDown = document.getElementById('dropdown');
let postalCode;
let selectedCity = 0;

const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const avgTempElement = document.getElementById('avg-temp');
const maxTempElement = document.getElementById('max-temp');
const minTempElement = document.getElementById('min-temp');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const cardImg = document.getElementById('img-card');


document.addEventListener('DOMContentLoaded', () => {
    postalCodeInput.addEventListener('input', () => {
        postalCode = postalCodeInput.value;

        if (postalCode.length > 5 || postalCode < 0 || postalCode > 99999) {
            alert("Veuillez entrer un code postal valide à 5 chiffres entre 00000 et 99999.");
            postalCodeInput.value = '';
        }
    });
});

function addOption(value, text) {
    const option = document.createElement('option'); 
    option.value = value;                            
    option.text = text;                              
    dropDown.appendChild(option);                    
}

dropDown.addEventListener('change', function () {
    selectedCity = dropDown.value;
    var text = dropDown.options[dropDown.selectedIndex].text;
});

async function fetchByPostalCode(postalCode) {
    try {
        const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`);
        const data = await response.json();
        
        dropDown.innerHTML = '';

        if (data.length === 1) {
            const commune = data[0];
            addOption(commune.code, commune.nom);
            selectedCity = commune.code;
        } else if (data.length > 1) {
            data.forEach(commune => {
                addOption(commune.code, commune.nom);
            });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

postalCodeInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        postalCode = postalCodeInput.value;
        if (postalCode.length !== 5) {
            alert("Veuillez entrer un code postal valide à 5 chiffres entre 00000 et 99999.");
            postalCodeInput.value = '';
        } else {
            dropDown.innerHTML = '';
            fetchByPostalCode(postalCode);
            dropDown.style.display = "block";
        }
    }
});

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

validateButton.addEventListener('click', function () {
    getResponse(dropDown.value).then(data => {
        const forecast = data.forecast;
        if (forecast) {
            minTempElement.textContent = forecast.tmin + '°';
            maxTempElement.textContent = forecast.tmax + '°';
            avgTempElement.textContent = Math.round((forecast.tmin + forecast.tmax) / 2) + '°';
            cityElement.textContent = data.city.name;
            windElement.textContent = forecast.wind10m + ' k/h';
            humidityElement.textContent = forecast.probarain + ' %';
            console.log(forecast.weather);

            //update card image

            //sun
            if(forecast.weather == 0){
                cardImg.src = 'img/sun/26.png';
            } 
            
            //sun and cloud
            else if (forecast.weather >= 1 && forecast.weather <= 2){
                cardImg.src = 'img/cloud/27.png';
            } 

            //cloud
            else if (forecast.weather >= 3 && forecast.weather <= 5){
                cardImg.src = 'img/cloud/35.png';
            } 
            
            //fog
            else if (forecast.weather >= 6 && forecast.weather <= 9){
                //need another icon
                cardImg.src = 'img/cloud/35.png';
            } 
            
            //rain
            else if ( (forecast.weather >= 10 && forecast.weather <= 16) || (forecast.weather >= 40 && forecast.weather <= 48) || (forecast.weather >= 210 && forecast.weather <= 212) ){
                cardImg.src = 'img/cloud/7.png';
            } 
            
            //snow
            else if ( (forecast.weather >= 20 && forecast.weather <= 22) || (forecast.weather >= 60 && forecast.weather <= 68) || (forecast.weather >= 220 && forecast.weather <= 222)){
                cardImg.src = 'img/cloud/23.png';
            } 
            
            //snow and rain
            else if ( (forecast.weather >= 30 && forecast.weather <= 32) || (forecast.weather >= 70 && forecast.weather <= 78) || (forecast.weather >= 230 && forecast.weather <= 232)){
                cardImg.src = 'img/cloud/22.png';
            } 
            
            //ligthning
            else if ( forecast.weather >= 100 && forecast.weather <= 108){
                cardImg.src = 'img/cloud/12.png';
            }

            //ligthning and snow
            else if ( (forecast.weather >= 120 && forecast.weather <= 128) || forecast.weather == 142 ){
                cardImg.src = 'img/cloud/25.png';
            }

            //ligthning snow and rain
            else if ( (forecast.weather >= 130 && forecast.weather <= 138) || forecast.weather == 141 ){
                cardImg.src = 'img/cloud/24.png';
            }

            //ligthning rain
            else if ( forecast.weather == 140){
                cardImg.src = 'img/cloud/17.png';
            }

            //hail
            else if ( forecast.weather == 235){
                cardImg.src = 'img/rain/39.png';
            }

            
        }
    })
})