import {useNavigate} from "react-router-dom";
import "./HotelCard.css"

function HotelCard({hotel, onEdit, onDelete}){

    const navigate = useNavigate();
    function viewHotel(){
        navigate(`/hotels/${hotel.id}`);
    }
    return(
        <div className="hotel-card">

           <img src={`http://localhost:5000${hotel.image}`}
               alt={hotel.title} className="hotel-image" />
           
           <div className="hotel-body">
               <h2>{hotel.title}</h2>
               
               <p className="description">{hotel.description}</p>
               
               <p className="hotel-price">₹{hotel.price} per night</p>

               <div className="hotel-buttons">
                   <button onClick={viewHotel} className="view-button"> view detail</button>
                   <button className="edit-button" onClick={() => onEdit(hotel)}>Edit</button>
                   <button className="delete-button" onClick={() => onDelete(hotel.id)}>delete</button>
                </div>
           </div>
        </div>
    );
}

export default HotelCard;