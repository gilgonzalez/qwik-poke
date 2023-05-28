import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
    <div class="flex flex-col justify-center items-center mt-10">
        <Slot />

        <Link class="mt-10 text-white hover:text-gray-100 btn hover:shadow-amber-50 shadow transition-all duration-300 hover:bg-pink-500 bg-pink-700" href="/">
            Go back
        </Link>
    </div>
    </>
    
  )
});