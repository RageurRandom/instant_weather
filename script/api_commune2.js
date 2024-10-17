
const postalCodeInput = document.getElementById('postal-code');
const validateButton = document.getElementById('validate')
let dropDown = document.getElementById('dropdown');
let postalCode;
let selectedCity = 0;
let dayRange = 0;

const rangeInput = document.getElementById('jours');
const affichage = document.getElementById('affichage');

const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const avgTempElement = document.getElementById('avg-temp');
const maxTempElement = document.getElementById('max-temp');
const minTempElement = document.getElementById('min-temp');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');


document.addEventListener('DOMContentLoaded', () => {
    postalCodeInput.addEventListener('input', () => {
        postalCode = postalCodeInput.value;

        if (postalCode.length > 5 || postalCode < 0 || postalCode > 99999) {
            alert("Veuillez entrer un code postal valide à 5 chiffres entre 00000 et 99999.");
            postalCodeInput.value = '';
        }
    });
});

dropDown.addEventListener('change', function () {
    selectedCity = dropDown.value;
    var text = dropDown.options[dropDown.selectedIndex].text;
});

document.addEventListener('DOMContentLoaded', () => {
    affichage.innerHTML = rangeInput.value;

    rangeInput.addEventListener('input', () => {
        affichage.innerHTML = rangeInput.value;
        dayRange = rangeInput.value;
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
    const response = await fetch("https://api.meteo-concept.com/api/forecast/daily/"+dayRange+"?token="+TOKEN+"&insee="+insee) //TEST
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
            console.log(forecast);
        }
    })
})