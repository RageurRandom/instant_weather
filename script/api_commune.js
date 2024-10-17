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
const weatherElement = document.getElementById('weather');



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

        console.log(data);
        
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
