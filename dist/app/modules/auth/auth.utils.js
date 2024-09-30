"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDateWithinFiveMinutes = exports.isFiveMinutesAgo = void 0;
function isFiveMinutesAgo(dateParam) {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes in milliseconds
    // Check if the dateParam is equal to or earlier than five minutes ago
    return dateParam <= fiveMinutesAgo;
}
exports.isFiveMinutesAgo = isFiveMinutesAgo;
function checkDateWithinFiveMinutes(dateParam) {
    const now = new Date();
    const timeDifference = now.getTime() - dateParam.getTime(); // Time difference in milliseconds
    const fiveMinutesInMillis = 5 * 60 * 1000;
    if (timeDifference >= fiveMinutesInMillis) {
        return 'Date was more than 5 minutes ago.';
    }
    const timeLeftInMillis = fiveMinutesInMillis - timeDifference;
    const minutesLeft = Math.floor(timeLeftInMillis / (60 * 1000));
    const secondsLeft = Math.floor((timeLeftInMillis % (60 * 1000)) / 1000);
    return `${minutesLeft} minute(s) and ${secondsLeft} second(s) left.`;
}
exports.checkDateWithinFiveMinutes = checkDateWithinFiveMinutes;
// Example usage:
const dateToCheck = new Date(new Date().getTime() - 3 * 60 * 1000); // 3 minutes ago
console.log(checkDateWithinFiveMinutes(dateToCheck)); // Should return "2 minute(s) and X second(s) left."
const oldDate = new Date(new Date().getTime() - 10 * 60 * 1000); // 10 minutes ago
console.log(checkDateWithinFiveMinutes(oldDate)); // Should return "Date was more than 5 minutes ago."
