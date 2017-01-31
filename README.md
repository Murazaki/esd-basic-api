# esd-basic-api

## How to use

install mongo :

````
brew install mongo
````

start mongo service :

````
brew services start mongodb
````

copy/clone the project onto your computer. In the project folder, install the npm packages :

````
npm install
````

run the app :
````
npm start
````

you should be able to communicate with it through those commands :

````
GET    http://localhost:8000/eleves		// To get all elements
GET    http://localhost:8000/eleve/:hash	// To get one element
POST   http://localhost:8000/eleve		// To insert one new element
POST   http://localhost:8000/eleve/:hash	// To update one element
DELETE http://localhost:8000/eleves		// To delete all elements
DELETE http://localhost:8000/eleve/:hash	// To delete one element
DELETE htttp://localhost:8000/dbeleves		// To drop the whole database
````
