var map3 = L.map('map3').setView([43.8, -120.55], 7);

var MB_satelliteContours3 = L.tileLayer('https://api.mapbox.com/styles/v1/everythingismossome/cltq77934013u01r5bg5b9lf1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXZlcnl0aGluZ2lzbW9zc29tZSIsImEiOiJjbHNqOXZjd3oycHRrMmt0MHE1MWFjc3d2In0.BFb9k5gMVQGbDhX-3aEXzA', 
{}).addTo(map3);


// Add Leaflet's built-in geocoding control with Nominatim service
L.Control.geocoder({
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map3);




// Initialise the FeatureGroup to store editable layers
var editableLayers3 = new L.FeatureGroup();
map.addLayer(editableLayers3);

var drawPluginOptions3 = {
    position: 'topright',
    draw: {
        polygon: {
            allowIntersection: false,
            drawError: {
                color: '#e1e100',
                message: '<strong>Oh snap!<strong> you can\'t draw that!'
            },
            shapeOptions: {
                color: '#97009c'
            }
        },
        polyline: false,
        circle: false,
        rectangle: false,
        marker: false,
    },
    edit: {
        featureGroup: editableLayers3,
        remove: false
    }
};

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl3 = new L.Control.Draw(drawPluginOptions3);
map3.addControl(drawControl3);

// Event listener for when a draw is created
map3.on('draw:created', function(e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }

    editableLayers3.addLayer(layer);
});

