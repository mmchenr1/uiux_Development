import { IconButton } from '@material-ui/core';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function FavSongBanner(props) {
    let song = props.song

    function updateFavorites() {
        const updatedFavorites = [...props.favorites]

        let i = updatedFavorites.indexOf(song)
        updatedFavorites.splice(i, 1)
        props.setNumFavorites(props.numFavorites - 1)
        props.setFavorites(updatedFavorites)
    }

    return(
        <div className="fav-song-banner">
            <img className="banner-image" src={song.image}/>
            <div className="banner-text">
                <p className="banner-name">{song.name}</p>
                <p className="banner-artist artist">{song.artist}</p>
            </div>
            <div  className="banner-fav-button">
                <IconButton onClick={updateFavorites} color="secondary">
                    {props.favorites.includes(song) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
            </div>
        </div>
    )
}