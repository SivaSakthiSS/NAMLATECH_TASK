import { useState, useEffect } from "react";
import axios from "axios";
import "./hotelform.css";

function Hotelfrom({editHotel, onSaved, clearEdit}){

    const[title, setTitle] = useState("");
    const[description, setdescription] = useState("");
    const[latitude,  setLat] = useState("")
    const[longitude, steLong] = useState("");
    const[price, setPrice] = useState("");
    const[image, setImg] = useState(null)
    const[preview, setPre] = useState("")
    const[errormsg,setErrormsg] = useState({});

    useEffect(() => {
    if (editHotel) {
        setTitle(editHotel.title);
        setdescription(editHotel.description);
        setLat(editHotel.latitude);
        steLong(editHotel.longitude);
        setPrice(editHotel.price);
        setImg(null);

        if (editHotel.image) {
            setPre(`http://localhost:5000${editHotel.image}`);
        }else{
            setPre("");
        }

        setErrormsg({});
      }
      else{
        setTitle("");
        setdescription("");
        setLat("");
        steLong("");
        setPrice("");
        setImg(null);
        setPre("");
        setErrormsg({})
      }

    }, [editHotel]);

    function handleImage(e){
        const file = e.target.files[0];
        if(file){
            setImg(file);
            setPre(URL.createObjectURL(file));
        }
    }

    async function handlesubmit(e){
        e.preventDefault();
        const isValid = validation();
        if(!isValid){
            return;
    }
    const formData = new FormData();

    if(image){
        formData.append("image", image);
    }
  
    formData.append("title", title);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("price", price);

    try{
        if(editHotel){
            await axios.put(`http://localhost:5000/api/hotels/${editHotel.id}`, formData);
            alert("hotel updated sucessfully");

            if(onSaved){
                await onSaved();
            }
            if(clearEdit){
                clearEdit();
            }
        }
        else{
            await axios.post("http://localhost:5000/api/hotels", formData);
            alert("hotel add sucessfully");
            if(onSaved){
                onSaved();
            }
            if(clearEdit){
                clearEdit();
            }
        }
    }
    catch(error){
        console.log(error)
        alert("hotel not saved");
    }

}

//validation
    function validation(){
        const newErrors = {};
        if(!title.trim()){
            newErrors.title = "name required";
        }
        if(!description.trim()){
            newErrors.description = "Add description";
        }
        if(!image && !editHotel){
            newErrors.image = "choose image"
        }
        if(!latitude){
            newErrors.latitude = "latitude require"
        }
        else if (Number(latitude) < -90 || Number(latitude) > 90){
             newErrors.latitude="latitude -90 to 90";
        }
        if(!longitude){
            newErrors.longitude = "longitude require"
        }
        else if (Number(longitude) < -180 || Number(longitude) > 180){
             newErrors.longitude="longitude -180 to 180";
        }
        if(!price)
            newErrors.price= "price required"
        else if(Number(price) <=0){
            newErrors.price="price must greater then 0"
        }

        setErrormsg(newErrors);
        return Object.keys(newErrors).length ===0;
           
        } 

    return(
        <div>
            <form className="hotel-form" onSubmit={handlesubmit}>

                <label htmlFor="">Hotel image</label>
                <input type="file" accept="image/*" onChange={handleImage} /> <br />

                {errormsg.image && <p className="error">{errormsg.image}</p>}

                {preview &&(
                    <img src={preview} alt="hotel photo" className="hotel-photo" />
                )}
                
                <input type="text" placeholder="hotel name" 
                    value = {title} onChange={(e) =>setTitle(e.target.value)}/> <br />
                   {errormsg.title && <p className="error">{errormsg.title}</p>}

                <textarea placeholder="enter description" 
                    value = {description} onChange={(e) =>setdescription(e.target.value)}/> <br />
                    {errormsg.description && <p className="error">{errormsg.description}</p>}

                <input type="number"placeholder="latitude"
                   value = {latitude} onChange={(e) =>setLat(e.target.value)}/> <br />
                   {errormsg.latitude && <p className="error">{errormsg.latitude}</p>}

                <input type="number" placeholder="longitude" 
                    value = {longitude} onChange={(e) =>steLong(e.target.value)}/> <br />
                    {errormsg.longitude && <p className="error">{errormsg.longitude}</p>}

                <input type="number" placeholder="enter price"
                    value = {price} onChange={(e) =>setPrice(e.target.value)}/> <br /><br />
                    {errormsg.price && <p className="error">{errormsg.price}</p>}
                <div className="form-buttons">
                    <button type="submit" > {editHotel ? "update hotel" : "Add hotel"} </button>
                    <button type="button" className="cancel-button" onClick={clearEdit}>cancel</button>
                </div>
            </form>
            
        </div>

    );
}

export default Hotelfrom;