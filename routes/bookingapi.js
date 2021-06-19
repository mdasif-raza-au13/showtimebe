import express from 'express'
import Cities from '../models/Cities.js'
import Theaters from '../models/Theaters.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.get('/cities',async (req, res) => {
    try {
        const data = await Cities.find()
        res.json(data)
    } catch (error) {
        res.staatus(500).json({message: error.message})        
    }
})

router.post('/cities', [body('cityName','cannot be empty').notEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });}
    try {
        const data = await Cities.findOne({cityName: req.body.cityName})
        console.log("citydata",data)
        if(data) return res.send({message: "city already present"})
        else{
        const city = new Cities({
            cityName: req.body.cityName
        })
        const newCities = await city.save()
        res.status(201).json(newCities)}
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/theaters',async (req, res) => {
    try {
        const data = await Theaters.find()
        res.json(data)
    } catch (error) {
        res.staatus(500).json({message: error.message})        
    }
})

router.post('/theaters', async (req, res) => {
    try {
        const theater = new Theaters({
            theaterName: req.body.theaterName
        })
        const newTheater = await theater.save()
        res.status(201).json(newTheater)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


export default router