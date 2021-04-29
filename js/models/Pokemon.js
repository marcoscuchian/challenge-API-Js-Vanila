class Pokemon {
    id;
    name;
    tipo;
    imgPoke;
    altura;
    experienciaBase;
    peso;
    habilidades= [];
    
    constructor(id,name,tipo,imgPoke, altura,experienciaBase,peso, habilidades){
        this.id = id;
        this.name = name;
        this.tipo = tipo;
        this.imgPoke = imgPoke;
        this.altura = altura;
        this.experienciaBase= experienciaBase;
        this.peso = peso;
        this.habilidades = habilidades;

}

}