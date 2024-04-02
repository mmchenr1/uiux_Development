import FavSongBanner from './FavSongBanner'
import { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//enum-type definition of valid filters
const SortType = {
    DEFAULT: 'default',
    ALPHABETICAL: 'alphabetical',
    MOST_RECENTLY_RELEASED: 'most_recently_released',
    MOST_DANCEABLE: "most_danceable",
    MOST_POPULAR: "most_popular",
};

export default function FavoritesPanel(props) {
    const [sort, setSort] = useState(SortType.DEFAULT) //TODO: def a way to make an ENUM type of class to classify valid filter objects
    const [filteredFavorites, setFilteredFavorites] = useState([...props.favorites]) //for props that are sorted and filtered (ie what to show after eveything is applied)
    const [filters, setFilters] = useState([])

    useEffect(() => {
        applySort(sort);
    }, [props.favorites]); // Apply filtering when props.favorites changes

    const changeSort = (event) => {
        let f = event.target.value;
        setSort(f)
        applySort(f)
    }

    const applySort = (f) => {
        switch(f){
            case SortType.DEFAULT:
                setFilteredFavorites([...props.favorites])
                break;
            case SortType.ALPHABETICAL:
                setFilteredFavorites([...props.favorites].sort((a, b) => a.name.localeCompare(b.name)));
                break;
            case SortType.MOST_RECENTLY_RELEASED:
                setFilteredFavorites([...props.favorites].sort((a, b) => new Date(b.year) - new Date(a.year)));
                break;
            case SortType.MOST_DANCEABLE:
                setFilteredFavorites([...props.favorites].sort((a, b) => b.danceability - a.danceability));
                break;
            case SortType.MOST_POPULAR:
                setFilteredFavorites([...props.favorites].sort((a, b) => a.popularity - b.popularity));
                break;
            default:
                break;
        }
    }


    const updateFiltering = (event) => {
        let s = event.target.value
        let newFilters = [...filters]

        if(filters.includes(s)) { //remove filter
            const index = filters.indexOf(s);
            if (index !== -1) newFilters.splice(index, 1);
            filterSongs([...props.favorites], newFilters)
        }

        else {
            newFilters.push(s) //add filter
            filterSongs([...filteredFavorites], newFilters)
        }
        
        setFilters(newFilters)
    }

    const filterSongs = (songs, filters) => {
        let filteredArray = songs.filter(song => {
            return filters.every(f => {
                return song.genre && song.genre.some(entry => entry.includes(f))
            })
        });
        setFilteredFavorites(filteredArray)
    }

    return(
        <div id="favorites-panel">
            <h2>Favorites</h2>
            <p id="num-favorites-text">{props.numFavorites} songs</p>

            <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sort}
                label="Sort"
                onChange={changeSort}
            >
                <MenuItem value={SortType.DEFAULT} id="default">Order Favorited</MenuItem>
                <MenuItem value={SortType.ALPHABETICAL} id="alphabetical">Alphabetical</MenuItem>
                <MenuItem value={SortType.MOST_RECENTLY_RELEASED} id="recent">Most Recently Released</MenuItem>
                <MenuItem value={SortType.MOST_DANCEABLE} id="most_danceable">Most Danceable</MenuItem>
                <MenuItem value={SortType.MOST_POPULAR} id="most_popular">Most Popular</MenuItem>
            </Select>

            <ToggleButtonGroup
                className="filter-buttons"
                value={filters}
                onChange={updateFiltering}
                aria-label="filter buttons"
            >
                <ToggleButton value="Indie">Indie</ToggleButton>
                <ToggleButton value="Alternative">Alternative</ToggleButton>
                <ToggleButton value="Rock">Rock</ToggleButton>
                <ToggleButton value="Soul">Soul</ToggleButton>
                <ToggleButton value="R&B">R&B</ToggleButton>
                <ToggleButton value="Pop">Pop</ToggleButton>
                <ToggleButton value="Singer-Songwriter">Singer-Songwriter</ToggleButton>
                <ToggleButton value="Dance/Electronic">Dance/Electronic</ToggleButton>
                
            </ToggleButtonGroup>

            <div className="favorites-list">
                {filteredFavorites.map((item, index) => (
                    <FavSongBanner 
                        key={index}
                        song={item} 
                        setFavorites={props.setFavorites} 
                        favorites={props.favorites} 
                        numFavorites={props.numFavorites} 
                        setNumFavorites={props.setNumFavorites}>
                    </FavSongBanner>
                ))}
            </div>
        </div>
    )
}
