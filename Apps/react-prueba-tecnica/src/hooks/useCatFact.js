import { useEffect, useState } from "react"
import { getRandomFact } from "../services/facts.js"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export function useCatFact  ()  {
    const [fact, setFact] = useState()

    const refreshFact = () =>{
        getRandomFact().then(newFact => setFact(newFact))

    }
    
    //Para recuperar la cita al cargar la pagina
     useEffect(refreshFact, [])

     return { fact, refreshFact}
}