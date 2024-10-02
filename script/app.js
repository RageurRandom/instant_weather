
const postalCodeInput = document.getElementById('postal-code');
let para = document.getElementById('affichage');
let para2 = document.getElementById('affichage2');
let affichageDiv = document.getElementById('affichage3');
let postalCode;

document.addEventListener('DOMContentLoaded', () => {
    postalCodeInput.addEventListener('input', () => {
        postalCode = postalCodeInput.value;

        // Vérification si la valeur a exactement 5 chiffres et est entre 00000 et 99999
        if (postalCode.length > 5 || postalCode < 0 || postalCode > 99999) {
            alert("Veuillez entrer un code postal valide à 5 chiffres entre 00000 et 99999.");
            postalCodeInput.value = ''; // Réinitialiser l'input si la condition n'est pas remplie
        }
        para2.innerHTML = postalCode.length;
    });
});

postalCodeInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        postalCode = postalCodeInput.value;
        if (postalCode.length != 5) {
            alert("Veuillez entrer un code postal valide à 5 chiffres entre 00000 et 99999.");
            postalCodeInput.value = ''; // Réinitialiser l'input si la condition n'est pas remplie
        }
        else {
        para.innerHTML = postalCode;
        try {
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        affichageDiv.innerHTML = `<h2>Communes associées:</h2>`;
                        data.forEach(commune => {
                            affichageDiv.innerHTML += `
                                <p><strong>${commune.nom}</strong> (Code INSEE: ${commune.code})</p>
                            `;
                        });
                    } else {
                        affichageDiv.innerHTML = `<p>Aucune commune trouvée pour ce code postal.</p>`;
                    }
                })
            }
        catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
        }
    }
});

