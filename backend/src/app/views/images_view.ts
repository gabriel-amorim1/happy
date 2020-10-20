import {
    ImageInterface,
    ImageViewInterface,
} from '../interfaces/ImageInterface';

export const render = (image: ImageInterface): ImageViewInterface => {
    return {
        id: image.id!,
        url: `${process.env.UPLOAD_IMAGE_URL}/uploads/${image.path}`,
    };
};

export const renderMany = (images: ImageInterface[]): ImageViewInterface[] => {
    return images.map((image) => render(image));
};
