import "./header.css"
function Header({onAddHotel}){
    return(

        <header className="header">
            <div className="logo">
                <img src="/logo.png" alt="StayFinder logo" />
               <span>GrandStay</span>
            </div>

            <button className="header-add-button" onClick={onAddHotel}>
                Add Hotel
            </button>
        </header>

    );
}

export default Header;