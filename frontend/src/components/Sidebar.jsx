import "./sidebar.css"

function Sidebar({onAddHotel}){
    return(
        <aside className="sidebar">

            <h3 className="dash-title">DASHBOARD</h3>

            <div className="sidebar-menu">

                <button className="side-page">
                    <span>Home</span>
                </button>

                <button className="side-page">
                    <span>Hotels</span>
                </button>

                <button className="side-page" onClick={onAddHotel}>
                   <span>Add Hotel</span> 
                </button>

                <button className="side-page">
                    <span>About</span>
                </button>
            </div>
        </aside>

    );
}

export default Sidebar