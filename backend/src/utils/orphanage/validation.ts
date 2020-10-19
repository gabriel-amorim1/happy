import * as Yup from 'yup';

export const createValidation = Yup.object()
    .shape({
        name: Yup.string().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        about: Yup.string().required().max(300),
        instructions: Yup.string().required(),
        opening_hours: Yup.string().required(),
        open_on_weekends: Yup.boolean().required(),
        image: Yup.array(
            Yup.object().shape({
                path: Yup.string().required(),
            }),
        ),
    },
);
