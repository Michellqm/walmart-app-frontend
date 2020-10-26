# Wallmart app test - FrontEnd | Angular 
depends on : https://github.com/Michellqm/walmart-app-backend

### Installation

* Clonar el repositorio
* Modificar Dockerfile 
* Build docker image
```sh
docker build --pull --rm -f Dockerfile -t walmartappfrontend:v1 .
```
* Run docker image
 ```sh
docker run --network="host"  -it walmartappfrontend:v1
```

## Para testear 
 ```sh
http://localhost
```