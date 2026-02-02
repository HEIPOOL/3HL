export interface Track {
  rank: number;
  title: string;
  artist: string;
  plays: number;
  preview: string;
}

export interface TracksData {
  user: string;
  partner: string;
  months: number;
  topTracks: Track[];
}

export interface Moment {
  id: string;
  date: string;
  title: string;
  desc: string;
  media: string;
}

export interface MomentsData {
  relationship: string;
  moments: Moment[];
}

export interface GalleryItem {
  id: string;
  media: string;
  type: 'image' | 'video';
  caption: string;
}

export interface GalleryData {
  items: GalleryItem[];
}
