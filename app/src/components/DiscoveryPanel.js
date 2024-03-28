
import songsData from "../assets/song_data.json"
import GridSong from "./GridSong"

/* makes the image URLs work*/
songsData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
});
  

export default function DiscoveryPanel(props) {
    return(
        <div id="discovery-panel">  
            {songsData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
                <GridSong 
                    key={index}
                    song={item} 
                    setFavorites={props.setFavorites} 
                    favorites={props.favorites} 
                    numfavorites={props.numFavorites} 
                    setNumFavorites={props.setNumFavorites} 
                    >
                </GridSong>
            ))}
        </div>
    )
}