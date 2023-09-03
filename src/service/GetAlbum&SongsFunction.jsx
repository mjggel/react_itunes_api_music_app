export async function getSongsFunction(id) {
  try {
    const url = `https://itunes.apple.com/lookup?id=${id}&entity=song`;
    const APIResponse = await fetch(url);
    const { results } = await APIResponse.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function getAlbumFunction(id) {
  try {
    const url = `https://itunes.apple.com/lookup?id=${id}&entity=album`;
    const APIResponse = await fetch(url);
    const { results } = await APIResponse.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}
