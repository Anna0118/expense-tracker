function formatDate(date) {
  const d = new Date(date);
  // get year
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1);
  const day = String(d.getDate());
  return `${year}-${month}-${day}`;
}

module.exports = { formatDate };
