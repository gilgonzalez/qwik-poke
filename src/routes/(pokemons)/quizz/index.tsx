import { component$, useSignal} from '@builder.io/qwik';
import './styles.module.css';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const random = useSignal<number | string>(Math.floor(Math.random() * 251) + 1);
  

  return (
    <div id='whatever'>
      <PokemonImage id={random.value} isVisible = {false} />
      <button onClick$={() => {random.value = Math.floor(Math.random() * 251) + 1; } } class="btn btn-primary mr-2">Try Another!</button>
    </div>
  )
});