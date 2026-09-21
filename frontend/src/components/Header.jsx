import "./header.css"
function Header({onAddHotel}){
    return(

        <header className="header">
            <div className="logo">
                <img src="/logo.png" alt="StayFinder logo" />
               <span>GrandStay</span>
            </div>

            <h1 className="title">Welcome GrandStay !!</h1>

            <button className="header-add-button" onClick={onAddHotel}>
                + Add Hotel
            </button>
        </header>

    );
}

export default Header;