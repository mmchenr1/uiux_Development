import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';
import React from 'react';



export default function GridSong(props) {
    const song = props.song
    const [showButton, setShowButton] = useState(false);
    const [infoPopoverOpen, setInfoPopoverOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    function updateFavorites() {
        const updatedFavorites = [...props.favorites]

        if(props.favorites.includes(song)){ //remove
            let i = updatedFavorites.indexOf(song)
            updatedFavorites.splice(i, 1)
            props.setNumFavorites(props.numFavorites - 1)
        } else{ //add
            updatedFavorites.push(props.song)
            props.setNumFavorites(props.numFavorites + 1)
        }

        props.setFavorites(updatedFavorites)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setInfoPopoverOpen(true)
    };

    const handleClose = () => {
        setAnchorEl(null)
        setInfoPopoverOpen(false)
        setShowButton(false)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'info-popover' : undefined;

    return(
        <div 
            className="grid-song" 
            id={song.name}
            onMouseEnter={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}>
            <div className="grid-image-wrapper">
                <img className="grid-song-image" src={song.image}/>
                <div className="overlay"></div>
                {showButton && (
                    <div className="grid-item-buttons">

                        <div>
                            <IconButton className="icon-button" onClick={handleClick}>
                                <InfoIcon className="info-icon"/>
                            </IconButton>

                            <Popover
                                className="grid-info-button info-button"
                                open={infoPopoverOpen}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <div style={{ padding: '20px' }}>
                                    <p>
                                        <b>Genres:</b> {song.genre.join(', ')}<br />
                                        <b>Release Date:</b> {song.year}<br />
                                        <b>Popularity Score:</b> {song.popularity}<br />
                                        <b>Danceability Score:</b> {song.danceability}<br />
                                    </p>
                                </div>
                            </Popover>
                        </div>

                        <div  className="grid-fav-button fav-button">
                            <IconButton className="icon-button" onClick={updateFavorites}  color="secondary"
                                style={{ backgroundColor: 'rgba(193, 232, 238, 0.7)' }}>
                                {props.favorites.includes(song) ? <Favorite/> : <FavoriteBorder/>}
                            </IconButton>
                        </div>
                    </div>

                )}

            </div>
            <p className="grid-song-name">{song.name}</p>
            <p className="grid-artist artist">{song.artist}</p>
        </div>
    )
}

