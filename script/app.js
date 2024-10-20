const TOKEN =
  "426a99a5e0024d3e16f3622e499809dc4d55ff6f651cf0f00a67a0353d18bd88";

const postalCodeInput = document.getElementById("postal-code");
const postalCodeButton = document.getElementById("search-postal-code");
const validateButton = document.getElementById("validate");

const rangeInput = document.getElementById("jours");
const display = document.getElementById("affichage");

const latd = document.getElementById("latd");
const lond = document.getElementById("lond");
const cumul = document.getElementById("cumul");
const ventm = document.getElementById("ventm");
const ventd = document.getElementById("ventd");

const cityElement = document.getElementById("city");
const dateElement = document.getElementById("date");
const avgTempElement = document.getElementById("avg-temp");

const meteoCardContainer = document.getElementById("test-meteo-card");
const changeSearchButton = document.getElementById("change-search");

const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementById("closeModalButton");
const modal = document.getElementById("modal");

let dropDown = document.getElementById("dropdown");
let postalCode;
let selectedCity = 0;
let dayRange = rangeInput.value;

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

  // Rain-related codes
  10: "Pluie légère",
  11: "Pluie modérée",
  12: "Pluie forte",
  13: "Pluie verglaçante",
  14: "Pluie verglaçante",
  15: "Pluie verglaçante",
  16: "Bruine",

  // Snow-related codes
  20: "Neige légère",
  21: "Neige modérée",
  22: "Neige forte",

  // Mixed rain and snow
  30: "Pluie/neige légères",
  31: "Pluie/neige modérées",
  32: "Pluie/neige fortes",

  // Rain showers
  40: "Averses légères",
  41: "Averses",
  42: "Averses fortes",
  43: "Averses légères",
  44: "Averses",
  45: "Averses fortes",
  46: "Averses fréquentes",
  47: "Averses fréquentes",
  48: "Averses fréquentes",

  // Snow showers
  60: "Averses de neige légères",
  61: "Averses de neige",
  62: "Averses de neige fortes",
  63: "Averses légères",
  64: "Averses de neige",
  65: "Averses de neige fortes",
  66: "Averses fréquentes",
  67: "Averses fréquentes",
  68: "Averses fortes et fréquentes",

  // Mixed rain and snow showers
  70: "Averses pluie/neige légères",
  71: "Averses pluie/neige",
  72: "Averses pluie/neige fortes",
  73: "Averses légères",
  74: "Averses pluie/neige",
  75: "Averses fortes",
  76: "Averses fréquentes",
  77: "Averses fréquentes",
  78: "Averses fortes et fréquentes",

  // Thunderstorms
  100: "Orages faibles",
  101: "Orages",
  102: "Orages forts",
  103: "Orages faibles",
  104: "Orages",
  105: "Orages forts",
  106: "Orages fréquents",
  107: "Orages fréquents",
  108: "Orages fréquents",

  // Thunderstorms with snow/sleet
  120: "Orages avec neige/grésil",
  121: "Orages neige/grésil",
  122: "Orages neige/grésil",
  123: "Orages neige/grésil",
  124: "Orages neige/grésil",
  125: "Orages neige/grésil",
  126: "Orages fréquents neige/grésil",
  127: "Orages fréquents",
  128: "Orages fréquents",

  // Mixed rain/snow and thunderstorms
  130: "Orages pluie/neige",
  131: "Orages pluie/neige",
  132: "Orages forts pluie/neige",
  133: "Orages pluie/neige",
  134: "Orages pluie/neige",
  135: "Orages forts pluie/neige",
  136: "Orages fréquents",
  137: "Orages fréquents",
  138: "Orages fréquents",

  140: "Pluies orageuses",
  141: "Pluie/neige orageuses",
  142: "Neige orageuse",

  // Intermittent rain/snow
  210: "Pluie intermittente",
  211: "Pluie intermittente",
  212: "Pluie forte",
  220: "Neige intermittente",
  221: "Neige intermittente",
  222: "Neige forte",

  // Mixed intermittent rain/snow
  230: "Pluie/neige intermittentes",
  231: "Pluie/neige intermittentes",
  232: "Pluie/neige intermittentes",

  235: "Averses de grêle",
};

