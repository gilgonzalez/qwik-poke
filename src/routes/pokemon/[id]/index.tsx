import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemon } from '~/hooks/usePokemon-game';


export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

    const id = Number(params.id);
    if ( isNaN( id ) ) redirect( 301, '/' );
    if ( id <= 0 ) redirect( 301, '/' );
    if ( id > 1000 ) redirect( 301, '/' );
    
    return id;
});

export default component$(() => {
    const pokemonId = usePokemonId();

    // const location = useLocation();
    const {toggleFlip, toggleVisible, isPokemonVisible, showBackImage} = usePokemon()

    return (
        <>
            {/* <span class="text-5xl">Pokemon: {location.params.id} </span> */}
            <span class="text-5xl">Pokemon: { pokemonId } </span>

            <PokemonImage 
                id={ pokemonId.value }
                isVisible={ isPokemonVisible.value }
                backImage={ showBackImage.value }
            />
            <div class="flex gap-2">
                <button class= "btn btn-primary" onClick$={toggleVisible}>Revelar</button>
                <button class= "btn btn-primary" onClick$={toggleFlip}>Voltear</button>
            </div>
        </>
    )
});