import mongoose, { Model, Schema } from 'mongoose'
import { Entry } from '../interfaces'

interface IEntry extends Entry {}

const EntrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number, required: true },
    status: {
        type: String,
        enum: {
            values: [ 'pending', 'in-progress', 'finished' ],
            message: '{VALUE} is not allowed'
        }
    }
})

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', EntrySchema)

export default EntryModel