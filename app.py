# Import the required modules
from flask import Flask, request, jsonify
from datetime import datetime
import json
from flask_cors import cross_origin

# Create the Flask app
app = Flask(__name__)

# Define the JSON file path
JSON_FILE = 'events.json'

# Define a function to read the JSON file
def read_json():
    # Open the file
    with open(JSON_FILE, 'r') as f:
        # Load the data
        data = json.load(f)
    # Return the data
    return data

# Define a function to write the JSON file
def write_json(data):
    # Open the file
    with open(JSON_FILE, 'w') as f:
        # Dump the data
        json.dump(data, f, indent=4)

# Create some sample data and write to the JSON file
data = [
    {
        'id': 1,
        'title': 'Meeting',
        'description': 'Discuss project status',
        'start_time': datetime(2024, 2, 20, 10, 0).isoformat(),
        'end_time': datetime(2024, 2, 20, 11, 0).isoformat()
    },
    {
        'id': 2,
        'title': 'Lunch',
        'description': 'Enjoy some food',
        'start_time': datetime(2024, 2, 20, 12, 0).isoformat(),
        'end_time': datetime(2024, 2, 20, 13, 0).isoformat()
    }
]
write_json(data)

# Define the API endpoints
@app.route('/events', methods=['GET'])
@cross_origin() #for CORS
def get_events():
    # Get the data from the JSON file
    data = read_json()
    # Sort the data by start time
    if data:
        data.sort(key=lambda x: x['start_time'])
    # Return the data as a JSON list
        return jsonify(data)
    else: return jsonify("{'Object': None}")

@app.route('/events', methods=['POST'])
@cross_origin() #for CORS
def create_event():
    # Get the event data from the request
    data = request.get_json()
    # Validate the required fields
    if not data or not data.get('title') or not data.get('start_time') or not data.get('end_time'):
        return jsonify({'error': 'Missing or invalid data'}), 400
    # Get the data from the JSON file
    events = read_json()
    # Generate a new id for the event
    if events:
        data['id'] = max(event['id'] for event in events) + 1
    else: data['id'] = 1
    # Append the event to the data
    events.append(data)
    # Write the data to the JSON file
    write_json(events)
    # Return the created event as JSON
    return jsonify(data), 201

@app.route('/events/<int:id>', methods=['GET'])
@cross_origin() #for CORS
def get_event(id):
    # Get the data from the JSON file
    events = read_json()
    # Find the event by id
    event = next((event for event in events if event['id'] == id), None)
    # Check if the event exists
    if event is None:
        # Return a not found error
        return jsonify({'error': 'Event not found'}), 404
    # Return the event as JSON
    return jsonify(event)

@app.route('/events/<int:id>', methods=['PUT'])
@cross_origin() #for CORS
def update_event(id):
    # Get the updated data from the request
    data = request.get_json()
    # Validate the required fields
    if not data or not data.get('title') or not data.get('start_time') or not data.get('end_time'):
        return jsonify({'error': 'Missing or invalid data'}), 400
    # Get the data from the JSON file
    events = read_json()
    # Find the event by id
    event = next((event for event in events if event['id'] == id), None)
    # Check if the event exists
    if event is None:
        # Return a not found error
        return jsonify({'error': 'Event not found'}), 404
    # Update the event attributes
    event['title'] = data['title']
    event['description'] = data.get('description')
    event['start_time'] = data['start_time']
    event['end_time'] = data['end_time']
    # Write the data to the JSON file
    write_json(events)
    # Return the updated event as JSON
    return jsonify(event)

@app.route('/events/<int:id>', methods=['DELETE'])
@cross_origin() #for CORS
def delete_event(id):
    # Get the data from the JSON file
    events = read_json()
    # Find the event by id
    event = next((event for event in events if event['id'] == id), None)
    # Check if the event exists
    if event is None:
        # Return a not found error
        return jsonify({'error': 'Event not found'}), 404
    # Delete the event from the data
    events.remove(event)
    # Write the data to the JSON file
    write_json(events)
    # Return a success message
    return jsonify({'message': 'Event deleted'}), 200

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
