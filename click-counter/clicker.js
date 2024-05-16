// when the page loads, add an event listener to the button
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("increment").addEventListener(
        "click", // when the button is clicked,
        incrementCounter // the updateCounter() function will be called
    )
    document.getElementById("decrement").addEventListener(
        "click", // when the button is clicked,
        decrementCounter // the updateCounter() function will be called
    )
    document.getElementById("reset").addEventListener(
        "click", // when the button is clicked,
        resetCounter // the updateCounter() function will be called
    )
})

// this function will increment the counter each time
function incrementCounter() {
    let counterElement = document.getElementById("counter"); // look for the element with the ID "counter"
    let count = parseInt(counterElement.innerText); // parseInt() converts string to int
    count++; // increment the count
    counterElement.innerText = count; // set the innerText of the counter element to the new updated count

    // Bonus part code:
    if (count % 10 === 0) { // checks if count is a multiple of 10
        counterElement.style.color = "gold"; // set the color to "gold"
    } else {
        counterElement.style.color = ""; // otherwise reset it to original color
    }
}

// this function will decrement the counter each time
function decrementCounter() {
    let counterElement = document.getElementById("counter"); // look for the element with the ID "counter"
    let count = parseInt(counterElement.innerText); // parseInt() converts string to int
    count = count === 0 ? 0 : count - 1; // decrement the count
    counterElement.innerText = count; // set the innerText of the counter element to the new updated count

    // Bonus part code:
    if (count % 10 === 0 && count > 0) { // checks if count is a multiple of 10
        counterElement.style.color = "gold"; // set the color to "gold"
    } else {
        counterElement.style.color = ""; // otherwise reset it to original color
    }
}

// this function will reset the counter each time
function resetCounter() {
    let counterElement = document.getElementById("counter");
    counterElement.innerText = 0;
    counterElement.style.color = "";
}