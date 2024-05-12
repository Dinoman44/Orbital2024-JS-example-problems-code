// https://reqres.in/


document.addEventListener("DOMContentLoaded", function() {
    let inputNum = document.getElementById("num");
    let inputTitle = document.getElementById("title");
    let form = document.getElementById("main-form");
    let submitStatus = document.getElementById("submit-status");
    let getter = document.getElementById("getter");
    let color = document.getElementById("color-status");
    let colorDisplay = document.getElementById("color-display");

    // when the PUT request form is submitted, send a fetch request to the Reqres API
    form.addEventListener("submit", function() {
        event.preventDefault();

        // this fetch request has a method of "PUT", and provides a body
        // the body must be a string, so we use the function JSON.stringify() to convert a JSON to string
        // additionally we need to give a content-type header; since we are sending a json
        // the content-type is application/json
        fetch(`https://reqres.in/api/articles/${inputNum.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title": inputTitle.value
            })
        })
        // if the response status code is 200, then the query was successful so we get the body
        // otherwise return the status code
        .then(response => response.status === 200 ? response.json() : response.status)
        .then(data => {
            // try {} catch {} blocks to catch errors
            try {
                submitStatus.innerText = `Submitted successfully and updated at ${getDateTime(data.updatedAt)}`;
            } catch (err) { // if the .updatedAt attribute doesn't exist, then the data was not an expected response
                // this means that we just display the response code instead
                submitStatus.innerText = `Submission failed. Response code ${data}`;
            }
        });
    });

    // when the get-color button is clicked, perform a different fetch request
    getter.addEventListener("click", function() {
        let num = inputNum.value;

        // if the input field is not blank, we send the fetch request
        if (num !== "") {
            // GET requests usually don't require any request data, so we pass in an empty JSON
            fetch(`https://reqres.in/api/articles/${num}`, {})
            // same response code checking and try catch for errors as before
            .then(response => response.status === 200 ? response.json() : response.status)
            .then(data => {
                try {
                    color.innerText = `Got colour "${data.data.name}" (Hex code: ${data.data.color})`;
                    colorDisplay.style.backgroundColor = data.data.color; // change the bg color of the display element to show the color
                } catch (err) {
                    color.innerText = `GET request failed. Response code ${data}`;
                    colorDisplay.style.backgroundColor = ""; // change the bg color of the display element back to original
                }
            })
        }
    })
})

// function to convert the datetime ISO string to a more readable format
function getDateTime(datetimeISO) {
    // datetime is in the format YYYY-MM-DDTHH:MM:SSZ
    let dateTimeSplit = datetimeISO.split("T");
    let date = dateTimeSplit[0].split("-");
    date = numToMonth(date[1]) + " " + date[2] + " " + date[0];
    let time = dateTimeSplit[1].slice(0, 8);
    return date + ", " + time + " UTC";
    // bonus: try to convert it to local timezome using browser timezone instead of UTC
}

var months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var numToMonth = num => months[parseInt(num)]; // lambda function to get the month from the number