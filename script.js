class DigitalClock {
    constructor() {
        this.is24HourFormat = false;
        this.isDarkTheme = false;
        this.initializeElements();
        this.bindEvents();
        this.updateClock();
        this.startClock();
    }

    initializeElements() {
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.ampmElement = document.getElementById('ampm');
        this.dayNameElement = document.getElementById('dayName');
        this.monthElement = document.getElementById('month');
        this.dayNumElement = document.getElementById('dayNum');
        this.yearElement = document.getElementById('year');
        this.toggleFormatBtn = document.getElementById('toggleFormat');
        this.toggleThemeBtn = document.getElementById('toggleTheme');
    }

    bindEvents() {
        this.toggleFormatBtn.addEventListener('click', () => {
            this.toggleTimeFormat();
        });

        this.toggleThemeBtn.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    updateClock() {
        const now = new Date();
        
        // Update time
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        let ampm = '';
        
        if (!this.is24HourFormat) {
            ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
        }
        
        // Format with leading zeros
        this.hoursElement.textContent = this.formatWithLeadingZero(hours);
        this.minutesElement.textContent = this.formatWithLeadingZero(minutes);
        this.secondsElement.textContent = this.formatWithLeadingZero(seconds);
        
        // Show/hide AM/PM
        if (this.is24HourFormat) {
            this.ampmElement.style.display = 'none';
        } else {
            this.ampmElement.style.display = 'inline';
            this.ampmElement.textContent = ampm;
        }
        
        // Update date
        this.updateDate(now);
    }

    updateDate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        this.dayNameElement.textContent = days[date.getDay()];
        this.monthElement.textContent = months[date.getMonth()];
        this.dayNumElement.textContent = date.getDate();
        this.yearElement.textContent = date.getFullYear();
    }

    formatWithLeadingZero(number) {
        return number < 10 ? `0${number}` : number.toString();
    }

    toggleTimeFormat() {
        this.is24HourFormat = !this.is24HourFormat;
        this.toggleFormatBtn.textContent = this.is24HourFormat ? '12H Format' : '24H Format';
        this.updateClock();
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        document.body.classList.toggle('dark', this.isDarkTheme);
        this.toggleThemeBtn.textContent = this.isDarkTheme ? 'Light Theme' : 'Dark Theme';
    }

    startClock() {
        // Update every second
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }
}

// Initialize the clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DigitalClock();
});

// Add some fun animations when the page loads
window.addEventListener('load', () => {
    const clockWrapper = document.querySelector('.clock-wrapper');
    clockWrapper.style.transform = 'scale(0.8)';
    clockWrapper.style.opacity = '0';
    
    setTimeout(() => {
        clockWrapper.style.transition = 'all 0.5s ease';
        clockWrapper.style.transform = 'scale(1)';
        clockWrapper.style.opacity = '1';
    }, 100);
});
