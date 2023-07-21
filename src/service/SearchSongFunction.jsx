export default async function searchSongFunction(artist) {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const url = `https://itunes.apple.com/search?entity=song&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(url);
  console.log('songs APIResponse:', APIResponse);

  const { results } = await APIResponse.json();
  console.log('songs results:', results);
  return results;
}
