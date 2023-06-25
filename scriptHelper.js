// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementById('missionTarget').innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
`;
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

function validateInput(testInput) {
    if (testInput === '') return 'Empty';
    if (isNaN(+testInput)) return 'Not a Number';
    return 'Is a Number';
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const validate = [pilot, copilot, fuelLevel, cargoLevel].map(validateInput);
    const correct  = ['Not a Number', 'Not a Number', 'Is a Number', 'Is a Number'];

    console.log(validate);
    if (validate.includes('Empty')) {
        window.alert('All fields are required, please complete the entire form.');
        event.preventDefault();
    } else if (!validate.every((value, index) => value === correct[index])) {
        window.alert('Please make sure to enter valid information for every field.');
        event.preventDefault();
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then((response) => response.json());

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
