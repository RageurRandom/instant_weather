const postalCodeInput = document.getElementById('postal-code');
let para = document.getElementById('affichage');
let para2 = document.getElementById('affichage2');
let affichageDiv = document.getElementById('affichage3');
let para3 = document.getElementById('affichage4');
let dropDown = document.getElementById('Dropdown');
let postalCode;
let selectedCity = 0;

document.addEventListener('DOMContentLoaded', () => {
    postalCodeInput.addEventListener('input', () => {
        postalCode = postalCodeInput.value;

        if (postalCode.length > 5 || postalCode < 0 || postalCode > 99999) {
            alert("Veuillez entrer un code postal valide à 5 chiffres entre 00000 et 99999.");
            postalCodeInput.value = '';
        }
        para2.innerHTML = postalCode.length;
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
    para3.innerHTML = text + " " + selectedCity;
});

async function fetchByPostalCode(postalCode) {
    try {
        const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`);
        const data = await response.json();
        
        dropDown.innerHTML = '';

        if (data.length === 1) {
            const commune = data[0];
            affichageDiv.innerHTML = "<h2>Commune associée:</h2>";
            affichageDiv.innerHTML += `
                <p><strong>${commune.nom}</strong> (Code INSEE: ${commune.code})</p>
            `;
            addOption(commune.code, commune.nom);
            selectedCity = commune.code;
        } else if (data.length > 1) {
            affichageDiv.innerHTML = `<h2>Communes associées:</h2>`;
            data.forEach(commune => {
                affichageDiv.innerHTML += `
                    <p><strong>${commune.nom}</strong> (Code INSEE: ${commune.code})</p>
                `;
                addOption(commune.code, commune.nom);
            });
        } else {
            affichageDiv.innerHTML = `<p>Aucune commune trouvée pour ce code postal.</p>`;
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
            para.innerHTML = postalCode;
            fetchByPostalCode(postalCode);
            dropDown.style.display = "block";
            para3.innerHTML = selectedCity;
        }
    }
});

