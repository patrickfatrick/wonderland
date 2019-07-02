export default function truncate(string = '', num) {
  return string.length >= num ? `${string.substring(0, num)}...` : string;
}
