import { $, component$, useContext, useOnDocument, useSignal, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead, } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';

import { PokemonListContext } from '~/context';
import { getPokemonDescription } from '~/helpers/get-chat-gpt-response';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';

// import type { SmallPokemon } from '~/interfaces';
// interface PokemonPageState {
//   currentPage: number;
//   isLoading  : boolean;
//   pokemons   : SmallPokemon[];
// }


export default component$(() => {

  const pokemonState = useContext(PokemonListContext);
  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   isLoading: false,
  //   pokemons: [],
  // });

  // Solo el client
  // useVisibleTask$( async({ track }) => {
  //   track( () => pokemonState.currentPage );

  //   const pokemons = await getSmallPokemons( pokemonState.currentPage * 10 );
  //   pokemonState.pokemons = [ ...pokemonState.pokemons,  ...pokemons];
  // });

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

    pokemonState.isLoading = false;

  });

  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if ((currentScroll + 200) >= maxScroll && !pokemonState.isLoading) {
      pokemonState.isLoading = true;
      pokemonState.currentPage++;
    }
  }))

  //* MODAL THINGS
  const modalVisible = useSignal(false)
  const pokemonDescription = useSignal('')
  const modalInfo = useStore({
    id: '',
    name: '',
  })
  const showModal = $((id: string, name: string) => {
    modalInfo.id = id;
    modalInfo.name = name;
    modalVisible.value = true
  })
  const closeModal = $(() => {
    modalVisible.value = false
  })

  useVisibleTask$(({ track }) => {
    track(() => modalInfo.name)
    pokemonDescription.value = ''

    if (modalInfo.name !== '') {
      getPokemonDescription(modalInfo.name).then(resp => pokemonDescription.value = resp)
    }
  })


  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual: {pokemonState.currentPage}</span>
        <span>Está cargando: </span>
      </div>

      <div class="mt-10">
        {/* <button onClick$={() => pokemonState.currentPage-- }
          class="btn btn-primary mr-2">
          Anteriores
        </button> */}

        <button onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2">
          Siguientes
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 mt-5">
        {
          pokemonState.pokemons.map(({ name, id }) => (
            <div key={name} onClick$={() => showModal(id, name)} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }

      </div>

      <Modal visible={modalVisible.value} closeModal={closeModal} persistant={true}>
        <div q:slot='title'>
          {modalInfo.name}
        </div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
          <PokemonImage id={modalInfo.id} />
          <span>{pokemonDescription.value || 'Consultando la pokedex'}</span>
        </div>
      </Modal>
    </>
  )
});



export const head: DocumentHead = {
  title: 'List Client',
};