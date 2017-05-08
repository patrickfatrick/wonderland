// Helper function to truncate text for small screens
export function truncate(string = '', num) {
  return string.length >= num ? `${string.substring(0, num)}...` : string;
}

export function flatten(arr, result = []) {
  for (let i = 0; i < arr.length; i += 1) {
    const value = arr[i];
    if (Array.isArray(value)) {
      for (let j = 0; i < value.length; i += 1) {
        const value2 = value[j];
        if (Array.isArray(value2)) {
          flatten(value2, result);
        } else {
          result.push(value2);
        }
      }
    } else {
      result.push(value);
    }
  }
  return result;
}
