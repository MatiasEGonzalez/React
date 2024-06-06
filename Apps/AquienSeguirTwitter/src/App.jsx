import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
        userName:'ceciarmy',
        name: 'Ceci Army',
        isFollowing: false
    },
    {
        userName:'MartinCuti',
        name:'Martin Romero',
        isFollowing: true
    },
    {
        userName:'pherald',
        name:'Pablo Hernandez',
        isFollowing:false
    },
    {
        userName:'ElonMusk',
        name:'Elon Musk',
        isFollowing:true
    },
    {
        userName:'vxnder',
        name:'Vander Hart',
        isFollowing:false
    }
]



export function App () {    
    return (
        <section className="App">
            {
                users.map(({ userName, name, isFollowing})=>(
                    <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        InitialIsFollowing={isFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                ))
            }
            

        </section>
    )
}