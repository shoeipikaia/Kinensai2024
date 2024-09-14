const performances = [
    { day: 1, date: '9/15', times: ['09:30', '11:00', '13:00', '15:00'] },
    { day: 2, date: '9/16', times: ['09:30', '11:00', '13:00', '15:00'] },
];

function updateCountdown() {
    const now = new Date();
    let nextPerformance = null;

    for (const day of performances) {
        for (const time of day.times) {
            const [hours, minutes] = time.split(':').map(Number);
            const performanceTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            if (performanceTime > now) {
                nextPerformance = { day: day.day, date: day.date, time: performanceTime };
                break;
            }
        }
        if (nextPerformance) break;
    }

    const countdownElement = document.getElementById('countdown');
    const nextShowTimeElement = document.getElementById('next-show-time');

    if (nextPerformance) {
        const timeDiff = nextPerformance.time - now;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        countdownElement.textContent = `${hours}時間${minutes}分${seconds}秒`;
        nextShowTimeElement.textContent = `次回公演: ${nextPerformance.date} ${nextPerformance.time.toTimeString().slice(0, 5)}`;
    } else {
        countdownElement.textContent = '本日の公演は終了しました';
        nextShowTimeElement.textContent = '';
    }
}

function displaySchedule() {
    const scheduleElement = document.getElementById('performance-list');
    
    performances.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'performance-day';
        
        dayElement.innerHTML = `
            <h3>${day.date}</h3>
            <ul>
                ${day.times.map(time => `<li>${time}</li>`).join('')}
            </ul>
        `;
        
        scheduleElement.appendChild(dayElement);
    });
}

// 初期表示
displaySchedule();
updateCountdown();

// 1秒ごとにカウントダウンを更新
setInterval(updateCountdown, 1000);