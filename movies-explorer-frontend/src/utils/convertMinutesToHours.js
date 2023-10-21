export default function convertMinutesToHours(duration) {
  const hh = Math.floor(duration / 60);
  if (!hh) {
    return duration + 'м';
  }
  const mm = duration % 60;
  if (mm) return `${hh}ч${mm}м`;
  return `${hh}ч`;
}
