export interface IFavorite {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
export interface FavoritesSelect {
  artists: { id: boolean; name: boolean; grammy: boolean };
  albums: { id: boolean; name: boolean; year: boolean; artistId: boolean };
  tracks: {
    id: boolean;
    name: boolean;
    duration: boolean;
    artistId: boolean;
    albumId: boolean;
  };
}
