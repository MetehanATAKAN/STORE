import React, { useEffect } from 'react'
import { getAllFavorites } from '../../services/favorites'

const userId = sessionStorage.getItem('userId');

const Favorites:React.FC = () => {

    useEffect(() => {
        (async ()=>{
            const res = await getAllFavorites(userId);
            console.log(res);
        })()
    }, [])
    
  return (
    <div>Favorites</div>
  )
}

export default Favorites