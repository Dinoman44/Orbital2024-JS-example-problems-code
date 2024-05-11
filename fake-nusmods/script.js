document.addEventListener("DOMContentLoaded", function() {
    let courseCodeInput = document.getElementById("course-code");
    let courseDetailsContainer = document.getElementById("course-container");
    let errorMsg = document.getElementById("error");

    document.getElementById("nusmods-form").addEventListener(
        "submit", // when the form is submitted,
        () => { // prevent its submission and perform a fetch request instead
            event.preventDefault(); // prevent the form from submitting to the default path "/" using this line
            // note: event is deprecated, but still works
            // try instead to look at form validation functions
            // or try using this: arguments[0].preventDefault();
            loadCourseData(courseCodeInput, courseDetailsContainer, errorMsg);
        }
    )
})

// this function will perform the fetch request
function loadCourseData(inputField, container, error) {
    let courseCode = inputField.value.toUpperCase(); // get the user's input and convert it to upper case

    // perform the fetch request, plugging in the course code correctly (using string templating)
    // no need to specify any request headers in this case
    fetch(`https://api.nusmods.com/v2/2023-2024/modules/${courseCode}.json`, {})
    .then(response => response.status === 200 ? response.json() : null) // if the request was completed successfully then get the body else return null
    .then(data => {
        // if the request failed, then the course code was invalid
        if (data == null) {
            container.innerHTML = "";
            container.hidden = true; // hide the course details container
            error.hidden = false; // show the error message
        } else {
            error.hidden = true; // hide the error message

            // Approach 1: the builder method
            // create new elements and append them to the container (after clearing it) each time the request succeeds
            container.innerHTML = "";
            // the course code
            let cc = document.createElement("h1");
            cc.appendChild(document.createTextNode(courseCode));
            container.appendChild(cc);

            // the course title
            let courseTitle = document.createElement("h2");
            courseTitle.appendChild(document.createTextNode(data.title));
            container.appendChild(courseTitle);

            // the faculty details (department, faculty and no. of MCs)
            let facultyDetails = document.createElement("p");
            facultyDetails.appendChild(
                document.createTextNode(`${data.department} • ${data.faculty} • ${data.moduleCredit} Units`)
            );
            container.appendChild(facultyDetails);

            // a thin line
            let line = document.createElement("hr");
            container.appendChild(line);

            // the description of the course
            let description = document.createElement("p");
            description.appendChild(document.createTextNode(data.description));
            container.appendChild(description);

            // the prerequisites
            if (data.prerequisite) {
                let prereq = document.createElement("p");
                prereq.innerHTML = `<b>Prerequisite</b><br>${data.prerequisite}`;
                container.appendChild(prereq);
            }
            // the preclusions
            if (data.preclusion) {
                let preclu = document.createElement("p");
                preclu.innerHTML = `<b>Prerequisite</b><br>${data.preclusion}`;
                container.appendChild(preclu);
            }

            // the corequisite
            if (data.corequisite) {
                let coreq = document.createElement("p");
                coreq.innerHTML = `<b>Corequisite</b><br>${data.corequisite}`;
                container.appendChild(coreq);
            }

            // ideally, you should not use .innerHTML at all, because it is vulnerable to injection
            // in this case, I have used it to prevent having to create too many elements

            container.hidden = false; // un-hide the container so it is visible

            // Approach 2: the select-and-change method
            // in the HTML file, inside the container div, keep the necessary tags and assign them IDs
            // then select each element and change its innerText or innerHTML values accordingly
            // slightly better because there is no need to create new elements each time
            // try this approach yourself

            // Approach 3: the lazy method
            // use string templating and multi-line strings (backticks) to assign
            // the innerHTML of the container div all at once
            // this method is susceptible to injection, so make sure the data is secure and trustable
            // ideally, don't use innerHTML at all, use either of the previous approaches
            /*
            container.innerHTML = `
                <h1>${courseCode}</h1>
                <h2>${data.title}</h2>
                <p>${data.department} • ${data.faculty} • ${data.moduleCredit} Units</p>
                <hr>
                <p>${data.description}</p>
            `;
            if (data.prerequisite) {
                container.innerHTML += `<b>Prerequisite</b><br>${data.prerequisite}`;
            }
            if (data.preclusion) {
                container.innerHTML += `<b>Prerequisite</b><br>${data.preclusion}`;
            }
            if (data.corequisite) {
                container.innerHTML += `<b>Prerequisite</b><br>${data.corequisite}`;
            }
            container.hidden = false;
            */
        }
    })
}