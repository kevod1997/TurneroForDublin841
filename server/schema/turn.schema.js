import {z} from 'zod'

export const createTurnSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido'
    }),
    phone: z.string({
        required_error: 'El telefono es requerido'
    }),
    date: z.string({
        required_error: 'La fecha es requerida'
    }),
    hour: z.string({
        required_error: 'La hora es requerida'
    }),
    service: z.string({
        required_error: 'El servicio es requerido'
    })
})
