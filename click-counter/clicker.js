// when the page loads, add an event listener to the button
document.addEventListener("DOMContentLoaded", function() {
    // console.log("DOMContentLoaded"); // debugging
    document.getElementById("clicker").addEventListener(
        "click", // when the button is clicked,
        updateCounter // the updateCounter() function will be called
    )
})

// this function will update the counter each time
function updateCounter() {
    // console.log("clicked"); // debugging
    let counterElement = document.getElementById("counter"); // look for the element with the ID "counter"
    let count = parseInt(counterElement.innerText); // parseInt() converts string to int
    count++; // increment the count
    counterElement.innerText = count; // set the innerTest of the counter element to the new updated count

    // Bonus part code:
    if (count % 10 === 0) { // checks if count is a multiple of 10
        counterElement.style.color = "gold"; // set the color to "gold"
    } else {
        counterElement.style.color = ""; // otherwise reset it to original color
    }
}