function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation, showError);
    } else {
        document.getElementById("status").innerText = "Geolocation is not supported by this browser.";
    }
}

function sendLocation(position) {
    fetch('/verify_location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("status").innerText = data.message;
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("status").innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("status").innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("status").innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("status").innerText = "An unknown error occurred.";
            break;
    }
}
