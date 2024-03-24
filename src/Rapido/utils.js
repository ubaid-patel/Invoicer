const fetchAddress = async (coordinates) => {
    try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=pk.eyJ1IjoidWJhaWRwYXRlbDU5NSIsImEiOiJjbHU1ZGFxczYwdmZpMmpuNHljZHlibnB6In0.zMVbPdsglTT36MyuHzTfHQ`);
        const data = await response.json();
        // Extract address from response
        const firstFeature = data.features[0];
        if (firstFeature) {
            return (firstFeature.place_name);
        } else {
            return ('Address not found');
        }
    } catch (error) {
        console.error('Error fetching address:', error);
        return ('Error fetching address');
    }
};

const convertLatLong = (data) => {
    let pick = data.get("pickLatLong");
    let drop = data.get("dropLatLong");
    let latNlong = []
    if (pick !== "" && drop !== "") {
        latNlong.push(pick.split(",").map((string) => parseFloat(string)));
        latNlong.push(drop.split(",").map((string) => parseFloat(string)));
        return (latNlong[0] !== null && latNlong[0].length > 1 && latNlong[1] !== null && latNlong[1].length > 1) ? latNlong : []
    } else {
        return (latNlong)
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomAlphabets() {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex1 = Math.floor(Math.random() * alphabets.length);
    const randomIndex2 = Math.floor(Math.random() * alphabets.length);

    const randomAlphabet1 = alphabets[randomIndex1];
    const randomAlphabet2 = alphabets[randomIndex2];
    return randomAlphabet1 + randomAlphabet2;
}

function calculatefare(distance) {
    let cost = 0;
    for (let index = 0; index < distance; index++) {
        if (index <= 5) {
            cost += 7.5;
        } else if (index > 5 && index <= 10) {
            cost += 9.5;
        } else {
            cost += 11.5;
        }
    }
    return cost;
}

function fetchLocation(id) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
                // Do something with latitude and longitude
                document.getElementById(id).value = latitude + "," + longitude
            },
            error => {
                console.error("Error getting user location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function getAddresses(data){
    let addresses = []
    return(new Promise((resolve,reject)=>{
        fetchAddress(data.latNlong[0].reverse()).then((addr0)=>{
            addresses.push(addr0)
            fetchAddress(data.latNlong[1].reverse()).then((addr1)=>{
                addresses.push(addr1)
                resolve(addresses)
            })
        });
    }))
}

export { fetchAddress, convertLatLong,getRandomNumber,getRandomAlphabets,fetchLocation,calculatefare,getAddresses }