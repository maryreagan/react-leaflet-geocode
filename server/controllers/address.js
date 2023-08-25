const router = require("express").Router()
const Address = require("../models/Address")
const fetch = require("node-fetch")
const API_KEY = process.env.API_KEY

router.post("/", async (req, res) => {
    let {street, city, state, zip} = req.body
    const fetchResponse = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&street=${street}&city=${city}&state=${state}&postalCode=${zip}`)
    const data = await fetchResponse.json()
    try{
        const newAddress = new Address({
            street,
            city,
            state,
            zip,
            coords : [data.results[0].locations[0].displayLatLng.lat, data.results[0].locations[0].displayLatLng.lng]
        })
        await newAddress.save()
        res.status(201).json({
            message: `New Address saved`,
            newAddress
        })
    } catch(err){
        res.status(500).json({
            message: `Error ${err}`
        })
    }
})
router.get("/get", async (req, res) => {
    try{
        const findAll = await Address.find({})
        res.status(200).json({
            message: `Addresses found`,
            findAll
        })
    } catch(err){
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router