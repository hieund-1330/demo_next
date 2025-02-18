export function logTime(name: string) {
  const currentTime = new Date();
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');
  const timeString = `${currentTime.getHours()}:${minutes}:${seconds}`;
  console.log(`${name} - Time: ${timeString}`);
}
