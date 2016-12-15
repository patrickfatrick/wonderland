/* globals fetch */

export async function getBook (location) {
  const response = await fetch(location)
  return await response.json()
}
