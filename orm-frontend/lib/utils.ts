export function getMinutesFromNow(minutes: number): number {
    const now = new Date();
    const currentMinutes = now.getMinutes();
    return currentMinutes + minutes;
}

export function getSecondsFromNow(seconds: number): number {
    const now = new Date();
    const currentSeconds = now.getSeconds();
    return currentSeconds + seconds;
}

