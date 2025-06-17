## Installatiehandleiding: Movie Explorer

### 1. Inleiding

Welkom bij de installatiehandleiding voor **Movie Explorer**. Deze handleiding legt stap voor stap uit hoe je het project lokaal kunt opzetten en draaien met de code-editor WebStorm.

Movie Explorer is een webapplicatie, gebouwd met React, die filmliefhebbers helpt om op één centrale plek films te ontdekken. De applicatie haalt data uit The Movie Database (TMDB) API om uitgebreide informatie over films, acteurs en trailers te tonen. Gebruikers kunnen een account aanmaken, inloggen, door films bladeren, zoeken, filteren en hun favoriete films opslaan.

---

### 2. Benodigdheden

Voordat je begint, zorg ervoor dat je de volgende software en gegevens bij de hand hebt.

#### Software
* **Node.js**: De applicatie vereist Node.js. Zorg dat je versie **16.x** of hoger hebt geïnstalleerd.
* **npm (Node Package Manager)**: Wordt standaard meegeleverd met Node.js.
* **WebStorm**: Deze handleiding gaat ervan uit dat je WebStorm als code-editor gebruikt.

#### API-sleutels en Back-end Gegevens
Voor de volledige functionaliteit van de applicatie zijn de volgende sleutels nodig. **Deze zijn al in de broncode verwerkt**; je hoeft zelf geen actie te ondernemen.

* **TMDB API Key (v3 Auth)**:
    * Wordt gebruikt om data op te halen van The Movie Database.
    * *Sleutel is geïntegreerd in `src/helpers/axios-tmdb.js`*

* **NOVI Backend API Key**:
    * Nodig om te communiceren met de NOVI-backend voor gebruikersregistratie.
    * **API Key**: `movieexplorer:Uju1R18GcIFG5fRCZwzt`
    * **Backend URL**: `https://api.datavortex.nl/movieexplorer`
    * *Sleutel is geïntegreerd in `src/pages/SignUpPage.js`*

---

### 3. Installatie-instructies

Volg dit stappenplan om de applicatie lokaal op te zetten.

**Stap 1: Kloon de Repository in WebStorm** (dit mag je negeren als je het bestand hebt gedownload)
1.  Open WebStorm.
2.  Kies in het startscherm voor **"Get from VCS"** (Version Control System).
3.  Plak de URL van de GitHub repository in het URL-veld.
4.  Kies een lokale map (Directory) waar je het project wilt opslaan.
5.  Klik op **"Clone"**. WebStorm downloadt nu het project en opent het.

**Stap 2: Installeer de Benodigde Packages**
Zodra het project geopend is, zal WebStorm waarschijnlijk detecteren dat er een `package.json`-bestand is en vragen om de dependencies te installeren.
* Als je een pop-up ziet met de vraag "Run 'npm install'?", klik dan op die melding.

Als je geen melding krijgt, kun je de dependencies handmatig installeren:
1.  Open de **Terminal** binnen WebStorm (meestal onderaan het scherm te vinden).
2.  Typ het volgende commando en druk op Enter:
    ```bash
    npm install
    ```
Dit kan enkele minuten duren. `npm` downloadt nu alle benodigde modules.

**Stap 3: Start de Applicatie**
1.  Zorg dat de **Terminal** in WebStorm nog open is.
2.  Typ het volgende commando om de development server te starten:
    ```bash
    npm start
    ```
De applicatie wordt nu gecompileerd en opent automatisch een nieuw tabblad in je browser op **http://localhost:3000**. Je kunt nu met de applicatie werken.

---

### 4. Inloggegevens Testaccount

Om de functionaliteiten voor ingelogde gebruikers te testen, kun je een nieuw account registreren of gebruikmaken van het onderstaande, reeds aangemaakte testaccount:

* **Gebruikersnaam**: `testgebruiker`
* **Wachtwoord**: `testpassword`

