import {
    CreateOrphanageRequestInterface,
    OrphanageInterface,
} from '../../interfaces/OrphanageInterface';

export const handleDataToCreateOrphanage = (
    data: CreateOrphanageRequestInterface,
    files: Express.Multer.File[],
): OrphanageInterface => {
    const images = files.map((image) => ({ path: image.filename }));

    const orphanageObject = <OrphanageInterface>{
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        about: data.about,
        instructions: data.instructions,
        opening_hours: data.opening_hours,
        open_on_weekends: data.open_on_weekends === 'true',
        images,
    };

    return <OrphanageInterface>orphanageObject;
};
