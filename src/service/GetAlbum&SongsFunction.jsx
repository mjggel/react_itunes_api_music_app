export async function getSongsFunction(id) {
  const url = `https://itunes.apple.com/lookup?id=${id}&entity=song`;
  const APIResponse = await fetch(url);
  const { results } = await APIResponse.json();
  return results;
}

export async function getAlbumFunction(id) {
  const url = `https://itunes.apple.com/lookup?id=${id}&entity=album`;
  const APIResponse = await fetch(url);
  const { results } = await APIResponse.json();
  return results;
}