/*
  ajoute une option au dropdown de séléction de la ville
*/
function addOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  dropDown.appendChild(option);
}

/*
  Créé une carte météo en html et la mets dans la page
*/
function makeMeteoCard(data, date) {
  const forecast = data.forecast;

  let card = `<div class="flex items-center justify-center p-4">
    <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
        <div class="font-bold text-xl" >${data.city.name}</div>
        <div class="text-sm text-gray-500" id="date">${date}</div>
        <div
        class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24"
        >
        
        <img src="${getCardImage(forecast.weather)}" alt="${
    weatherDescriptions[forecast.weather]
  }">

        
        </div>
        <div class="flex flex-row items-center justify-center mt-6">
        <div class="font-medium text-6xl">${Math.round(
          (forecast.tmin + forecast.tmax) / 2
        )}°</div>
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
        </div>
        `;

  let checkedOptions = [];

  if (latd.checked) checkedOptions.push("latitude");
  if (lond.checked) checkedOptions.push("longitude");
  if (cumul.checked) checkedOptions.push("rr10");
  if (ventm.checked) checkedOptions.push("wind10m");
  if (ventd.checked) checkedOptions.push("dirwind10m");

  /*if (checkedOptions.length > 0) {
    alert('Vous avez sélectionné : ' + checkedOptions.join(', '));
    } else {
    alert('Aucune option sélectionnée');
    }*/
  checkedOptions.forEach((option) => {
    if (forecast[option] !== undefined) {
      // Vérifie si la propriété existe dans forecast
      card += `<div class="flex flex-col items-center">
            <div class="font-medium text-sm">${option}</div>
            <div class="text-sm text-gray-500">${forecast[option]}</div>
        </div>`;
    }
  });

  card += `    
    </div>
    </div>`;

  meteoCardContainer.insertAdjacentHTML("beforeend", card);
}

