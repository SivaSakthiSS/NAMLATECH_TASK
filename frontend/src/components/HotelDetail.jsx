import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios  from "axios"
import {Helmet} from "react-helmet-async"
import "./HotelDetail.css"

function HotelDetail(){
    const { hotelId } = useParams();
    const navigate = useNavigate();

    const[hotel, setHotel] = useState(null);
    const[error, setError] = useState("")
    const[userLocation, setUserLocation] = useState(null);
    const[locationError, setLocationError] = useState("");

    useEffect(() =>{
        async function getHotel() {
            try{
                const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
                setHotel(response.data);
            }
            catch(error){
                console.log(error);
                setError("Hotel could not be loaded");
            }
        }getHotel();
    },[hotelId]);

    function getUserLocation(){
        if(!navigator.geolocation){
            return setLocationError("location is not supported by this browser")
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({latitude:position.coords.latitude, longitude:position.coords.longitude});

            setLocationError("");
        },
        () =>{setLocationError("could not get your current location")}
    )}

    if(error){
        return <p>{error}</p>;
    }

    if(!hotel){
        return <p>loading...</p>
    }

    return(
        <>
        <Helmet>
            <title>{hotel.title} - Hotel Details</title>
            <meta  name="description" content={hotel.description}/>
        </Helmet>
        <div className="detail-page">

            <div className="detail-card">
                <img src={`http://localhost:5000${hotel.image}`} alt={hotel.title} className="detail-image" />
                 
                 <div className="detail-content">
                    <h1>{hotel.title}</h1>
                    <p>{hotel.description}</p>
                    <p className="detail-price">₹{hotel.price} per night</p>

                    <div className="coordinates">
                    <p>
                        <strong>Latitude:</strong> {hotel.latitude}
                    </p>

                    <p>
                        <strong>Longitude:</strong> {hotel.longitude}
                    </p>

                    </div>

                    <h2>Hotel location</h2>

                    <button className="location-button" onClick={getUserLocation}>Get my location</button>

                    {userLocation && (
                        <div className="user-location">
                            <p>your location: {userLocation.latitude},{userLocation.longitude}</p>
                        </div>
                    )}

                    {locationError  && (<p className="location-error">{locationError}</p>)}

                    <iframe
                          title="hotel location"
                          width="100%"
                          height="350"
                          style={{ border: "0px" }}
                          loading="lazy"
                           src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(hotel.longitude) - 0.01}%2C${Number(hotel.latitude) - 0.01}%2C${Number(hotel.longitude) + 0.01}%2C${Number(hotel.latitude) + 0.01}&layer=mapnik&marker=${hotel.latitude}%2C${hotel.longitude}`}
                      />
                </div>
            </div>
                <button onClick={() => navigate("/")}> Back to home</button>
        </div>
        </>
    );
}

export default HotelDetail