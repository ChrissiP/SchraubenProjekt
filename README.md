# Projekt: Verkaufsdaten-Dashboard

Dieses Projekt hat das Ziel, ein interaktives Dashboard zu erstellen, das Verkaufsdaten für verschiedene Schraubenarten von verschiedenen Herstellern visualisiert. Dabei werden Chart.js zur Darstellung der Daten und Bootstrap zur Gestaltung der Benutzeroberfläche verwendet.




## Inhaltsverzeichnis


- [Installation](#installation)

- [Verwendung](#verwendung)

- [Start](#start)


## Installation


Nachfolgend findest du die einzelnen Schritte um die nötigen Programme zu installieren, damit die Webseite auch über den Port 3000 laufen kann.
um alle Befehle auf einmal zu installieren findest du unter der auflistung unter ##BEFEHLE nochmal alles zusammengeführt.


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


```shell

$ pug -w index.pug -o ./public -P

```

## Start

Mit diesem Befehl können wir den Server starten.

```shell

$ node app.js

```