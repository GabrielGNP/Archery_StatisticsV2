export function formatDateToDMY(date) {
  const day = String(date.getDate()).padStart(2, '0');       // Día con 2 dígitos
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-indexed)
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function parseDMYToDate(dmyString) {
  const [day, month, year] = dmyString.split("/").map(Number);
  return new Date(year, month - 1, day);  // Meses son 0-indexed
}

export function parseDateToUTCCleaned(date){
  return date.toISOString().replace("T", " ").replace("Z", "")
}