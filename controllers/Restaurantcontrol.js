const Restaurant = require("../models/Restaurant");

const addRestaurant = ((req, res) => {

    const { name,
        address,
        menu } = req.body;


    const restaurant = {
        name,
        address,
        menu
    };


    res.status(201).json({ message: 'Restaurant added successfully', restaurant });
});


const getallRestaurant = async (req, res) => {
    try {
        const restaurants = await ((req, res) => {
            return res.status(200).json({ restaurants })

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": error })
    }


}

module.exports = {
    getallRestaurant,
    addRestaurant
}