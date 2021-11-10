import * as images from 'resources/images';
import pascal from 'utilities/pascal';

export default function image(key) {
  return images[pascal(key)] ?? undefined;
}
