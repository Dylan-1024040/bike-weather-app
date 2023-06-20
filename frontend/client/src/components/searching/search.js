import { useState } from "react";
import { AsyncPaginate } from  "react-select-async-paginate";

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);



    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Zoek een stad"
            debounceTimeout={700}
            value={search}
            onChange={handleOnChange}
        />


    )
}

export default Search;