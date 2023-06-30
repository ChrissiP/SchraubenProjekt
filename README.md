# Projekt: Verkaufsdaten-Dashboard

Dieses Projekt hat das Ziel, ein interaktives Dashboard zu erstellen, das Verkaufsdaten für verschiedene Schraubenarten von verschiedenen Herstellern visualisiert. Dabei werden Chart.js zur Darstellung der Daten und Bootstrap zur Gestaltung der Benutzeroberfläche verwendet.




## Inhaltsverzeichnis


- [Installation](#installation)

- [Verwendung](#verwendung)

- [Start](#start)


## Installation


Nachfolgend findest du die einzelnen Schritte um die nötigen Programme zu installieren, damit die Webseite auch über den Port 3000 laufen kann.


```shell

$ npm init

$ npm install

$ npm install pug-cli -g path fs

$ npm install express

$ npm install mongoose

$ npm install mongodb@4.0


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