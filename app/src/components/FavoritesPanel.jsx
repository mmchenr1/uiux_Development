import FavSongBanner from './FavSongBanner'
import { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@material-ui/core';

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
        applySort(sort, [...props.favorites]);
    }, [props.favorites]); // Apply filtering when props.favorites changes

    const changeSort = (event) => {
        let f = event.target.value;
        setSort(f)
        applySort(f, filteredFavorites)
    }

    const applySort = (f, arr) => {
        if (!Array.isArray(arr)) {
            console.error("applySort: 'arr' parameter is not an array or is undefined");
            return;
        }

        switch(f){
            case SortType.DEFAULT:
                //want filtered array in order of props.favorites
                setFilteredFavorites(props.favorites.filter(item => arr.includes(item)))
                break;
            case SortType.ALPHABETICAL:
                setFilteredFavorites([...arr].sort((a, b) => a.name.localeCompare(b.name)));
                break;
            case SortType.MOST_RECENTLY_RELEASED:
                setFilteredFavorites([...arr].sort((a, b) => new Date(b.year) - new Date(a.year)));
                break;
            case SortType.MOST_DANCEABLE:
                setFilteredFavorites([...arr].sort((a, b) => b.danceability - a.danceability));
                break;
            case SortType.MOST_POPULAR:
                setFilteredFavorites([...arr].sort((a, b) => a.popularity - b.popularity));
                break;
            default:
                break;
        }
    }

    const updateFiltering = (event) => {
        let s = event.target.value;
        let newFilters = [...filters];
    
        if (filters.includes(s)) { // Remove filter
            const index = filters.indexOf(s);
            if (index !== -1) newFilters.splice(index, 1);
        } else {
            newFilters.push(s); // Add filter
        }
    
        setFilters(newFilters);
        filterAndSort(newFilters);
    };

    const filterAndSort = (filters) => {
        console.log("")
        console.log("filters ", filters)
        console.log("sort ", sort)
        console.log("")
        //filter
        let filteredArray = [...props.favorites].filter(song => {
            return filters.every(f => {
                return song.genre && song.genre.some(entry => entry.includes(f));
            });
        });
        setFilteredFavorites(filteredArray);
        console.log("filteredArray ", filteredArray)

        //sort
        applySort(sort, filteredArray)
    };

    const resetFiltersAndSort = () => {
        setSort(SortType.DEFAULT);
        setFilters([]);
        setFilteredFavorites([...props.favorites]);
    };


    return(
        <div id="favorites-panel">
            <h2>Favorites</h2>
            <p id="num-favorites-text">{props.numFavorites} songs</p>

            <div className="top-bar-wrapper top-bar-favs-panel">
                <IconButton className="reset-button" onClick={resetFiltersAndSort}
                    aria-label="reset filters and sort">
                    <ClearIcon />
                </IconButton>

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
            </div>
{/* 
            <ToggleButtonGroup
                className="filter-buttons favorites-filter-buttons"
                value={filters}
                onChange={updateFiltering}
                aria-label="filter buttons"
            >
                <ToggleButton value="Indie" className="genre-filter-button">Indie</ToggleButton>
                <ToggleButton value="Alternative" className="genre-filter-button">Alternative</ToggleButton>
                <ToggleButton value="Rock" className="genre-filter-button">Rock</ToggleButton>
                <ToggleButton value="Soul" className="genre-filter-button">Soul</ToggleButton>
                <ToggleButton value="R&B" className="genre-filter-button">R&B</ToggleButton>
                <ToggleButton value="Pop" className="genre-filter-button">Pop</ToggleButton>
                <ToggleButton value="Singer-Songwriter" className="genre-filter-button">Singer-Songwriter</ToggleButton>
                <ToggleButton value="Dance/Electronic" className="genre-filter-button">Dance/Electronic</ToggleButton>
                
            </ToggleButtonGroup> */}

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
