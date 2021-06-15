import express from 'express'
import Cities from '../models/cities.js'
import Theaters from '../models/theater.js'

const router = express.Router()

router.get('/cities',async (req, res) => {
    try {
        const data = await Cities.find()
        res.json(data)
    } catch (error) {
        res.staatus(500).json({message: error.message})        
    }
})

router.post('/cities', async (req, res) => {
    try {
        const city = new Cities({
            cityName: req.body.cityName
        })
        const newCities = await city.save()
        res.status(201).json(newCities)
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