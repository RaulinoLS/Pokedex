
// var

const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

var listaPokemons = document.getElementById("listaPokemons");
var pokemonsNumber = 0;
var p = 0;
var modo_noturno = false;

// functions

$("#filtrar").click(function(){

    $(".loading2").show();

    progress_bar();

    const myInterval = setInterval(progress_bar, 50);

    function progress_bar() {
        $(".progress-bar").attr("style", "width:"+p+"%;");
        p = p + 1;
    
        if ( p == 101 ) {
            clearInterval(myInterval);

            setTimeout( function(){$(".loading2").hide(); $("#tabelinha").show();}, 1000);
        }
    }

    //setTimeout( function(){clearInterval(myInterval);$(".loading2").hide(); $("#tabelinha").show();}, 1500);

    var geracao = document.getElementsByName("generations");

    for ( var i = 0; i < geracao.length; i ++) {
            
        if( geracao[i].checked ) {
            console.log(geracao[i].value);
            if ( geracao[i].value == "genI" ) {
                $("#listaPokemons tr").remove();
                tabelaPokemons(152, 1);
            } else if ( geracao[i].value == "genII" ) {
                $("#listaPokemons tr").remove();
                tabelaPokemons(252, 152);
            } else if ( geracao[i].value == "genIII" ) {
                $("#listaPokemons tr").remove();
                tabelaPokemons(387,252);
            } else if ( geracao[i].value == "genIV" ) {
                $("#listaPokemons tr").remove();
                tabelaPokemons(494,387);
            } else if ( geracao[i].value == "genV" ) {
                $("#listaPokemons tr").remove();
                tabelaPokemons(650,494);
            } else if ( geracao[i].value == "genVI" ) {
                $("#listaPokemons tr").remove();
                tabelaPokemons(722,650);
            } else if ( geracao[i].value == "genVII" ) {
                $("#listaPokemons tr").remove();
                tabelaPokemons(810,722);
            } else if ( geracao[i].value == "nationalDex" ) {
                $("#listaPokemons tr").remove();
                tabelaPokemons(810,1);
            }
        }

    }

});

