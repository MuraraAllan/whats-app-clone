export default function timeInSecondsRenderInMinute(seconds: number) {
  const minutes = seconds / 60;
  if (minutes >= 1) {
    const remainingSeconds = seconds % 60;
    return `${minutes.toFixed()}:${remainingSeconds.toFixed().padStart(2, '0')}`
  }
  return `0:${seconds.toFixed().padStart(2, '0').substring(0, 2)}`
}