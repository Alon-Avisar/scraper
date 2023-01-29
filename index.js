const express = require('express')
const request = require('request-promise')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000
const API_KEY = process.env.API_KEY

const generateScaperUrl = (API_KEY) => `http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`
app.use(express.json())

app.get('/', (req, res) => {
   res.send('Welcome to amazon scraper API.')
})

//GET product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const response = await request(`${generateScaperUrl(API_KEY)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

// GET product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params
    try {
        const response = await request(`${generateScaperUrl(API_KEY)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params
    try {
        const response = await request(`${generateScaperUrl(API_KEY)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

// GET Search result
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params
    try {
        const response = await request(`${generateScaperUrl(API_KEY)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
