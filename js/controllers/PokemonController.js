class PokemonController{
    PokemonMostrar;
    rowHtml;
    cardHtml ="";
    htmlHabilidades ="";
    

    buscarPokemonInfo(){
        let findPokemon = document.getElementById('findPokemon').value;
        if(findPokemon != ""){
            this.rowHtml=`  <img src="./assets/img/picacorriendo.gif" class="gifPica"disabled alt="">`;
            document.getElementById('muestraPoke').innerHTML=this.rowHtml;
        };
        this.htmlHabilidades="";
        findPokemon = findPokemon.toLowerCase()
        if(findPokemon){
            pokemonService.getByPoke(findPokemon)
            .then(res => {
                if(!res){
                    this.rowHtml = `
                        <div class="col-4">
                            <div class="card buscador" style="width: 18rem; id="#cardpo"">
                                <button type="button" class="close text-white" onclick="pokemonController.cerrarBusqueda()" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div class="card-header text-white">El Pokedex no encontro tu pokemon</div>
                                    <img src="./assets/img/picallorandogif.gif" class="card-img-top imgPoke" alt="...">
                                <div class="card-body p-0">
                            </div>
                                <a href="#" class="btn btn btn-dark fluid" onclick="pokemonController.cerrarBusqueda()">SEGUIR BUSCANDO</a>
                                <a href="./listaPokemones.html" class="btn btn btn-dark fluid" onclick="pokemonController.cerrarBusqueda()">VER TODOS LOS POKEMONES</a>
                            </div>
                        </div>
                    `;
                    document.getElementById('muestraPoke').innerHTML=this.rowHtml;
                }
                var type= res.types[0].type.name;
                this.PokemonMostrar= new Pokemon(res.id,res.name,type,res.sprites.other.dream_world.front_default, res.height, res.base_experience, res.weight, res.abilities)
                var habilidades;
                for (var i = 0; i < this.PokemonMostrar.habilidades.length; i++){
                    var habilidades = this.PokemonMostrar.habilidades[i].ability.name
                    var count = i+1;
                    this.htmlHabilidades += `<h4>Habilidad-${count}: ${habilidades.toUpperCase()}</h4></p>`;
                };
                this.rowHtml = `
                    <div class="col-4">
                        <div class="card buscador" style="width: 18rem; id="#cardpo"">
                            <button type="button" class="close text-white" onclick="pokemonController.cerrarBusqueda()" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <img src="${this.PokemonMostrar.imgPoke}" class="card-img-top imgPoke" alt="...">
                            <div class="card-body p-2">
                                <h4 class="card-title text-center">Nombre: ${this.PokemonMostrar.name.toUpperCase()}</h4></p>
                                <h4 class="card-title text-center">Numero: ${this.PokemonMostrar.id}</h4></p>
                                <h5 class="card-title text-center">Tipo: ${this.PokemonMostrar.tipo.toUpperCase()}</h5></p>
                            </div>
                            <a href="#" class="btn btn btn-dark fluid" onclick="pokemonController.verMas(${this.PokemonMostrar.id})">VER MAS!</a>
                        </div>
                    </div>
                `;
                document.getElementById('muestraPoke').innerHTML=this.rowHtml;
                })
            };
    };
    
    verMas(id){
        pokemonService.getSpecie(id)
        .then(res => {
            var baby =  (res.is_baby)? "Si" : "No";
            var legendary =  (res.is_legendary)? "Si" : "No";
            if(!res.evolves_from_species){
                this.rowHtml =`
                    <div class="card  buscador mb-3 d-flex justify-content-center">
                        <button type="button" class="close text-white" onclick="pokemonController.cerrarBusqueda()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="card-body p-2">
                            <h4 class="card-title text-center bg-white">${this.PokemonMostrar.name.toUpperCase()}    ID: ${this.PokemonMostrar.id}</h4>
                            <img class="card-img-top agrandImgPoke" src="${this.PokemonMostrar.imgPoke}" alt="Card image cap">
                            <h4 >Tipo de Pokemon: ${this.PokemonMostrar.tipo.toUpperCase()}</h4>
                            <h4 >Experiencia Base: ${this.PokemonMostrar.experienciaBase}</h4>
                            <h4 >Altura: ${this.PokemonMostrar.altura}</h4>
                            <h4 >Peso: ${this.PokemonMostrar.peso}</h4>
                            ${this.htmlHabilidades}
                            <h4 >No es Evolucion</h4>
                            <h4 >${baby} es Bebe</h4>
                            <h4 >${legendary} es Legendario</h4>
                            <h4 >Color predominante: ${res.color.name}</h4>
                        </div>
                        <a href="#" class="btn btn btn-dark fluid" onclick="pokemonController.buscarPokemonInfo()">VER MENOS!</a>
                    </div>
                `;
            }else {  
                this.rowHtml =`
                    <div class="card  buscador mb-3 d-flex justify-content-center">
                        <button type="button" class="close" onclick="pokemonController.cerrarBusqueda()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="card-body p-2">
                            <h4 class="card-title text-center bg-white">${this.PokemonMostrar.name.toUpperCase()}    ID: ${this.PokemonMostrar.id}</h4>
                            <img class="card-img-top agrandImgPoke" src="${this.PokemonMostrar.imgPoke}" alt="Card image cap">
                            <h4 >Tipo de Pokemon: ${this.PokemonMostrar.tipo.toUpperCase()}</h4>
                            <h4 >Experiencia Base: ${this.PokemonMostrar.experienciaBase}</h4>
                            <h4 >Altura: ${this.PokemonMostrar.altura}</h4>
                            <h4 >Peso: ${this.PokemonMostrar.peso}</h4>
                            ${this.htmlHabilidades}
                            <h4 >Evoluciona de:  ${res.evolves_from_species.name.toUpperCase()}</h4>
                            <h4 >${baby} es Bebe</h4>
                            <h4 >${legendary} es Legendario</h4>
                            <h4 >Color predominante: ${res.color.name}</h4>
                        </div>
                        <a href="#" class="btn btn btn-dark fluid" onclick="pokemonController.buscarPokemonInfo()">VER MENOS!</a>
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

    cantidadSelect(){
        let cantidad = document.getElementById('cantidadSelect').value;
        switch(cantidad){
            case "1":
                this.listaPokemones(50)
                break;
            case "2":
                this.listaPokemones(75)
                break;
            case "3":
                this.listaPokemones(100)

                break;
            default:
                this.listaPokemones(30)
        };
    };

    
    listaPokemones(cantidad){
        var n = 0;
        cantidad+=1;
        while  (n < cantidad){
            pokemonService.getByPoke(n)
            .then(res => {
                this.cardHtml +=`
                    <div class="card  buscador " style="width: 18rem;">
                        <img class="card-img-top" src="${res.sprites.other.dream_world.front_default}" alt="Card image cap">
                        <ul class="list-group list-group-flush buscador">
                            <li class="list-group-item liLista"> <h4>Nombre: ${res.name}</h4></li>
                            <li class="list-group-item liLista"><h4>Numero: ${res.id}</h4></li>
                        </li>
                        </ul>
                    </div>    
                `;
                document.getElementById('todosPokemon').innerHTML=this.cardHtml;
            })
            n+=1;
        };
    };
}