import "./App.css"
import { useCatImage } from "./hooks/useCatImage.js"
import { useCatFact } from "./hooks/useCatFact.js"
import { Otro } from "./Components/Otro.jsx"

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'


//Recuperar una cita sobre gatos de la Api
export function App () { 
    const { fact, refreshFact } = useCatFact()
    const { imageUrl } = useCatImage({ fact })
    
const handleClick = async () => {
    refreshFact()

}

    return (
        <main>
            <h1>App De gatitos</h1>

            <button onClick={handleClick}>Get new fact</button>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl} alt={`Image extradted using the first three words for ${fact}`}/>}
        
            <Otro />
            
        </main>

        
        
    )
}