import { ImageInterface, ImageViewInterface } from './ImageInterface';

export interface CreateOrphanageRequestInterface {
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
}

export interface OrphanageInterface {
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: ImageInterface[];

    id?: number;
}

export interface OrphanageViewInterface {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: ImageViewInterface[];
}
