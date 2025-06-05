from flask import Flask, request, render_template, jsonify
from geopy.distance import geodesic

app = Flask(__name__)

# Define the authorized location (e.g., office or classroom)
# AUTHORIZED_LOCATION = (29.9240257, 75.5572667)  # Budhlada coordinates
AUTHORIZED_LOCATION = (30.733351, 76.779037)  # UIET coordinates
AUTHORIZED_RADIUS = 50  # in meters

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/verify_location', methods=['POST'])
def verify_location():
    data = request.get_json()
    user_location = (data['latitude'], data['longitude'])
    distance = geodesic(AUTHORIZED_LOCATION, user_location).meters

    if distance <= AUTHORIZED_RADIUS:
        status = 'success'
        message = 'You are within the authorized zone. Attendance marked.'
    else:
        status = 'failure'
        message = 'You are outside the authorized zone. Attendance not marked.'

    return jsonify({'status': status, 'message': message})

if __name__ == '__main__':
    app.run(debug=True)
