import mongoose, { Model, Schema } from 'mongoose'
import { Entry } from '../interfaces'

export interface IEntry extends Entry {}

const EntrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number, required: true },
    status: {
        type: String,
        enum: {
            values: [ 'pending', 'in-progress', 'finished' ],
            message: '{VALUE} is not allowed'
        },
        default: 'pending'
    }
})

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', EntrySchema)

export default EntryModel