import React, {useState, useEffect} from 'react'
import {Map, TileLayer, Popup, Marker} from "react-leaflet"
import { BsHouseDoorFill } from "react-icons/bs";
import image from "./assets/house.png"
import L from 'leaflet'
import "./eventMap.css"
const myIcon = new L.Icon({
    iconUrl: require("./assets/house.png"),
    iconRetinaUrl: require("./assets/house.png"),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(50, 50),
    className: 'leaflet-div-icon'    
});
function App() {
    const [coords, setCoords] = useState([])
    const [displayCoords, setDisplayCoords] = useState(false)
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const getCoords = () => {
        let url = "http://localhost:3500/get"
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => {setCoords(data); setDisplayCoords(true);})
        .catch(err => console.log(err))
        
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let url = "http://localhost:3500/"
        let body = {
            street: street,
            city: city,
            state: state,
            zip: zip
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        getCoords()
    }
    const handleView = () => {
        if(displayCoords){
            return[
        <><link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
        <Map center={[ 39.8355, -98.556061]} zoom={4} className='leaflet-container'>
            <TileLayer

            attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                displayCoords ? coords.findAll.map((address, key) => {
                    return(
                        <Marker key={key} position={address.coords} icon={myIcon} style={{backgroundColor: 'red'}}>
                        </Marker>
                    )
                }) : console.log(coords)
            }
        </Map></>]
        } else {
            getCoords()
        }
    }
    return (
        <div>
                {handleView()}
                <form action="submit">
                    <input type="text" 
                    value={street} 
                    onChange={e => setStreet(e.target.value)}
                    className="street"
                    placeholder="Street Address"
                    required
                    />
                    <input type="text" 
                    value={city} 
                    onChange={e => setCity(e.target.value)}
                    className="city"
                    placeholder="City"
                    required
                    />
                    <input type="text" 
                    value={state} 
                    onChange={e => setState(e.target.value)}
                    className="state"
                    placeholder="Full State"
                    required
                    />
                    <input type="text" 
                    value={zip} 
                    onChange={e => setZip(e.target.value)}
                    className="zip"
                    placeholder="Zipcode"
                    required
                    />
                    <button className='submit' onClick={handleSubmit}>Submit Address</button>
                </form>
        </div>
    )
}

export default App

