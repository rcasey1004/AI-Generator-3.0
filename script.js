const analyzeBtn = document.getElementById('analyzeBtn');
const clearBtn = document.getElementById('clearBtn');
const lineOutput = document.getElementById('lineOutput');

// Function to get a random number between min and max
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generatePatternLine() {
    let line = new Set();
    
    // 1. RULE: Single Digit Anchor (1-9) - Appears in 100% of your draws
    line.add(getRandom(1, 9));
    
    // 2. RULE: Consecutive Pair (55% Chance)
    // We simulate the machine's clumping bias here
    if (Math.random() < 0.55) {
        let start = getRandom(10, 39);
        line.add(start);
        line.add(start + 1);
    }

    // 3. RULE: Fill the rest with random numbers 1-41
    while (line.size < 5) {
        line.add(getRandom(1, 41));
    }
    
    return Array.from(line).sort((a, b) => a - b);
}

analyzeBtn.addEventListener('click', () => {
    // This creates 5 TOTALLY NEW lines every time you click
    let html = "";
    for (let i = 0; i < 5; i++) {
        const nums = generatePatternLine();
        const sum = nums.reduce((a, b) => a + b, 0);
        
        // Highlight if it's in the "Hot Sum Zone" (85-105)
        const isHotSum = (sum >= 85 && sum <= 105) ? "style='border-left: 5px solid #00ffcc;'" : "style='border-left: 5px solid #444;'";

        html += `
            <div class="ticket-line" ${isHotSum}>
                <span class="num-ball">${nums.map(n => n.toString().padStart(2, '0')).join(' ')}</span>
                <span class="label">Sum: ${sum}</span>
            </div>`;
    }
    
    // This adds the new ones to the top without removing old ones
    lineOutput.innerHTML = html + lineOutput.innerHTML;
});

// The Clear Button that actually works
clearBtn.addEventListener('click', () => {
    lineOutput.innerHTML = "";
});
