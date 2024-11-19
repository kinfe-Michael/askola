import { useRef } from 'react'

export function useClientOnce(fn:()=>void){
    const canCall = useRef(true)
    if(typeof window !== 'undefined' && canCall.current){
        canCall.current = false
        fn()
    }
}