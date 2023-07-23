export default async function searchAlbumFunction(artist) {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const url = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(url);

  const { results } = await APIResponse.json();

  return results;
}
