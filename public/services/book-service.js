/* globals fetch */
export default async function getBook(location) {
  const response = await fetch(location);
  return await response.json();
}
