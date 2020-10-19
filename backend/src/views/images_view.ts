import Image from '../database/entities/Image';

export default {
    render(image: ImageInterface) {
        return {
            id: image.id,
            url: `${process.env.UPLOAD_IMAGE_URL}/uploads/${image.path}`,
        };
    },

    renderMany(images: ImageInterface[]) {
        return images.map((image) => this.render(image));
    },
};