function tabelaPokemons(pokemonsNumber, initialCount) {

    while ( initialCount < pokemonsNumber ){

        let trListaPokemons = document.createElement("tr");
        let tdListaPokemons = document.createElement("td");
        let tdListaPokemons1 = document.createElement("td");
        let tdListaPokemons2 = document.createElement("td");
        let tipoPokemonLista1 = document.createElement("p");
        let tipoPokemonLista2 = document.createElement("p");
        let spriteListaPokemons = document.createElement("img");
        let nomeListaPokemons = document.createElement("p");

        tdListaPokemons1.appendChild(spriteListaPokemons);
        tdListaPokemons.appendChild(nomeListaPokemons);
        tdListaPokemons2.appendChild(tipoPokemonLista1);
        tdListaPokemons2.appendChild(tipoPokemonLista2);
        spriteListaPokemons.setAttribute("id", initialCount + "img");
        spriteListaPokemons.classList = "spritesGrandes";
        nomeListaPokemons.setAttribute("id", initialCount + "nome");
        tipoPokemonLista1.setAttribute("id", initialCount + "tipo1");
        tipoPokemonLista2.setAttribute("id", initialCount + "tipo2");
        tipoPokemonLista1.setAttribute("class", "tipoPokemon3 text-capitalize");
        tipoPokemonLista2.setAttribute("class", "tipoPokemon3 text-capitalize");
        if ( modo_noturno == true ) {
            tdListaPokemons.setAttribute("class", "background-noturno");
            tdListaPokemons1.setAttribute("class", "borda1 background-noturno");
            tdListaPokemons2.setAttribute("class", "borda2 background-noturno");
            nomeListaPokemons.setAttribute("class", "text-capitalize mt-4 texto-claro");
        } else {
            tdListaPokemons1.setAttribute("class", "borda1");
            tdListaPokemons2.setAttribute("class", "borda2");
            nomeListaPokemons.setAttribute("class", "text-capitalize mt-4");
        }
        trListaPokemons.appendChild(tdListaPokemons1);
        trListaPokemons.appendChild(tdListaPokemons);
        trListaPokemons.appendChild(tdListaPokemons2);
        trListaPokemons.setAttribute("id", initialCount);
        trListaPokemons.setAttribute("class", "linha");
        trListaPokemons.setAttribute("value", initialCount);
        listaPokemons.appendChild(trListaPokemons);

       $.get("https://pokeapi.co/api/v2/pokemon/" + initialCount + "/", function (batata) {

            imagemPokemon = batata.sprites.versions["generation-viii"].icons.front_default;
            nomePokemon = batata.name;
            idPokemon = batata.id;
            tipoPokemon0 = batata.types["0"].type.name;
            tipoPokemon1 = "";
        
            if (!batata.types[1]){
                $("#" + idPokemon + "tipo2").html("");
                $("#" + idPokemon + "tipo2").css("background-color", "");
                $("#" + idPokemon + "tipo1").html(tipoPokemon0);
                $("#" + idPokemon + "tipo1").css("background-color", colours[tipoPokemon0]);
        
            } else {
                var tipoPokemon1 = batata.types["1"].type.name;
                $("#" + idPokemon + "tipo1").html(tipoPokemon0);
                $("#" + idPokemon + "tipo2").html(tipoPokemon1);
                $("#" + idPokemon + "tipo1").css("background-color", colours[tipoPokemon0]);
                $("#" + idPokemon + "tipo2").css("background-color", colours[tipoPokemon1]);
            }

            $("#" + idPokemon + "nome").html(nomePokemon);
            $("#" + idPokemon + "img").attr("src", imagemPokemon);
            $("#" + idPokemon).attr("nomePokemon", batata.name);

        });

        initialCount++;

    };

    $(document).ready(function(){
        $("#tabelaListaPokemonsMds > tbody > tr").on('click', function() {
    
            var idPrincipal = $(this).attr("id");
    
            window.location.assign("mostrarPokemon.html?id="+idPrincipal+"");
    
        });
    });

};

$(".modo-noturno").click(function(){

    if( modo_noturno == true ) {

        $("body").removeClass("background-noturno");
        $(".list-group-item").removeClass("background-noturno").removeClass("texto-claro");
        $("a").removeClass("texto-claro");
        $("h1").removeClass("texto-claro");
        $("#listaPokemons tr td").removeClass("background-noturno");
        $("#listaPokemons tr td p").removeClass("texto-claro");

        $(".icone-um").attr("src", "brilho-do-sol.png");
        $(".icone-dois").attr("src", "modo-noturno.png");

        modo_noturno = false;
    } else {

        $("body").addClass("background-noturno");
        $(".list-group-item").addClass("background-noturno").addClass("texto-claro");
        $("a").addClass("texto-claro");
        $("h1").addClass("texto-claro");
        $("#listaPokemons tr td").addClass("background-noturno");
        $("#listaPokemons tr td p").addClass("texto-claro");

        $(".icone-um").attr("src", "modo-noturno2.png");
        $(".icone-dois").attr("src", "brilho-do-sol.png");

        modo_noturno = true;
    }
});

// start functions

$("#tabelinha").hide();
$(".loading2").hide();

$(document).ready(function(){
    $("#tabelaListaPokemonsMds > tbody > tr").on('click', function() {

        var idPrincipal = $(this).attr("id");

        mostrarPokemonPokedex(idPrincipal);

    });
});

$(document).ready(function() {
    $("#nomePokemon").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#tabelaListaPokemonsMds tr").filter(function() {
            $(this).toggle($(this).text()
            .toLowerCase().indexOf(value) > -1)
        });
    });
});


