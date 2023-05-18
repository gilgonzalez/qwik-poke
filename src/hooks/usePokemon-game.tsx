import { $, useComputed$, useContext } from "@builder.io/qwik"
import { PokemonGameContext } from "~/context"

export const usePokemon = ()=> {

    const pokemonGame = useContext(PokemonGameContext)

    const getRandomPokemonId = $(()=> {
        pokemonGame.pokemonId = Math.floor(Math.random() * 252) + 1
        pokemonGame.isPokemonVisible = false
    })
    const changePokemonId = $((value : number)=> {
        if((pokemonGame.pokemonId + value ) <= 0)return;
        pokemonGame.pokemonId += value
    })

    const toggleFlip = $(()=> {
        pokemonGame.showBackImage = !pokemonGame.showBackImage
    })
    const toggleVisible = $(()=> {
        pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible
    })



    return {
        pokemonId : useComputed$(()=> pokemonGame.pokemonId),
        showBackImage : useComputed$(()=> pokemonGame.showBackImage),
        isPokemonVisible : useComputed$(()=> pokemonGame.isPokemonVisible),
        nextPokemon : $(()=>changePokemonId(1)),
        previousPokemon : $(()=>changePokemonId(-1)),
        getRandomPokemonId,
        toggleFlip,
        toggleVisible
    }
}