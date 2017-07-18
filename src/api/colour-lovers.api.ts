import { Observable } from 'rxjs';
import { HSV, RGB } from '../shared';
import { JSONP } from './jsonp';

export interface ColourLoversColor {
  id: string;
  title: string;
  userName: string;
  numViews: number;
  numVotes: number;
  numComments: number;
  numHearts: number;
  rank: number;
  dateCreated: Date;
  hex: string;
  rgb: RGB;
  hsv: HSV;
  description: string;
  url: string;
  imageUrl: string;
  badgeUrl: string;
  apiUrl: string;
}

export const ColourLovers = {
  getColor: (hex: string): Observable<ColourLoversColor[]> => {
    const url = `https://www.colourlovers.com/api/color/${hex}`;
    return JSONP(url);
  }
};
