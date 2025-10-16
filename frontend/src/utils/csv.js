export const exportToCSV = (expenses) => {
  if (!expenses || expenses.length === 0) return;

  const headers = ["Title", "Amount", "Category", "Date", "Note"];
  const rows = expenses.map((e) => [
    e.title,
    e.amount,
    e.category,
    new Date(e.date).toLocaleDateString(),
    e.note || "",
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "expenses.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
};
