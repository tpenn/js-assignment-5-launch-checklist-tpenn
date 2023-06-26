// Write your JavaScript code here!

window.addEventListener("load", function() {
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse
        .then((result) => listedPlanets = result)
        .then(_ => {
            // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
            console.log(listedPlanets);
            const planet = pickPlanet(listedPlanets);
            addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
        });
   
    const form = document.querySelector('[data-testid=testForm]');
    const list = document.getElementById('faultyItems');

    list.style.visibility = 'hidden';
    form.addEventListener('submit',
        _ => formSubmission(document, list, form.elements["pilotName"].value, form.elements['copilotName'].value, form.elements['fuelLevel'].value, form.elements['cargoMass'].value)
    );
});