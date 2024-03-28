import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function GridSong(props) {
    const song = props.song
    const [isFavorited, setIsFavorited] = useState(false);
    const [showButton, setShowButton] = useState(false);

    function updateFavorites() {
        const updatedFavorites = [...props.favorites]

        if(isFavorited){ //remove
            let i = updatedFavorites.indexOf(song)
            updatedFavorites.splice(i, 1)
            props.setNumFavorites(props.numFavorites - 1)
        }else{ //add
            updatedFavorites.push(props.song)
            props.setNumFavorites(props.numFavorites + 1)
        }

        setIsFavorited(prevState => !prevState)
        props.setFavorites(updatedFavorites)
    }

    return(
        <div 
            className="grid-song" 
            id={song.name}
            onMouseEnter={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}>
            <div className="grid-image-wrapper">
                <img className="song-image" src={song.image}/>
                {showButton && (
                    <div  className="grid-fav-button fav-button">
                        <IconButton onClick={updateFavorites}  color="secondary">
                            {isFavorited ? <Favorite/> : <FavoriteBorder/>}
                        </IconButton>
                    </div>
                )}
            </div>
            <p className="grid-song-name">{song.name}</p>
            <p className="grid-artist">{song.artist}</p>
        </div>
    )
}

