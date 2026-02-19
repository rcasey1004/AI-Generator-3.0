document.getElementById('analyzeBtn').addEventListener('click', () => {
    const rawData = document.getElementById('drawHistory').value;
    const rows = rawData.trim().split('\n').map(row => row.match(/\d+/g).map(Number));
    const recent = rows.slice(0, 20); // Focus on last 20

    let consecutiveDraws = 0;
    let oddCount = 0;
    
    recent.forEach(draw => {
        let sorted = [...draw].sort((a,b) => a-b);
        // Pattern: Consecutive Detection
        for(let i=0; i<sorted.length-1; i++) {
            if(sorted[i+1] - sorted[i] === 1) { consecutiveDraws++; break; }
        }
        // Pattern: Odd/Even
        draw.forEach(n => { if(n % 2 !== 0) oddCount++; });
    });

    const consRate = (consecutiveDraws / recent.length) * 100;

    // UI Update: Stats
    document.getElementById('statsGrid').innerHTML = `
        <div class="stat-box"><h3>${consRate}%</h3><p>Consecutive Rate</p></div>
        <div class="stat-box"><h3>${(oddCount/100*100).toFixed(0)}%</h3><p>Odd Density</p></div>
    `;

    // UI Update: Generate Strategic Lines
    const suggestions = [
        { label: "High Clump (14-15)", nums: "04 14 15 24 31" },
        { label: "Last Digit Echo (7s)", nums: "07 12 17 26 27" },
        { label: "Balanced Low", nums: "08 09 18 22 38" },
        { label: "Wide Spread", nums: "05 11 19 33 40" },
        { label: "The Wildcard", nums: "02 13 16 26 39" }
    ];

    document.getElementById('lineOutput').innerHTML = suggestions.map(s => `
        <div class="ticket-line">
            <span class="num-ball">${s.nums}</span>
            <span style="color: #888;">${s.label}</span>
        </div>
    `).join('');
});
