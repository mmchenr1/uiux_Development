import FavSongBanner from './FavSongBanner'

export default function FavoritesPanel(props) {
    return(
        <div id="favorites-panel">
            <h2>Favorites</h2>
            {/* insert dropdown for filtering here */}
            <div className="favorites-list">
                {props.favorites.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
                    <FavSongBanner 
                        key={index}
                        song={item} 
                        setFavorites={props.setFavorites} 
                        favorites={props.favorites} 
                        numfavorites={props.numFavorites} 
                        setNumFavorites={props.setNumFavorites}>
                    </FavSongBanner>
                ))}
            </div>
        </div>
    )
}