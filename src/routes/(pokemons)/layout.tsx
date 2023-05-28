import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Navbar from '~/components/shared/navbar/navbar';
import { PokemonProvider } from '~/context';

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  
  const jwtCookie = cookie.get('jwt')
  if (jwtCookie) { 
    console.log('cookie found')
    return
  }
  redirect(302, '/login')
}
 )

export default component$(() => {
  return (
    <>
        <PokemonProvider>
        <Navbar />
        <main class="flex flex-col items-center justify-center">
        <Slot />
        </main>
    </PokemonProvider>
    </>
)
});