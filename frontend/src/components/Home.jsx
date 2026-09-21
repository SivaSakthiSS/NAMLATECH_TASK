import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHotels } from "../redux/hotelSlice";
import Pagination from "./Pagination";
import "./Home.css"
import HotelCard from "./HotelCard";
import SearchBox from "./SearchBox";
import Hotelfrom from "./Hotelform";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Home(){

    const dispatch = useDispatch();
    const hotels = useSelector((state) => state.hotels.hotels || []);
    const[search, setSearch] = useState("")
    const[minPrice, setMinPrice] = useState("")
    const[maxPrice, setMaxPrice] = useState("")
    const[currentPage, setCurrentPage] = useState(1)
    const [totalHotels, setTotalHotels] = useState(0)
    const[editHotel, setEdit] = useState(null)
    const[showForm, setShowForm] = useState(false)
    const[deletemsg, setDeletemsg] = useState("")

    async function handleDelete(id) {

        const confirmDelete = window.confirm("are you sure delete this hotel?");

        if(!confirmDelete){
            return
        }
        try{
            const response = await axios.delete(`http://localhost:5000/api/hotels/${id}`);
            setDeletemsg("hotel deleted");
            await getHotels();
        }
        catch(error){
            console.log(error)
            setDeletemsg("hotel not deleted");
        }
    }

    async function getHotels() {
        try{
            const response = await axios.get("http://localhost:5000/api/hotels",
                {
                    params: {
                        search: search,
                        minPrice: minPrice,
                        maxPrice: maxPrice,
                        page: currentPage
                    }
                });
                dispatch(setHotels(response.data.hotels));
                setTotalHotels(response.data.total);
            }
            catch(error){
                console.log(error)
              
            }
    }

    useEffect(() =>{
        setCurrentPage(1);
    }, [search, minPrice, maxPrice]);
    
    useEffect(() =>{
        getHotels();
    }, [search, minPrice, maxPrice, currentPage]);

    useEffect(() =>{
        if(deletemsg){
            const timer = setTimeout(() =>{setDeletemsg("")}, 2000);
             return () => clearTimeout(timer);
        }
    }, [deletemsg])
    
    
    return(
    
    <div className="app-page">

        <Header onAddHotel={() =>{setEdit(null); setShowForm(true);}} />

    <div className="dashboard">
        <Sidebar onAddHotel={() => {
             setEdit(null)
             setShowForm(true)
            }} />

        <main className="main-content">
        
        {deletemsg &&(<div className="delete">{deletemsg}</div>)}
        
        {showForm &&(
            <Hotelfrom 
               editHotel={editHotel}
                onSaved={getHotels} 
                clearEdit={() => {
                    setEdit(null)
                    setShowForm(false)
                }}
            /> 
        )}
        
        <SearchBox search={search} setSearch={setSearch} 
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>

          <div className="hotel-heading">
            <h2>All Hotels</h2>
          </div>
          
          <div className="hotel-list"> 
            {hotels.map((hotel) => (
                <HotelCard
                   key= {hotel.id} 
                   hotel={hotel}
                   onEdit ={()=> {
                    setEdit(hotel);
                    setShowForm(true)
                   }}
                   onDelete = {handleDelete}
                />
            ))}
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalHotels={totalHotels}/>

        <section className="about-section" id="about">
            <h2>About GrandStay</h2>

            <p className="detail"> GrandStay makes it easy to discover and manage comfortable stays.
                Explore hotels, check prices, view complete details and find hotel
                locations easily.
            </p>
            
        </section>

        </main>
        </div>

    </div>

  );

}

export default Home;