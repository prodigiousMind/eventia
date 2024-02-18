// Add some JavaScript code to interact with the API and the DOM
// Define the API URL
const API_URL = 'http://localhost:5000/events';
// Get the form elements
const form = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const start_time = document.getElementById('start_time');
const end_time = document.getElementById('end_time');
const create = document.getElementById('create');
// Get the events container
const events = document.getElementById('events');
function formatDate(dateString) {
    // Create a new Date object from the date string
    let date = new Date(dateString);
    // Get the day of the week as a number (0-6)
    let day = date.getDay();
    // Get the day of the month as a number (1-31)
    let dateNum = date.getDate();
    // Get the month as a number (0-11)
    let month = date.getMonth();
    // Get the year as a number
    let year = date.getFullYear();
    // Create an array of weekday names
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // Create an array of month names
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // Return the formatted date string
    return `${weekdays[day]}, ${dateNum} ${months[month]} ${year} at ${dateString.split("T")[1]}`;
}
// Define a function to fetch and display the events
function getEvents(search) {
    // Clear the events container
    events.innerHTML = '';

    if (search==1){
        const boxes = document.querySelectorAll('.events');
            boxes.forEach(box => {
            box.remove();
        });
    }
    // Fetch the events from the API
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Create a reference to the table element by its id
            const table = document.getElementById('eventsTab');
            // Loop through the data array
            data.forEach(event => {
                // Create a div element for each event
                const div = document.createElement('div');
                div.className = 'event';
                // Create an h3 element for the title
                const h3 = document.createElement('h3');
                h3.innerHTML = event.title;
                // Create a p element for the description
                const p1 = document.createElement('p');
                p1.textContent = event.description;
                // Create a p element for the start time
                const p2 = document.createElement('p');
                p2.innerHTML = '<span style="font-weight: bold;">Starts: </span>' + formatDate(event.start_time);
                // Create a p element for the end time
                const p3 = document.createElement('p');
                p3.innerHTML = '<span style="font-weight: bold;">Ends: </span>' + formatDate(event.end_time);
                // Create a button element to delete the event
                const button = document.createElement('button');
                button.textContent = 'X';
                // Add an event listener to the button
                button.addEventListener('click', () => {
                    // Confirm the deletion
                    if (confirm('Are you sure you want to delete this event?')) {
                        // Delete the event from the API
                        fetch(API_URL + '/' + event.id, {
                                method: 'DELETE'
                            })
                            .then(response => response.json())
                            .then(data => {
                                // Show a success message
                                alert(data.message);
                                // Refresh the events
                                const boxes = document.querySelectorAll('.events');
                                boxes.forEach(box => {
                                    box.remove();
                                });
                                getEvents();
                            })
                            .catch(error => {
                                // Show an error message
                                alert(error.message);
                            });
                    }
                });
                // Append the elements to the div
                div.appendChild(h3);
                div.appendChild(p1);
                div.appendChild(p2);
                div.appendChild(p3);
                div.appendChild(button);
                // Append the div to the events container
                events.appendChild(div);
                var keyword = "no-tag";
                var restricted = "restrict=0";
                if (search == 1) {

                    keyword = document.getElementById("search").value;
                    
                    if ((event.title.toLowerCase()).includes(keyword.toLowerCase()) || (event.description.toLowerCase()).includes(keyword.toLowerCase())) {
                        const tr = document.createElement('tr');
                        tr.className = "eid" + event.id + " events";
                        // Create table cell elements for the id, description, start time, and end time of each event
                        const td0 = document.createElement('td');
                        td0.textContent = event.title;
                        const td1 = document.createElement('td');
                        td1.textContent = event.id;
                        const td2 = document.createElement('td');
                        td2.textContent = event.description;
                        const td3 = document.createElement('td');
                        td3.textContent = formatDate(event.start_time);
                        const td4 = document.createElement('td');
                        td4.textContent = formatDate(event.end_time);
                        // Create a button element to delete the event
                        const td5 = document.createElement('button');
                        td5.textContent = '🗑️';
                        const td6 = document.createElement('button');
                        td6.textContent = '🖋️';
                        // Add an event listener to the button
                        td5.addEventListener('click', () => {
                            // Confirm the deletion
                            if (confirm('Are you sure you want to delete this event?')) {
                                // Delete the event from the API
                                fetch(API_URL + '/' + event.id, {
                                        method: 'DELETE'
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        // Show a success message
                                        alert(data.message);
                                        // Refresh the events
                                        const boxes = document.querySelectorAll('.events');
                                        boxes.forEach(box => {
                                            box.remove();
                                        });
                                        getEvents();
                                    })
                                    .catch(error => {
                                        // Show an error message
                                        alert(error.message);
                                    });
                            }
                        });
                        td6.addEventListener('click', () => {
                            // Confirm the deletion
                            if (confirm('Are you sure you want to edit this event?')) {
                                // Delete the event from the API
                                openForm(event.id, event.title, event.description, event.start_time, event.end_time);
                            }
                        });
                        // Append the table cell elements to the table row element
                        tr.appendChild(td1);
                        tr.appendChild(td0);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        // Append the table row element to the table element
                        table.appendChild(tr);
                    }
                } else {
                    // Create a table row element for each event
                    const tr = document.createElement('tr');
                    tr.className = "eid" + event.id + " events";
                    // Create table cell elements for the id, description, start time, and end time of each event
                    const td0 = document.createElement('td');
                    td0.textContent = event.title;
                    const td1 = document.createElement('td');
                    td1.textContent = event.id;
                    const td2 = document.createElement('td');
                    td2.textContent = event.description;
                    const td3 = document.createElement('td');
                    td3.textContent = formatDate(event.start_time);
                    const td4 = document.createElement('td');
                    td4.textContent = formatDate(event.end_time);
                    // Create a button element to delete the event
                    const td5 = document.createElement('button');
                    td5.textContent = '🗑️';
                    const td6 = document.createElement('button');
                    td6.textContent = '🖋️';
                    // Add an event listener to the button
                    td5.addEventListener('click', () => {
                        // Confirm the deletion
                        if (confirm('Are you sure you want to delete this event?')) {
                            // Delete the event from the API
                            fetch(API_URL + '/' + event.id, {
                                    method: 'DELETE'
                                })
                                .then(response => response.json())
                                .then(data => {
                                    // Show a success message
                                    alert(data.message);
                                    // Refresh the events
                                    const boxes = document.querySelectorAll('.events');
                                    boxes.forEach(box => {
                                        box.remove();
                                    });
                                    getEvents();
                                })
                                .catch(error => {
                                    // Show an error message
                                    alert(error.message);
                                });
                        }
                    });
                    td6.addEventListener('click', () => {
                        // Confirm the deletion
                        if (confirm('Are you sure you want to edit this event?')) {
                            // Delete the event from the API
                            openForm(event.id, event.title, event.description, event.start_time, event.end_time);
                        }
                    });
                    // Append the table cell elements to the table row element
                    tr.appendChild(td1);
                    tr.appendChild(td0);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    // Append the table row element to the table element
                    table.appendChild(tr);
                }
            });
        })
        .catch(error => {
            // Show an error message
            alert(error.message);
        });
}


// Define a function to create a new event
function createEvent() {
    // Get the form data
    const data = {
        title: title.value,
        description: description.value,
        start_time: start_time.value,
        end_time: end_time.value
    };
    // Validate the data
    if (!data.title || !data.start_time || !data.end_time) {
        // Show an error message
        alert('Please enter the required fields');
        return;
    }
    // Create the event in the API
    fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Show a success message
            alert('Event created successfully');
            // Clear the form fields
            title.value = '';
            description.value = '';
            start_time.value = '';
            end_time.value = '';
            const boxes = document.querySelectorAll('.events');
            boxes.forEach(box => {
                box.remove();
            });
            // Refresh the events
            getEvents();
        })
        .catch(error => {
            // Show an error message
            alert(error.message);
        });
}
// Add an event listener to the form submit
form.addEventListener('submit', (e) => {
    // Prevent the default behavior
    e.preventDefault();
    // Call the createEvent function
    createEvent();
});
// Call the getEvents function when the page loads
getEvents();