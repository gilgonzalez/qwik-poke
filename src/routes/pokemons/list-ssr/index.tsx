import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getPokemonDescription } from '~/helpers/get-chat-gpt-response';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async({ query, redirect, pathname }) => {

  const offset = Number( query.get('offset') || '0' );
  if ( isNaN(offset) ) redirect(301, pathname );
  if ( offset < 0 ) redirect(301, pathname );

  return getSmallPokemons(offset);

  // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ offset }`);
  // const data = await resp.json() as PokemonListResponse;

  // return data.results;

});




export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation()
  const modalVisible = useSignal(false)
  const pokemonDescription = useSignal('')
  const modalInfo = useStore({
    id : '',
    name : '',
  })

  
  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get('offset');
    const offsetString = new URLSearchParams( location.url.search );
    return Number(offsetString.get('offset') || 0 );
  })
  // * MODALS FUNCTION
  const showModal = $((id : string, name : string)=> {
    modalInfo.id = id;
    modalInfo.name = name;
    modalVisible.value = true
  })
  const closeModal = $(()=> {
    modalVisible.value = false
  })

  useVisibleTask$(({track})=> {
    track (()=> modalInfo.name)
    pokemonDescription.value = ''

    if(modalInfo.name !== '') {
     getPokemonDescription(modalInfo.name).then(resp => pokemonDescription.value = resp)
    }
  })


  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: { currentOffset }</span>
        <span>Está cargando página: { location.isNavigating ? 'Si': 'No' } </span>
      </div>

      <div class="mt-10">
        <Link href={ `/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }` }
           class={`btn  mr-2 ${currentOffset.value <= 0 ? 'bg-gray-700': 'btn-primary'}`}>
          Anteriores
        </Link>

        <Link href={ `/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }` }
          class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-5 mt-5">
        {
          pokemons.value.map(({ name, id }) => (
            <div key={ name } onClick$={ ()=>showModal(id, name) } class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} />
              <span class="capitalize">{ name }</span>
            </div>
          ))
        }
        
      </div>
      <Modal visible = {modalVisible.value} closeModal={closeModal} persistant={true}>
        <div q:slot='title'>
          {modalInfo.name}
        </div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
          <PokemonImage id={modalInfo.id }/>
          <span>{pokemonDescription.value || 'Consultando la pokedex'}</span>
        </div>
      </Modal>
    
    </>
  )
});


export const head: DocumentHead = {
  title: 'List SSR',
};