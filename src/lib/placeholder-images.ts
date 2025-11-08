import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Use a map for faster lookups
const imageMap = new Map<string, ImagePlaceholder>(data.placeholderImages.map(img => [img.id, img]));

export const PlaceHolderImages = {
  get: (id: string): ImagePlaceholder | undefined => {
    return imageMap.get(id);
  },
  getAll: (): ImagePlaceholder[] => {
    return data.placeholderImages;
  },
  getDefault: (): ImagePlaceholder => {
    return data.placeholderImages[0] || {
        id: 'default',
        description: 'Default placeholder image',
        imageUrl: 'https://picsum.photos/seed/default/600/400',
        imageHint: 'abstract'
    };
  }
};
