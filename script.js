const performances = [
    { date: '9/15', times: ['09:30', '11:00', '13:00', '15:00'] },
    { date: '9/16', times: ['09:30', '11:00', '13:00', '15:00'] },
];

function updateCountdown() {
    const now = new Date();
    let nextPerformance = null;

    for (const day of performances) {
        for (const time of day.times) {
            const [hours, minutes] = time.split(':').map(Number);
            const performanceTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            if (performanceTime > now) {
                nextPerformance = { date: day.date, time: performanceTime };
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
    scheduleElement.innerHTML = '';
    
    const now = new Date();
    const today = performances.find(day => day.date === `${now.getMonth() + 1}/${now.getDate()}`);
    
    if (today) {
        today.times.forEach(time => {
            const [hours, minutes] = time.split(':').map(Number);
            const performanceTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            const isPast = performanceTime < now;
            
            const timeElement = document.createElement('div');
            timeElement.className = `performance-time ${isPast ? 'past-performance' : ''}`;
            timeElement.innerHTML = `
                <span class="time">${time}</span>
                <span class="status">${isPast ? '終了' : '予定'}</span>
            `;
            
            scheduleElement.appendChild(timeElement);
        });
    } else {
        scheduleElement.innerHTML = '<p>本日の公演はありません。</p>';
    }
}

function setupShareButtons() {
    const lineShareBtn = document.getElementById('line-share-btn');
    const copyLinkBtn = document.getElementById('copy-link-btn');

    lineShareBtn.addEventListener('click', shareOnLINE);
    copyLinkBtn.addEventListener('click', copyLinkToClipboard);
}

function shareOnLINE() {
    const shareText = encodeURIComponent("文化祭劇『The BACHELOR NISHI』の公演スケジュールをチェックしよう！");
    const shareURL = encodeURIComponent(window.location.href);
    const lineURL = `https://line.me/R/msg/text/?${shareText}%0D%0A${shareURL}`;
    window.open(lineURL, '_blank');
}

function copyLinkToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('リンクがクリップボードにコピーされました！');
    }).catch(err => {
        console.error('クリップボードへのコピーに失敗しました', err);
    });
}

function init() {
    displaySchedule();
    updateCountdown();
    setupShareButtons();
    setInterval(updateCountdown, 1000);
}

init();