/*

// Update the fillStyle function to use the getColor function
function fillStyle(feature) {
    return {
        fillColor: getColor(feature.properties["Level 4"]),
        weight: 0.5,
        fillOpacity: 0.3,
        // Set default border color and fill color separately
        color: 'transparent', // Default border color
        borderColor: 'black', // Default border color
        borderOpacity: 1 // Add a new property for border opacity
    };
}



//___add geojson from data folder to map
fetch('data/or_ecoreg_L4_w_link_new7.geojson') 
.then(response => response.json())
.then(geojsonData => {
    var geojson = L.geoJSON(geojsonData, {
        style: fillStyle,
        onEachFeature: onEachFeature
    }).addTo(map);
})
.catch(error => console.error('Error: ', error));


// Event handling functions
// highlight on hover
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#34bdeb',
        dashArray: '',
        fillOpacity: 0.1
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle(fillStyle(e.target.feature));
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

/*function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
*/
/*
function onEachFeature(feature, layer) {
    // Bind popup to each layer
    layer.bindPopup(createPopupContent(feature.properties));

    // Event listeners for highlighting and zooming
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

// Function to create popup content
function createPopupContent(properties) {
    // Create HTML string for popup content
    var popupContent = "<div>";

    // Loop through properties and add them to popup content
    for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
            // Check if the property is the "link" field or "Level 3" field
            if (key === 'link' || key === 'Level 3') {
                // If it is, format it as a clickable link
                popupContent += "<strong>" + key + ":</strong> <a href='" + properties[key] + "' target='_blank'>" + properties[key] + "</a><br>";
            } else {
                // Otherwise, display the property value as usual
                popupContent += "<strong>" + key + ":</strong> " + properties[key] + "<br>";
            }
        }
    }

    popupContent += "</div>";

    return popupContent;
}


// Event listener for popup links
document.addEventListener('click', function(event) {
    // Check if the clicked element is a popup link
    if (event.target.classList.contains('popup-link')) {
        event.preventDefault(); // Prevent default link behavior
        
        var targetUrl = event.target.getAttribute('data-target');
        // Here you can fetch the content of the target URL and update the right column with it
        fetch(targetUrl)
            .then(response => response.text())
            .then(content => {
                document.getElementById('column right').innerHTML = content;
            })
            .catch(error => console.error('Error fetching content:', error));
    }
});




//______
//attempt to make chloropleth 

    function getColor(US_L4NAME) {
        switch (US_L4NAME) {
            case 'Barren Playas':
                return '#bd008e';
            case 'Blue Mountain Basins':
                return '#c30486';
            case 'Border High-Siskiyous':
                return '#c9087e';
            case 'Canyons and Dissected Highlands':
                return '#d00c77';
            case 'Canyons and Dissected Uplands':
                return '#d6106f';
            case 'Cascade Crest Montane Forest':
                return '#dc1367';
            case 'Cascade Subalpine/Alpine':
                return '#e2175f';
            case 'Coastal Lowlands':
                    return '#e81b58';
            case 'Coastal Siskiyous':
                    return '#ee1f50';
            case 'Coastal Uplands':
                return '#f12848';
            case 'Cold Basins':
                return '#f13341';
            case 'Continental Zone Foothills':
                    return '#f23d3a';
            case 'Continental Zone Highlands':
                    return '#f34832';
            case 'Deep Loess Foothills':
                return '#f3532b';
            case 'Deschutes River Valley':
                return '#f45e24';
            case 'Deschutes/John Day Canyons':
                    return '#f5681c';
            case 'Dissected High Lava Plateau':
                    return '#f67315';
            case 'Fremont Pine/Fir Forest':
                return '#f67c12';
            case 'Grand Fir Mixed Forest':
                return '#f78414';
            case 'High Desert Wetlands':
                    return '#f88b15';
            case 'High Lava Plains':
                    return '#f99317';
            case 'High Southern Cascades Montane Forest':
                    return '#fa9a18';
            case 'Inland Siskiyous':
                return '#fba21a';
            case 'John Day/Clarno Highlands':
                return '#fcaa1b';
            case 'John Day/Clarno Uplands':
                    return '#fdb11d';
            case 'Klamath Juniper Woodland/Devils Garden':
                    return '#feb920';
            case 'Klamath River Ridges':
                    return '#fcc026';
            case 'Klamath/Goose Lake Basins':
                return '#fac72d';
            case 'Low Southern Cascades Mixed Conifer Forest':
                return '#f9ce34';
            case 'Maritime-Influenced Zone':
                    return '#f7d53a';
            case 'Melange':
                    return '#f6dc41';
            case 'Mesic Forest Zone':
                    return '#f4e348';
            case 'Mid-Coastal Sedimentary':
                return '#f3ea4e';
            case 'Northern Franciscan Redwood Forest':
                return '#f1f155';
            case 'Oak Savanna Foothills':
                    return '#def262';
            case 'Oak/Conifer Foothills':
                    return '#caf26f';
            case 'Old Cascades':
                    return '#b7f37c';
            case 'Owyhee Uplands and Canyons':
                return '#a4f389';
            case 'Partly Forested Mountains':
                return '#91f495';
            case 'Pleistocene Lake Basins':
                    return '#7df5a2';
            case 'Pluvial Lake Basins':
                    return '#6af5af';
            case 'Ponderosa Pine/Bitterbrush Woodland':
                    return '#57f6bc';
            case 'Portland/Vancouver Basin':
                return '#4bf3c4';
            case 'Prairie Terraces':
                return '#41efcb';
            case 'Pumice Plateau':
                    return '#37ebd2';
            case 'Pumice Plateau Basins':
                    return '#2de7d8';
            case 'Rogue/Illinois/Scott Valleys':
                    return '#23e3df';
            case 'Salt Shrub Valleys':
                return '#19dfe5';
            case 'Semiarid Uplands':
                return '#0fdbec';
            case 'Serpentine Siskiyous':
                    return '#05d7f3';
            case 'Southern Cascades Slope':
                    return '#02cdf6';
            case 'Southern Oregon Coastal Mountains':
                    return '#06bef5';
            case 'Subalpine-Alpine Zone':
                return '#0aaef4';
            case 'Treasure Valley':
                return '#0e9ef3';
            case 'Umatilla Dissected Uplands':
                    return '#118ff3';
            case 'Umatilla Plateau':
                    return '#157ff2';
            case 'Umpqua Interior Foothills':
                    return '#196ff1';
            case 'Unwooded Alkaline Foothills':
                return '#1d60f1';
            case 'Valley Foothills':
                return '#2655f0';
            case 'Volcanics':
                    return '#3d57f2';
            case 'Wallowas/Seven Devils Mountains':
                    return '#545af4';
            case 'Warner Mountains':
                    return '#6b5cf6';
            case 'Western Cascades Lowlands and Valleys':
                return '#825ff8';
            case 'Western Cascades Montane Highlands':
                return '#9961fa';
            case 'Willamette River and Tributaries Gallery Forest':
                    return '#b064fb';
            case 'Willapa Hills':
                    return '#c766fd';
            case 'Yakima Folds':
                    return '#de69ff';

        
// Add more cases for other property values and corresponding colors as needed
           
        }
    }

*/