/*
  retourne la liste des communes correspondant au code postal en paramètre
*/
async function fetchByPostalCode(postalCode) {
  try {
    const response = await fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${postalCode}`
    );
    const data = await response.json();

    dropDown.innerHTML = "";

    if (data.length === 1) {
      const commune = data[0];
      addOption(commune.code, commune.nom);
      selectedCity = commune.code;
    } else if (data.length > 1) {
      data.forEach((commune) => {
        addOption(commune.code, commune.nom);
      });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

/*
  renvoie 
*/
async function getResponse(insee, day) {
  let jsonDoc;
  try {
    const response = await fetch(
      "https://api.meteo-concept.com/api/forecast/daily/" +
        day +
        "?token=" +
        TOKEN +
        "&insee=" +
        insee
    ); //TEST TODO
    //console.log(response);
    if (!response.ok) throw new Error("Problème de réponse:" + response.status);
    jsonDoc = await response.json();
    //console.log(jsonDoc);
  } catch (error) {
    console.error("Problème : ", error);
  }

  return jsonDoc;
}

/*
  retire tous les enfants d'un élément html
  utilisé pour retirer les cartes météos lors d'une nouvelle recherche
*/
function clearChildren(htmlElt) {
  while (htmlElt.firstChild) {
    htmlElt.removeChild(htmlElt.firstChild);
  }
}


/*
  mets les communes ayant le code postal recherché dans le dropdown
*/
function refreshPostalCode() {
  postalCode = postalCodeInput.value;
  if (postalCode.length !== 5) {
    alert(
      "Veuillez entrer un code postal valide à 5 chiffres entre 00000 et 99999."
    );
    postalCodeInput.value = "";
  } else {
    dropDown.innerHTML = "";
    fetchByPostalCode(postalCode);
    dropDown.style.display = "block";
  }
}

// Fonction pour obtenir l'image de la carte en fonction du type de météo
function getCardImage(weather) {
  if (weather == 0) {
    return "img/sun/26.png"; // soleil
  }
  // soleil et nuages
  else if (weather >= 1 && weather <= 2) {
    return "img/sun/27.png";
  }
  // nuages
  else if (weather >= 3 && weather <= 5) {
    return "img/cloud/35.png";
  }
  // brouillard
  else if (weather >= 6 && weather <= 9) {
    return "img/sun/6.png";
  }
  // pluie
  else if (
    (weather >= 10 && weather <= 16) ||
    (weather >= 40 && weather <= 48) ||
    (weather >= 210 && weather <= 212)
  ) {
    return "img/cloud/7.png";
  }
  // neige
  else if (
    (weather >= 20 && weather <= 22) ||
    (weather >= 60 && weather <= 68) ||
    (weather >= 220 && weather <= 222)
  ) {
    return "img/cloud/23.png";
  }
  // pluie et neige
  else if (
    (weather >= 30 && weather <= 32) ||
    (weather >= 70 && weather <= 78) ||
    (weather >= 230 && weather <= 232)
  ) {
    return "img/cloud/22.png";
  }
  // éclairs
  else if (weather >= 100 && weather <= 108) {
    return "img/cloud/12.png";
  }
  // éclairs et neige
  else if ((weather >= 120 && weather <= 128) || weather == 142) {
    return "img/cloud/25.png";
  }
  // éclairs, neige et pluie
  else if ((weather >= 130 && weather <= 138) || weather == 141) {
    return "img/cloud/24.png";
  }
  // éclairs et pluie
  else if (weather == 140) {
    return "img/cloud/17.png";
  }
  // grêle
  else if (weather == 235) {
    return "img/rain/39.png";
  }
}

// Open the dialog modal
openModalButton.addEventListener("click", () => {
  modal.showModal(); // Show the dialog modal
});

dropDown.addEventListener("change", function () {
  selectedCity = dropDown.value;
  var text = dropDown.options[dropDown.selectedIndex].text;
});

// Close the modal when clicking the close button
closeModalButton.addEventListener("click", () => {
  modal.close(); // Close the modal
});

// Close the modal when clicking outside of it (optional)
modal.addEventListener("click", (event) => {
  const rect = modal.getBoundingClientRect();
  const isInDialog =
    rect.top <= event.clientY &&
    event.clientY <= rect.bottom &&
    rect.left <= event.clientX &&
    event.clientX <= rect.right;

  if (!isInDialog) {
    modal.close(); // Close if clicked outside
  }
});

document.addEventListener("DOMContentLoaded", () => {
  postalCodeInput.addEventListener("input", () => {
    postalCode = postalCodeInput.value;

    if (postalCode.length > 5 || postalCode < 0 || postalCode > 99999) {
      alert(
        "Veuillez entrer un code postal valide à 5 chiffres entre 00000 et 99999."
      );
      postalCodeInput.value = "";
    }
  });
});

dropDown.addEventListener("change", function () {
  selectedCity = dropDown.value;
  var text = dropDown.options[dropDown.selectedIndex].text;
});

document.addEventListener("DOMContentLoaded", () => {
  display.innerHTML = rangeInput.value;

  rangeInput.addEventListener("input", () => {
    display.innerHTML = rangeInput.value;
    dayRange = rangeInput.value;
  });
});

postalCodeInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    refreshPostalCode();
  }
});

postalCodeButton.addEventListener("click", () => refreshPostalCode());

validateButton.addEventListener("click", async function () {
  const isPostalCodeFilled = postalCodeInput.value.trim().length === 5;
  const isDropdownSelected = dropDown.value !== "";

  //console.log(isPostalCodeFilled, isDropdownSelected);

  if (isPostalCodeFilled && isDropdownSelected) {
    clearChildren(meteoCardContainer);

    let date = new Date();
    for (let i = 0; i < dayRange; i++) {
      await getResponse(dropDown.value, i)
        .then((data) => {
          const forecast = data.forecast;
          if (forecast) {
            makeMeteoCard(
              data,
              date.toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })
            );

            // OPTIONS
          }
        })
        .catch((data) => console.log("problème : " + data));
      date.setDate(date.getDate() + 1);
      //console.log(i);
      //console.log(date);
      //date.setDate(date.getDate() + 1);
    }
  }
});