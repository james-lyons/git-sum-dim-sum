const REVIEW_URL = '/api/v1/reviews';

const toggleHidden = (changeClass) => {
  let elements = document.querySelectorAll(changeClass);
  elements.forEach(function(element){
    element.classList.toggle('hidden');
  })
};

const toggleHiddenOne = (event) => {
  let element = event.target.parentElement.children[4];
  element.classList.toggle('hidden');
};

const addReview = (event) => {
  event.preventDefault();
  const restaurant = event.target.id;
  const reviewText = document.getElementById('reviewText');
  const newReview = ({restaurant, reviewText: reviewText.value});
  fetch(REVIEW_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview)
  })
    .then((res) => res.json())
    .then( setTimeout(()=>{ window.location.reload()}), 1000)
    .catch((err) => console.log(err));
    toggleHidden('.add-review');  
}

// Delete Functionality
const deleteReview = (event) => {
  event.preventDefault();
  const review = (event.target.parentNode.id);
  console.log(review)
  fetch(`${REVIEW_URL}/${review}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({_id: review})
  })
    .then((res) => res.json())
    .then(document.location.reload())
    .catch((err) => console.log(err));
};
  
// Edit Functionality
const editReview = (event) => {
  event.preventDefault();
  let review = (event.target.id);
  const reviewText = event.target.nextElementSibling.value;
  const updatedReview = ({ reviewText });
  console.log(updatedReview)
  fetch(`${REVIEW_URL}/${review}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedReview)
  })
    .then((res) => res.json())
    .then(document.location.reload())
    .catch((err) => console.log(err));
  };


// Create Map on Restaurant Page
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