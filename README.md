# Projekt: Verkaufsdaten-Dashboard

Dieses Projekt hat das Ziel, ein interaktives Dashboard zu erstellen, das Verkaufsdaten für verschiedene Schraubenarten von verschiedenen Herstellern visualisiert. Dabei werden Chart.js zur Darstellung der Daten und Bootstrap zur Gestaltung der Benutzeroberfläche verwendet.




## Inhaltsverzeichnis

- [download von github: https://github.com/ChrissiP/SchraubenProjekt.git]

- [Installation](#installation)

- [Verwendung](#verwendung)

- [Start](#start)


## Download

clone dir das projekt:

    clicke auf den code button: und öffne das Projekt in Github Desktop und lade dir die zip. herunter
        wenn du die zip verwendest entpacke die Datei und öffne sie in Visual Studio code.

## Installation


Nachfolgend findest du die einzelnen Schritte um die nötigen Programme zu installieren, damit die Webseite auch über den Port 3000 laufen kann.
um alle Befehle auf einmal zu installieren findest du unter der auflistung unter ##BEFEHLE nochmal alles zusammengeführt.

öffne ein Terminal im Hauptordner deines Projektes und führe die Installationen aus.

```shell

$ npm init

$ npm install

$ npm install pug-cli -g path fs

$ npm install pug

$ npm install express

$ npm install mongoose

$ npm install mongodb@4.0

$ npm install cjs

$ npm install cors

$ npm install node-fetch

## BEFEHLE:
npm init && npm install && npm install pug-cli -g path fs && npm install pug && npm install express && npm install mongoose && npm install mongodb@4.0 && npm install cjs && npm install cors && npm install node-fetch -y


```

## Verwendung

Mit der index.pug kreiieren wir die Startseite!
und die hersteller Seiten mit den pug Dateien der einzellnen Hersteller. Dazu führe folgende Befehle aus:


```shell

$ pug -w index.pug -o ./public -P

$ pug -w heco.pug -o ./public -P

$ pug -w swg.pug -o ./public -P

$ pug -w wuerth.pug -o ./public -P
```

## Start

Mit diesem Befehl können wir den Server starten.

```shell

$ node app.js

Sobald der Server läuft kommt im Terminal die Meldung:
"Server is running on port 3000
MongoDB connected..."

Jetzt koennen wir die index.html mit rechtsclick im liveserver öffnen und dannach sehen wir im Browser unsere Seite.
```