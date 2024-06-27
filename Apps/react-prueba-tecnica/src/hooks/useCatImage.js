import { useEffect, useState } from "react"


const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
//Custome Hook--> no puede estar dentro de un if
// tampoco dentro de un while, no puede cambiar su posicion, siempre tiene que ser llamado dentro del cuerpo de nuestro componente

export function useCatImage ({ fact }) {
    const [imageUrl, setImageUrl] = useState()
    

    //Recuperar una img de la Api + las 3 primeras palabras de la cita (Cada vez que tenemos una cita nueva)
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')
    console.log(threeFirstWords)

    fetch(`${CAT_PREFIX_IMAGE_URL}/cat/says/${threeFirstWords}?size=50&color=red`)
          .then(res => res.blob())
          .then(blob => {
            const imageUrl = URL.createObjectURL(blob)
            setImageUrl(imageUrl)
        })
        
}, [fact]) //si lo dejamos vacio se renderiza una vez, si ponemos el fact del UseEffect anterior, se actualiza cada vez que se actualice el fact
    return { imageUrl }

}
