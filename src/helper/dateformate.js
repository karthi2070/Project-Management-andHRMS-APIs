function formatToMySQLDate(input) {
  if (!input) return null;

  // If already formatted (YYYY-MM-DD), return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return input;
  }

  // Handle DD-MM-YYYY or DD/MM/YYYY
  const parts = input.split(/[-/]/);
  if (parts.length !== 3) return null;

  const [day, month, year] = parts;

  // Basic check for valid numbers
  if (
    isNaN(day) || isNaN(month) || isNaN(year) ||
    day.length > 2 || month.length > 2 || year.length !== 4
  ) {
    return null;
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

module.exports = { formatToMySQLDate };