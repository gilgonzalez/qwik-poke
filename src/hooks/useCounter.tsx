import { $, useComputed$, useSignal } from "@builder.io/qwik"


export const useCounter = (initialValue : number) => {

    const counter = useSignal(initialValue)

    const increaseCounter = $(() => {
      counter.value++
    })
    const decreaseCounter = $(() => {
      if(counter.value < 1) return
      counter.value--
    })

    return {increaseCounter, decreaseCounter, counter : useComputed$(() => counter.value)}
}