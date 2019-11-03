// ------------------------- Modules ------------------------- //

const db = require('../models');
const response = require('../routes/response');

// ----------------------- Controllers ----------------------- //

// Find Restaurants and Populate Referenced Reviews
const indexRestaurants = (req, res) => {
    db.Restaurant.find({}, (err, foundRestaurants) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: 'Successfully fetched restaurants.',
            data: foundRestaurants
        });
    })
    .populate('reviews');
};

const indexRestaurantsByParams = (req, res) => {
    console.log(req.query)
    db.Restaurant.find({
        $or: [{ name: req.query.name }, { city: req.query.city }]},
        (err, foundRestaurants) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            res.status(200).json({
                status: 200,
                message: 'Successfully fetched restaurants.',
                data: foundRestaurants
            });
        })
        .populate('reviews');
};


const show = (req, res) => {
    db.Restaurant.findOne({ slug: req.params.slug }, (err, foundRestaurant) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: "Restaurant successfully found",
            data: foundRestaurant
        });
    })
    .populate('reviews')
}

const showMap = (req, res) => {
    let geocoder;
    let map;
    function initMap() {
        geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(37.788970, -122.406880);
        let mapOptions = {
            zoom: 17,
            center: latlng,
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        codeAddress(geocoder, map);
    };

    // Address to Lat/Lng Converter
    function codeAddress(geocoder, resultsMap) {
        let address = document.getElementById('address').innerText
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                let marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    icon: {
                    url: "../images/dumpling_icon.png",
                    scaledSize: new google.maps.Size(70, 70)
                    }
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            };
        });
    };
    res.status(200).json({
        status: 200,
        message: 'Map successfully rendered',
        data: map
    });
};

module.exports = {
    indexRestaurants,
    indexRestaurantsByParams,
    show,
    showMap
};