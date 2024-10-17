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

            // Appel de la fonction pour mettre à jour l'icône
            updateCardImage(forecast.weather);
        }
    });
});

// Fonction pour changer l'image de la carte en fonction du type de météo
function updateCardImage(weather) {
    if (weather == 0) {
        cardImg.src = 'img/sun/26.png'; // soleil
    } 
    // soleil et nuages
    else if (weather >= 1 && weather <= 2) {
        cardImg.src = 'img/cloud/27.png';
    } 
    // nuages
    else if (weather >= 3 && weather <= 5) {
        cardImg.src = 'img/cloud/35.png';
    } 
    // brouillard
    else if (weather >= 6 && weather <= 9) {
        cardImg.src = 'img/cloud/35.png'; // besoin d'une autre icône
    } 
    // pluie
    else if ((weather >= 10 && weather <= 16) || (weather >= 40 && weather <= 48) || (weather >= 210 && weather <= 212)) {
        cardImg.src = 'img/cloud/7.png';
    } 
    // neige
    else if ((weather >= 20 && weather <= 22) || (weather >= 60 && weather <= 68) || (weather >= 220 && weather <= 222)) {
        cardImg.src = 'img/cloud/23.png';
    } 
    // pluie et neige
    else if ((weather >= 30 && weather <= 32) || (weather >= 70 && weather <= 78) || (weather >= 230 && weather <= 232)) {
        cardImg.src = 'img/cloud/22.png';
    } 
    // éclairs
    else if (weather >= 100 && weather <= 108) {
        cardImg.src = 'img/cloud/12.png';
    } 
    // éclairs et neige
    else if ((weather >= 120 && weather <= 128) || weather == 142) {
        cardImg.src = 'img/cloud/25.png';
    } 
    // éclairs, neige et pluie
    else if ((weather >= 130 && weather <= 138) || weather == 141) {
        cardImg.src = 'img/cloud/24.png';
    } 
    // éclairs et pluie
    else if (weather == 140) {
        cardImg.src = 'img/cloud/17.png';
    } 
    // grêle
    else if (weather == 235) {
        cardImg.src = 'img/rain/39.png';
    }
}
