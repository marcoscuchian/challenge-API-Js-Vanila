class PokemonService {

    async getAll(){
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
            return response.data
        }catch(error){
            return {error: true, message: 'Error while obtaining the teacher'}
        }   
    }

    async getByPoke(info){
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${info}`);
            return response.data
        }catch(error){
            const response = false;
            return response
        }   
    }
    async getSpecie(id){
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            return response.data
        }catch(error){
            const response = false;
            return response
        }   
    }

}

const pokemonService = new PokemonService();