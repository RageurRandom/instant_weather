# Projet Instant Weather

## DESCRIPTION
Cette application permet à l'utilisateur de selectionner une commune à partir de son code postale, elle transmet ensuite à ce dernier les informations météorologiques de cette commune.

## PRE-REQUIS
L'application utilise plusieurs API: 
 - **API de découpage administratif par commune** :
 *https://geo.api.gouv.fr/decoupage-administratif/communes*
 - **API météo de MétéoConcept** :
 *https://api.meteo-concept.com/*

## Fonctionnalités

- **Prévisions météo en temps réel** : Entrez un code postal et sélectionnez une commune pour obtenir des données météo.
- **Prise en charge de plusieurs villes** : Le menu déroulant est automatiquement rempli avec les communes correspondant au code postal saisi.
- **Sélection de la durée des prévisions** : Les utilisateurs peuvent choisir le nombre de jours de prévision (de 1 à 7 jours).
- **Options supplémentaires** : Les utilisateurs peuvent choisir d'afficher des informations supplémentaires telles que la direction du vent, les précipitations, ou encore la latitude et la longitude.
- **Stockage local (localStorage)** : Toutes les saisies (code postal, ville sélectionnée, options, etc.) sont sauvegardées dans le stockage local, ce qui garantit leur persistance entre les sessions.
- **Design réactif** : L'interface utilisateur est conçue pour être accessible sur tous les types d'écrans, avec une approche mobile-first.

## Structure du projet

Les principaux fichiers de ce projet sont :

- **index.html** : Contient la structure de l'interface utilisateur de l'application.
- **app.js** : Contient la logique pour récupérer les données météo, gérer les interactions de l'utilisateur, et sauvegarder les informations dans le stockage local.
- **style/output.css** : Contient les styles de l'application. Il est référencé dans `index.html` et utilise un framework CSS orienté utilitaire (comme Tailwind CSS).
- **script/app.js** : Ce fichier JavaScript contient toutes les fonctionnalités de base de l'application.

## Fonctionnement

### Saisie de l'utilisateur

1. **Saisie du code postal** :
   - L'utilisateur peut entrer un code postal valide (5 chiffres).
   - Lorsque le bouton "Valider" est cliqué, l'application récupère les communes disponibles pour ce code postal.

2. **Menu déroulant** :
   - Après avoir saisi un code postal, l'utilisateur peut sélectionner une commune dans le menu déroulant, qui est mis à jour dynamiquement.

3. **Options supplémentaires de prévision** :
   - Les utilisateurs peuvent sélectionner des options telles que l'affichage de la latitude, de la longitude, des précipitations cumulées, de la vitesse du vent et de la direction du vent.

4. **Sélecteur de plage de jours** :
   - Les utilisateurs peuvent sélectionner la plage de jours de prévision (de 1 à 7 jours) à l'aide d'un curseur.

## Récupération des données météo

L'application utilise des API externes pour récupérer les données météo :

- **Geo API** : Récupère les informations sur les communes en fonction du code postal saisi.
  - **URL** : `https://geo.api.gouv.fr/communes?codePostal={codePostal}`

- **Meteo-Concept API** : Récupère les prévisions météo pour la commune sélectionnée.
  - **URL** : `https://api.meteo-concept.com/api/forecast/daily/`
  - **Token** : Un jeton d'API valide est requis et stocké dans le fichier `app.js`.

## Stockage local

L'application sauvegarde les informations suivantes dans le **stockage local (localStorage)** :

- Code postal
- Commune sélectionnée
- Plage de prévision (nombre de jours)
- Options supplémentaires (latitude, longitude, direction du vent, etc.)

Cela garantit que si l'utilisateur ferme ou recharge la page, ses saisies seront restaurées automatiquement.

## Boutons

- **Valider** : Ce bouton déclenche la recherche des prévisions météo et affiche les résultats.
- **Paramètres** : Ouvre une fenêtre modale où l'utilisateur peut configurer des options supplémentaires pour les prévisions.

## Personnalisation

Vous pouvez personnaliser l'application en modifiant les éléments suivants :

- **Icônes météo** : Les icônes sont liées au type de météo (soleil, nuages, pluie, etc.). Vous pouvez les remplacer par vos propres images en modifiant les chemins dans `app.js`.
  
- **Styles** : Modifiez le fichier `style/output.css` pour changer l'apparence de l'application. Le projet utilise **Tailwind CSS** pour la mise en page.

## APIs Utilisées

- **Geo API** : Récupère les informations sur les communes à partir du code postal.
  - **URL** : `https://geo.api.gouv.fr/communes?codePostal={codePostal}`
  
- **Meteo-Concept API** : Fournit les prévisions météo pour une commune donnée.
  - **URL** : `https://api.meteo-concept.com/api/forecast/daily/`
  - Un jeton d'API est requis pour accéder à cette API (inclus dans le fichier `app.js`).

# CONTRIBUEURS
 - Lukas Fortin
 - Luke Bates
 - Léo Berranger
