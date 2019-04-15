export default (state) => {
  const { duration } = state.data.book.audio;
  const hours = Math.floor(duration / 3600).toString();
  const mins = Math.floor((duration % 3600) / 60).toString();
  const secs = Math.floor((duration % 3600) % 60).toString();

  return `${hours}h ${mins}m ${secs}s`;
};
