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

function resetLaunchStatus(list, launchStatus) {
    list.style.visibility    = 'hidden';
    launchStatus.style.color = '';
    launchStatus.innerHTML   = 'Awaiting Information Before Launch';
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const validate = [pilot, copilot, fuelLevel, cargoLevel].map(validateInput);
    const correct  = ['Not a Number', 'Not a Number', 'Is a Number', 'Is a Number'];

    const launchStatus = document.getElementById('launchStatus');
    if (validate.includes('Empty')) {
        resetLaunchStatus(list, launchStatus);
        window.alert('All fields are required, please complete the entire form.');
    } else if (!validate.every((value, index) => value === correct[index])) {
        resetLaunchStatus(list, launchStatus);
        window.alert('Please make sure to enter valid information for every field.');
    } else {
        const insufficientFuel   = +fuelLevel < 10000;
        const excessiveCargoMass = +cargoLevel > 10000;
        
        document.getElementById('pilotStatus').innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById('copilotStatus').innerHTML = `Co-pilot ${copilot} is ready for launch`;
        document.getElementById('fuelStatus').innerHTML = `Fuel level ${insufficientFuel ? "too low" : "high enough"} for launch`;
        document.getElementById('cargoStatus').innerHTML = `Cargo mass ${excessiveCargoMass ? "too heavy" : "low enough"} for launch`;
        list.style.visibility = "visible";
        
        if (insufficientFuel || excessiveCargoMass) {
            launchStatus.style.color = 'rgb(199, 37, 78)';
            launchStatus.innerHTML   = 'Shuttle Not Ready for Launch';
        } else {
            launchStatus.style.color = 'rgb(65, 159, 106)';
            launchStatus.innerHTML   = 'Shuttle is Ready for Launch';
        }
    }

    try {
        event.preventDefault();
    } catch {}
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
