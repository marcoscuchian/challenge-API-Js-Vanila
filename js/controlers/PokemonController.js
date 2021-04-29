class PokemonController{
    PokemonMostrar;
    constructor(){}
    rowHtml;
    cardHtml ="";

    buscarPokemonInfo(name) {
        let findPokemon = document.getElementById('findPokemon').value;
        findPokemon = findPokemon.toLowerCase()
        if(findPokemon){
            pokemonService.getByPoke(findPokemon)
            .then(res => {
                if(!res){
                    this.rowHtml = `
                    <div class="col-4">
                    <div class="card buscador" style="width: 18rem; id="#cardpo"">
                    
                    <button type="button" class="close" onclick="pokemonController.cerrarBusqueda()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="card-header">El Pokedex no encontro tu pokemon</div>
                    <img src="./assets/img/picallorandogif.gif" class="card-img-top imgPoke" alt="...">
                    <div class="card-body p-0">
                    </div>
                    <a href="#" class="btn btn btn-success fluid" onclick="pokemonController.cerrarBusqueda()">SEGUIR BUSCANDO</a>
                    <a href="./listaPokemones.html" class="btn btn btn-success fluid" onclick="pokemonController.cerrarBusqueda()">VER TODOS LOS POKEMONES</a>
                    </div>
                    </div>
                    `;
                    document.getElementById('muestraPoke').innerHTML=this.rowHtml;
    
                }
                var type= res.types[0].type.name;
                this.PokemonMostrar= new Pokemon(res.id,res.name,type,res.sprites.other.dream_world.front_default)

                    this.rowHtml = `
                        <div class="col-4">
                            <div class="card buscador" style="width: 18rem; id="#cardpo"">
                                <button type="button" class="close" onclick="pokemonController.cerrarBusqueda()" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <img src="${this.PokemonMostrar.imgPoke}" class="card-img-top imgPoke" alt="...">
                                <div class="card-body p-2">
                                    <h4 class="card-title text-center">Nombre: ${this.PokemonMostrar.name.toUpperCase()}</h4></p>
                                    <h4 class="card-title text-center">Numero: ${this.PokemonMostrar.id}</h4></p>
                                    <h5 class="card-title text-center">Tipo: ${this.PokemonMostrar.tipo.toUpperCase()}</h5></p>
                                </div>
                                <a href="#" class="btn btn btn-success fluid" onclick="pokemonController.verMas(${this.PokemonMostrar.id})">VER MAS!</a>
                            </div>
                        </div>
                    `;
                
                document.getElementById('muestraPoke').innerHTML=this.rowHtml;
                })
        };
    };





    verMas(id){
            console.log("hasta aca el poke,",id);
             pokemonService.getSpecie(id)
            .then(res => {
                var baby =  (res.is_baby)? "Si" : "No";
                var legendary =  (res.is_legendary)? "Si" : "No";
                if(!res.evolves_from_species){
                    console.log("no nai")
                    console.log(res.is_baby)
                    console.log(res)

                    this.rowHtml =`
                        <div class="card  buscador mb-3 d-flex justify-content-center">
                        <button type="button" class="close" onclick="pokemonController.cerrarBusqueda()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="card-body p-2">
                        <h4 class="card-title text-center bg-white">${this.PokemonMostrar.name.toUpperCase()}    ID: ${this.PokemonMostrar.id}</h4>
                        <img class="card-img-top agrandImgPoke" src="${this.PokemonMostrar.imgPoke}" alt="Card image cap">
                        <h3 >No es Evolucion</h3>
                        <h3 >${baby} es Bebe</h3>
                        <h3 >${legendary} es Legendario</h3>
                        <h3 >Color ${res.color.name.toUpperCase()}</h3>
                        <h4 >Tipo de Pokemon: ${this.PokemonMostrar.tipo.toUpperCase()}</h4>
                            </div>
                            <a href="#" class="btn btn btn-success fluid" onclick="pokemonController.buscarPokemonInfo()">VER MENOS!</a>
                        </div>
                        `
                }else {  
                    this.rowHtml =`
                        <div class="card  buscador mb-3 d-flex justify-content-center">
                        <button type="button" class="close" onclick="pokemonController.cerrarBusqueda()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="card-body p-2">
                        <h4 class="card-title text-center bg-white">${this.PokemonMostrar.name.toUpperCase()}    ID: ${this.PokemonMostrar.id}</h4>
                        <img class="card-img-top agrandImgPoke" src="${this.PokemonMostrar.imgPoke}" alt="Card image cap">
                        <h3 >Evoluciona de:  ${res.evolves_from_species.name.toUpperCase()}</h3>
                        <h3 >${baby} es Bebe</h3>
                        <h3 >${legendary} es Legendario</h3>
                        <h3 >Color Predominante: ${res.color.name.toUpperCase()}</h3>
                        <h4 >Tipo de Pokemon: ${this.PokemonMostrar.tipo.toUpperCase()}</h4>

                        </div>
                            <a href="#" class="btn btn btn-success fluid" onclick="pokemonController.buscarPokemonInfo()">VER MENOS!</a>
                        </div>
                        `;
                }
            document.getElementById('muestraPoke').innerHTML=this.rowHtml;
            });

    };





    cerrarBusqueda(){
        this.rowHtml="";
        document.getElementById('muestraPoke').innerHTML=this.rowHtml;
        document.getElementById('findPokemon').value = "";

    };



    
    listaPokemones(){
    
    var n = 1;
    while  (n < 50){

        if(n > 2){
            console.log(n)
            pokemonService.getByPoke(n)
            .then(res => {
                this.cardHtml +=`
                <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${res.sprites.other.dream_world.front_default}" alt="Card image cap">
                <ul class="list-group list-group-flush">
                <li class="list-group-item"> <h3>Nombre: ${res.name}</h3></li>
                <li class="list-group-item"><h3>Numero: ${res.id}</h3></li>
                </ul>
                </div>    
                `;
                document.getElementById('todosPokemon').innerHTML=this.cardHtml;
            })
        }
        n+=1;
    }

    };




}