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

// Feature 2: Advanced "What Club Should I Hit?" Calculator
function calculateClub(event) {
    // Prevent page reload on form submit
    if (event) event.preventDefault();

    // Fetch user inputs from form
    const rawYardage = parseFloat(document.getElementById('yardage-input').value);
    const wind = document.getElementById('wind-select').value;
    const elevation = document.getElementById('elevation-select').value;
    const temp = document.getElementById('temp-select').value;
    const rain = document.getElementById('rain-select').value;
    const ground = document.getElementById('ground-select').value;
    const resultBox = document.getElementById('club-result');

    // Input validation
    if (isNaN(rawYardage) || rawYardage <= 0) {
        resultBox.innerHTML = "<p style='color: #d81b60; font-weight: bold; text-align: center;'>Please enter a valid yardage!</p>";
        return;
    }

    // Base calculation
    let adjustedYardage = rawYardage;

    // 1. Wind Factor
    if (wind === 'headwind') adjustedYardage += 12;
    else if (wind === 'tailwind') adjustedYardage -= 10;

    // 2. Slope Factor
    if (elevation === 'uphill') adjustedYardage += 10;
    else if (elevation === 'downhill') adjustedYardage -= 10;

    // 3. Temperature Factor (Cold air is denser, reducing flight distance)
    if (temp === 'cold') adjustedYardage += 8;
    else if (temp === 'hot') adjustedYardage -= 5;

    // 4. Rain Factor (Rain causes drag and adds ball weight)
    if (rain === 'light-rain') adjustedYardage += 5;
    else if (rain === 'heavy-rain') adjustedYardage += 10;

    // 5. Ground Wetness Factor (Wet ground provides zero roll-out)
    if (ground === 'wet') adjustedYardage += 8;
    else if (ground === 'firm') adjustedYardage -= 5;

    // Club selection rules based on final adjusted yardage
    let recommendedClub = "";
    let tip = "";

    if (adjustedYardage >= 220) {
        recommendedClub = "Driver or 3-Wood";
        tip = "Smooth swing! Heavy conditions mean carry distance is key.";
    } else if (adjustedYardage >= 195) {
        recommendedClub = "5-Wood or Hybrid";
        tip = "Great distance for a hybrid to get high ball launch in tough conditions.";
    } else if (adjustedYardage >= 180) {
        recommendedClub = "4-Iron or 5-Iron";
        tip = "Focus on clean center-face contact to cut through tough conditions.";
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
        tip = "On wet turf, make sure to take a clean divot after the ball.";
    } else {
        recommendedClub = "Lob Wedge (LW) or Putter";
        tip = "Focus on distance control and landing soft near the pin.";
    }

    // Render output card inside the result div
    resultBox.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #0b4626; margin-bottom: 8px;">Recommended Club: <span style="color: #d81b60;">${recommendedClub}</span></h3>
            <p style="font-size: 1.1rem; margin: 5px 0;"><strong>Adjusted Playing Distance:</strong> ${Math.round(adjustedYardage)} Yards <br><span style="font-size: 0.9rem; color: #666666;">(Actual Target: ${rawYardage} yds)</span></p>
            <p style="font-style: italic; color: #333333; margin-top: 8px;">💡 Caddie Tip: ${tip}</p>
        </div>
    `;
}
