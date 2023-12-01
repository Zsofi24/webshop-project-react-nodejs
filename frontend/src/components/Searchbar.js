import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Button from "./button/Button";

export default function Searchbar() {

    const [search, setSearch] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    function changeSearch(e) {
        setSearch(e.target.value);
        searchParams.delete('q');
        if(e.target.value) searchParams.append('q', e.target.value);
        setSearchParams(searchParams);
    }

    function deleteSearch() {
        searchParams.delete('q');
        setSearchParams(searchParams);
        setSearch('');
    }

  return (
    <div className="searchbar">
        <fieldset className="">
            <label htmlFor='search'><IoIosSearch /></label>
            <input 
            id='search'
            name='search'
            type='text'
            value={search}
            placeholder="keresés"
            onChange={(e) => changeSearch(e)}
            />
            <Button type='cart-delete' handleClick={deleteSearch}>X</Button>
        </fieldset> 
    </div>
  )
}
