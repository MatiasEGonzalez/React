import { useState } from "react"
// eslint-disable-next-line react/prop-types
export function TwitterFollowCard ({ children, userName, InitialIsFollowing}){
    const [isFollowing, setIsFollowing] = useState(InitialIsFollowing)

    const text = isFollowing? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    :'tw-followCard-button'

    const handleClick = () =>{
        setIsFollowing(!isFollowing)
    }

return(
    <article className='tw-followCard'>
        <header className='tw-followCard-header'>
            <img 
                className='tw-followCard-usuario'
                alt="Usuario" 
                src={`https://unavatar.io/${userName}`} />
            <div className='tw-followCard-info'>
                <strong>{children}</strong>
                <span className='tw-followCard-infoUserName'>
                    @{userName}
                </span>
            </div>
        </header>
        <aside>
            <button className={buttonClassName} onClick={handleClick}>
                <span className='tw-followCard-text'>{text}</span>
                <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
            </button>
        </aside>
    </article>
    )
}