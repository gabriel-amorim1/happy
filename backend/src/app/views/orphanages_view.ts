import * as imagesView from './images_view';
import {
    OrphanageInterface,
    OrphanageViewInterface,
} from '../interfaces/OrphanageInterface';

export default {
    render(orphanage: OrphanageInterface): OrphanageViewInterface {
        return {
            id: orphanage.id!,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images),
        };
    },

    renderMany(orphanages: OrphanageInterface[]): OrphanageViewInterface[] {
        return orphanages.map((orphanage) => this.render(orphanage));
    },
};
