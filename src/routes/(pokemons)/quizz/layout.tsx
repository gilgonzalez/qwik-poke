import { Slot, component$ } from '@builder.io/qwik';
import './styles.module.css'



export default component$(() => {
  
  return (
    <>
        <div id='whatever' class="flex flex-col items-center justify-center mt-2 quizz">
            <Slot/>
        </div>  
    </>
  )
});