import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Card from '~/components/card';


export default component$(() => {
  const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6']
  const sizes = [36,37,38,39,40,41,42,43,44,46,47,48,49]
  return (
      <div class="flex flex-col justify-center items-center mt-10">
        <Slot />

        <Link class="mt-10 text-white hover:text-gray-100 btn hover:shadow-amber-50 shadow transition-all duration-300 hover:bg-pink-500 bg-pink-700" href="/">
          Go back
        </Link>
      <h2 class={'mt-5'}>Tarjeta Ejemplo</h2>
      <Card colors={colors} sizes={sizes} backgroundColor='black'/>
      </div>

      )
});