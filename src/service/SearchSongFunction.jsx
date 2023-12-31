export default async function searchSongFunction(artist) {
  try {
    const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

    const url = `https://itunes.apple.com/search?entity=song&term=${artistNameURL}&attribute=allArtistTerm`;

    const APIResponse = await fetch(url);

    const { results } = await APIResponse.json();

    return results;
  } catch (error) {
  }
}
