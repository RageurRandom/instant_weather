const TOKEN = '426a99a5e0024d3e16f3622e499809dc4d55ff6f651cf0f00a67a0353d18bd88';

const postalCodeInput = document.getElementById('postal-code');
const validateButton = document.getElementById('validate')
let dropDown = document.getElementById('dropdown');
let postalCode;
let selectedCity = 0;


const rangeInput = document.getElementById('jours');
const affichage = document.getElementById('affichage');

const latd = document.getElementById('latd');
const lond = document.getElementById('lond');
const cumul = document.getElementById('cumul');
const ventm = document.getElementById('ventm');
const ventd = document.getElementById('ventd');

const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const avgTempElement = document.getElementById('avg-temp');

const meteoCardContainer = document.getElementById("test-meteo-card");
//const maxTempElement = document.getElementById('max-temp');
//const minTempElement = document.getElementById('min-temp');
//const windElement = document.getElementById('wind');
//const humidityElement = document.getElementById('humidity');

let dayRange = rangeInput.value;

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

function makeMeteoCard(data, date) {
    const forecast = data.forecast;

    let card = `<div class="flex items-center justify-center p-4">
    <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
        <div class="font-bold text-xl" >${data.city.name}</div>
        <div class="text-sm text-gray-500" id="date">${date}</div>
        <div
        class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24"
        >
        <svg
            class="w-32 h-32"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <img src="img/lightning.png" alt="clouds">

        </svg>
        </div>
        <div class="flex flex-row items-center justify-center mt-6">
        <div class="font-medium text-6xl">${Math.round((forecast.tmin + forecast.tmax) / 2)}°</div>
        <div class="flex flex-col items-center ml-6">
            <div>${"Cloudy" /*A CHANGER*/}</div>
            <div class="mt-1">
            <span class="text-sm"
                ><i class="far fa-long-arrow-up"></i
            ></span>
            <span class="text-sm font-light text-gray-500"
                >${forecast.tmax}°C</span
            >
            </div>
            <div>
            <span class="text-sm"
                ><i class="far fa-long-arrow-down"></i
            ></span>
            <span class="text-sm font-light text-gray-500"
                >${forecast.tmin}°C</span
            >
            </div>
        </div>
        </div>
        <div class="flex flex-row justify-between mt-6">
        <div class="flex flex-col items-center">
            <div class="font-medium text-sm">Vent</div>
            <div class="text-sm text-gray-500">${forecast.wind10m} km/h</div>
        </div>
        <div class="flex flex-col items-center">
            <div class="font-medium text-sm">Probabilité de pluie</div>
            <div class="text-sm text-gray-500">${forecast.probarain} %</div>
        </div>
        </div>`;

    let checkedOptions = [];

    if (latd.checked) checkedOptions.push('latitude');
    if (lond.checked) checkedOptions.push('longitude');
    if (cumul.checked) checkedOptions.push('rr10');
    if (ventm.checked) checkedOptions.push('wind10m');
    if (ventd.checked) checkedOptions.push('dirwind10m');

    /*if (checkedOptions.length > 0) {
    alert('Vous avez sélectionné : ' + checkedOptions.join(', '));
    } else {
    alert('Aucune option sélectionnée');
    }*/
    test.innerHTML = ''; // Vider le contenu précédent
    checkedOptions.forEach(option => {
        if (forecast[option] !== undefined) { // Vérifie si la propriété existe dans forecast
            card += `<div class="flex flex-col items-center">
            <div class="font-medium text-sm">${option}</div>
            <div class="text-sm text-gray-500">${forecast[option]}</div>
        </div>`;
        }
    })


    card += `    
    </div>
    </div>`;


    meteoCardContainer.insertAdjacentHTML("beforeend", card);



    
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

async function getResponse(insee, day) {
    let jsonDoc;
    try {
        const response = await fetch("https://api.meteo-concept.com/api/forecast/daily/" + day + "?token=" + TOKEN + "&insee=" + insee) //TEST TODO
        //console.log(response);
        if (!response.ok) throw new Error('Problème de réponse:' + response.status);
        jsonDoc = await response.json();
        //console.log(jsonDoc);
    }
    catch (error) {
        console.error('Problème : ', error);
    };

    return jsonDoc;
}

function clearChildren(htmlElt) {
    while (htmlElt.firstChild) {
        htmlElt.removeChild(htmlElt.firstChild);
    }
}

validateButton.addEventListener('click', async function () {

    clearChildren(meteoCardContainer);

    let date = new Date();
    for (let i = 0; i < dayRange; i++) {

        await getResponse(dropDown.value, i).then(data => {
            const forecast = data.forecast;
            if (forecast) {


                makeMeteoCard(data, date.toLocaleDateString('fr-FR', {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: 'UTC'
                }));

                // OPTIONS


            }
        }).catch(
            (data) => console.log("problème : " + data)
        );
        date.setDate(date.getDate() + 1);
        console.log(i);
        console.log(date);
        //date.setDate(date.getDate() + 1);
    }
});