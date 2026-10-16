// Feature 1: Dark Mode Toggle Function
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    const button = document.getElementById('theme-toggle-btn');
    if (body.classList.contains('dark-mode')) {
        button.textContent = '☀️ Light Mode';
    } else {
        button.textContent = '🌙 Dark Mode';
    }
}

// Feature 2: "What Club Should I Hit?" Distance & Club Calculator Function
function calculateClub(event) {
    // Prevent default form submission reload
    if (event) event.preventDefault();

    // Retrieve input values from HTML DOM
    const rawYardage = parseFloat(document.getElementById('yardage-input').value);
    const wind = document.getElementById('wind-select').value;
    const elevation = document.getElementById('elevation-select').value;
    const resultBox = document.getElementById('club-result');

    // Input validation check
    if (isNaN(rawYardage) || rawYardage <= 0) {
        resultBox.innerHTML = "<p style='color: #d81b60; font-weight: bold; text-align: center;'>Please enter a valid yardage!</p>";
        return;
    }

    // Calculate playing distance based on conditions
    let adjustedYardage = rawYardage;

    // Wind adjustments
    if (wind === 'headwind') adjustedYardage += 12; // Headwind lengthens playing distance
    else if (wind === 'tailwind') adjustedYardage -= 10; // Tailwind shortens playing distance

    // Elevation adjustments
    if (elevation === 'uphill') adjustedYardage += 10;
    else if (elevation === 'downhill') adjustedYardage -= 10;

    // Club selection logic based on calculated playing yardage
    let recommendedClub = "";
    let tip = "";

    if (adjustedYardage >= 220) {
        recommendedClub = "Driver or 3-Wood";
        tip = "Smooth swing! Focus on landing on the fairway.";
    } else if (adjustedYardage >= 195) {
        recommendedClub = "5-Wood or Hybrid";
        tip = "Great distance for a hybrid to achieve high ball flight.";
    } else if (adjustedYardage >= 180) {
        recommendedClub = "4-Iron or 5-Iron";
        tip = "Keep your tempo steady for clean solid contact.";
    } else if (adjustedYardage >= 165) {
        recommendedClub = "6-Iron";
        tip = "Aim for the center of the green.";
    } else if (adjustedYardage >= 150) {
        recommendedClub = "7-Iron";
        tip = "The classic go-to iron. Trust your swing!";
    } else if (adjustedYardage >= 135) {
        recommendedClub = "8-Iron";
        tip = "Good scoring distance. Play aggressively toward the pin.";
    } else if (adjustedYardage >= 120) {
        recommendedClub = "9-Iron";
        tip = "High trajectory will land soft on the green.";
    } else if (adjustedYardage >= 100) {
        recommendedClub = "Pitching Wedge (PW)";
        tip = "Control your backswing for clean green contact.";
    } else if (adjustedYardage >= 75) {
        recommendedClub = "Gap Wedge (GW) or Sand Wedge (SW)";
        tip = "Take a smooth three-quarter swing.";
    } else {
        recommendedClub = "Lob Wedge (LW) or Putter";
        tip = "Focus on distance control and soft touch.";
    }

    // Output formatted results into DOM
    resultBox.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #0b4626; margin-bottom: 8px;">Recommended Club: <span style="color: #d81b60;">${recommendedClub}</span></h3>
            <p style="font-size: 1.1rem; margin: 5px 0;"><strong>Plays Like:</strong> ${Math.round(adjustedYardage)} Yards (Actual: ${rawYardage} yds)</p>
            <p style="font-style: italic; color: #555555; margin-top: 5px;">💡 Caddie Tip: ${tip}</p>
        </div>
    `;
}
