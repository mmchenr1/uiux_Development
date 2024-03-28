import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function GridSong(props) {
    const song = props.song
    const [showButton, setShowButton] = useState(false);

    function updateFavorites() {
        const updatedFavorites = [...props.favorites]

        if(props.favorites.includes(song)){ //remove
            let i = updatedFavorites.indexOf(song)
            updatedFavorites.splice(i, 1)
            props.setNumFavorites(props.numFavorites - 1)
        }else{ //add
            updatedFavorites.push(props.song)
            props.setNumFavorites(props.numFavorites + 1)
        }

        props.setFavorites(updatedFavorites)
    }

    console.log(song.image)

    return(
        <div 
            className="grid-song" 
            id={song.name}
            onMouseEnter={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}>
            <div className="grid-image-wrapper">
                <img className="grid-song-image" src={song.image}/>
                <div class="overlay"></div>
                {showButton && (
                    <div  className="grid-fav-button fav-button">
                        <IconButton className="icon-button" onClick={updateFavorites}  color="secondary"
                            style={{ backgroundColor: 'rgba(193, 232, 238, 0.7)' }}>
                            
                            {props.favorites.includes(song) ? <Favorite/> : <FavoriteBorder/>}
                        </IconButton>
                    </div>
                )}
            </div>
            <p className="grid-song-name">{song.name}</p>
            <p className="grid-artist artist">{song.artist}</p>
        </div>
    )
}

