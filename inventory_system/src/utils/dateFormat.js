export function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short", // Jan, Feb, Mar
    day: "numeric",
    year: "numeric",
  });
}
