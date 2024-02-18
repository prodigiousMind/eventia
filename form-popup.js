const formpop = document.getElementById("myForm");
// Get the body element
const body = document.body;

// Define a function to open the pop up form
function openForm(eid, et, ed, est, eet) {
    // Show the pop up form
    formpop.style.display = "block";
    document.getElementById("titlepop").value = et;
    document.getElementById("descriptionpop").value = ed;
    document.getElementById("start_timepop").value = est;
    document.getElementById("end_timepop").value = eet;

    // Add a blur filter to the body element
    document.getElementById("container").style.filter = "blur(15px)";

    formpop.addEventListener('submit', (e) => {
        // Prevent the default behavior
        e.preventDefault();
        // Call the createEvent function
        et = document.getElementById("titlepop").value;
        ed = document.getElementById("descriptionpop").value;
        est = document.getElementById("start_timepop").value;
        eet = document.getElementById("end_timepop").value;
        if (!et || !est || !eet) {
            // Show an error message
            alert('Please enter the required fields');
            return;
        }

        var data_pop = {
            title: et,
            description: ed,
            start_time: est,
            end_time: eet
        };
        // Create the event in the API
        fetch(API_URL + '/' + eid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_pop)
            })
            .then(response => response.json())
            .then(data => {
                // Show a success message
                alert('Event updated successfully');
                // Clear the form fields
                const boxes = document.querySelectorAll('.events');

                boxes.forEach(box => {
                    box.remove();
                });

                getEvents();
                closeForm();
            })
            .catch(error => {
                // Show an error message
                alert(error.message);
            });

    });
}

// Define a function to close the pop up form
function closeForm() {
    // Hide the pop up form
    formpop.style.display = "none";
    // Remove the blur filter from the body element
    document.getElementById("container").style.filter = "none";
}