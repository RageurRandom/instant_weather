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

// Dictionnaire des descriptions des codes météo
const weatherDescriptions = {
    0: "Soleil",
    1: "Peu nuageux",
    2: "Ciel voilé",
    3: "Nuageux",
    4: "Très nuageux",
    5: "Couvert",
    6: "Brouillard",
    7: "Brouillard givrant",
    10: "Pluie faible",
    11: "Pluie modérée",
    12: "Pluie forte",
    13: "Pluie faible verglaçante",
    14: "Pluie modérée verglaçante",
    15: "Pluie forte verglaçante",
    16: "Bruine",
    20: "Neige faible",
    21: "Neige modérée",
    22: "Neige forte",
    30: "Pluie et neige mêlées faibles",
    31: "Pluie et neige mêlées modérées",
    32: "Pluie et neige mêlées fortes",
    40: "Averses de pluie locales et faibles",
    41: "Averses de pluie locales",
    42: "Averses locales et fortes",
    43: "Averses de pluie faibles",
    44: "Averses de pluie",
    45: "Averses de pluie fortes",
    46: "Averses de pluie faibles et fréquentes",
    47: "Averses de pluie fréquentes",
    48: "Averses de pluie fortes et fréquentes",
    60: "Averses de neige localisées et faibles",
    61: "Averses de neige localisées",
    62: "Averses de neige localisées et fortes",
    63: "Averses de neige faibles",
    64: "Averses de neige",
    65: "Averses de neige fortes",
    66: "Averses de neige faibles et fréquentes",
    67: "Averses de neige fréquentes",
    68: "Averses de neige fortes et fréquentes",
    70: "Averses de pluie et neige mêlées localisées et faibles",
    71: "Averses de pluie et neige mêlées localisées",
    72: "Averses de pluie et neige mêlées localisées et fortes",
    73: "Averses de pluie et neige mêlées faibles",
    74: "Averses de pluie et neige mêlées",
    75: "Averses de pluie et neige mêlées fortes",
    76: "Averses de pluie et neige mêlées faibles et nombreuses",
    77: "Averses de pluie et neige mêlées fréquentes",
    78: "Averses de pluie et neige mêlées fortes et fréquentes",
    100: "Orages faibles et locaux",
    101: "Orages locaux",
    102: "Orages fort et locaux",
    103: "Orages faibles",
    104: "Orages",
    105: "Orages forts",
    106: "Orages faibles et fréquents",
    107: "Orages fréquents",
    108: "Orages forts et fréquents",
    120: "Orages faibles et locaux de neige ou grésil",
    121: "Orages locaux de neige ou grésil",
    122: "Orages locaux de neige ou grésil",
    123: "Orages faibles de neige ou grésil",
    124: "Orages de neige ou grésil",
    125: "Orages de neige ou grésil",
    126: "Orages faibles et fréquents de neige ou grésil",
    127: "Orages fréquents de neige ou grésil",
    128: "Orages fréquents de neige ou grésil",
    130: "Orages faibles et locaux de pluie et neige mêlées ou grésil",
    131: "Orages locaux de pluie et neige mêlées ou grésil",
    132: "Orages fort et locaux de pluie et neige mêlées ou grésil",
    133: "Orages faibles de pluie et neige mêlées ou grésil",
    134: "Orages de pluie et neige mêlées ou grésil",
    135: "Orages forts de pluie et neige mêlées ou grésil",
    136: "Orages faibles et fréquents de pluie et neige mêlées ou grésil",
    137: "Orages fréquents de pluie et neige mêlées ou grésil",
    138: "Orages forts et fréquents de pluie et neige mêlées ou grésil",
    140: "Pluies orageuses",
    141: "Pluie et neige mêlées à caractère orageux",
    142: "Neige à caractère orageux",
    210: "Pluie faible intermittente",
    211: "Pluie modérée intermittente",
    212: "Pluie forte intermittente",
    220: "Neige faible intermittente",
    221: "Neige modérée intermittente",
    222: "Neige forte intermittente",
    230: "Pluie et neige mêlées",
    231: "Pluie et neige mêlées",
    232: "Pluie et neige mêlées",
    235: "Averses de grêle"
};

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
        <!--<svg
            class="w-32 h-32"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        > -->
            <img src="${getCardImage(forecast.weather)}" alt="clouds">

        <!-- </svg> -->
        </div>
        <div class="flex flex-row items-center justify-center mt-6">
        <div class="font-medium text-6xl">${Math.round((forecast.tmin + forecast.tmax) / 2)}°</div>
        <div class="flex flex-col items-center ml-6">
            <div>${weatherDescriptions[forecast.weather]}</div>
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
            
            // Update weather description
            weatherElement.textContent = weatherDescriptions[forecast.weather] || 'Description indisponible';

            // Appel de la fonction pour mettre à jour l'icône
            updateCardImage(forecast.weather);
        }
    });
});

// Fonction pour obtenir l'image de la carte en fonction du type de météo
function getCardImage(weather) {
    if (weather == 0) {
        return 'img/sun/26.png'; // soleil
    } 
    // soleil et nuages
    else if (weather >= 1 && weather <= 2) {
        return 'img/cloud/27.png';
    } 
    // nuages
    else if (weather >= 3 && weather <= 5) {
        return 'img/cloud/35.png';
    } 
    // brouillard
    else if (weather >= 6 && weather <= 9) {
        return 'img/cloud/35.png'; // besoin d'une autre icône
    } 
    // pluie
    else if ((weather >= 10 && weather <= 16) || (weather >= 40 && weather <= 48) || (weather >= 210 && weather <= 212)) {
        return 'img/cloud/7.png';
    } 
    // neige
    else if ((weather >= 20 && weather <= 22) || (weather >= 60 && weather <= 68) || (weather >= 220 && weather <= 222)) {
        return 'img/cloud/23.png';
    } 
    // pluie et neige
    else if ((weather >= 30 && weather <= 32) || (weather >= 70 && weather <= 78) || (weather >= 230 && weather <= 232)) {
        return 'img/cloud/22.png';
    } 
    // éclairs
    else if (weather >= 100 && weather <= 108) {
        return 'img/cloud/12.png';
    } 
    // éclairs et neige
    else if ((weather >= 120 && weather <= 128) || weather == 142) {
        return 'img/cloud/25.png';
    } 
    // éclairs, neige et pluie
    else if ((weather >= 130 && weather <= 138) || weather == 141) {
        return 'img/cloud/24.png';
    } 
    // éclairs et pluie
    else if (weather == 140) {
        return 'img/cloud/17.png';
    } 
    // grêle
    else if (weather == 235) {
        return 'img/rain/39.png';
    }
}
