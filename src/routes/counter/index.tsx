import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks/useCounter';


export default component$(() => {

 const {counter, increaseCounter, decreaseCounter} = useCounter(0)


  

  return (<>
    <span class="text-3xl">Counter</span>
    <span class="text-5xl">{counter.value}</span>
    <div class="btn-group mt-5 justify-center items-center gap-5">
      <button 
      onClick$={()=>decreaseCounter()} 
      disabled={counter.value < 1} 
      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">-</button>
      <button 
      onClick$={()=>increaseCounter()} 
      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+</button>
    </div>
  </>)
});