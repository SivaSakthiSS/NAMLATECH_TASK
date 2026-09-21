function SearchBox({search,setSearch, minPrice,  setMinPrice, maxPrice, setMaxPrice}){
    return(
        <div className="search-filter">
             
            <input type="text" placeholder="&#128269; search by title" value={search} onChange={(e) => setSearch(e.target.value)} />

            <input type="number" placeholder="Min-price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>

            <input type="number" placeholder="Max-price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
    )

}

export default SearchBox;