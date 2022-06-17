import mongoose from 'mongoose'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    // verify current connection
    if ( mongoConnection.isConnected ) {
        console.log('Already connected to DB')
        return
    }

    try {
        // verify other connections
        if ( mongoose.connections.length > 0 ) {
            mongoConnection.isConnected = mongoose.connections[0].readyState

            if ( mongoConnection.isConnected === 1 ) {
                console.log('Connected to previous connection')
                return
            }
            await mongoose.disconnect()
            console.log('Disconnected from MongoDB')
        }
        await mongoose.connect('...') // TODO: replace with some env
        mongoConnection.isConnected = 1
        
        console.log('Connected to MongoDB;', '...') 
    } catch (error) {
        
    }
}

export const disconnect = async () => {
    if ( mongoConnection.isConnected !== 0 ) return
    
    try {
        await mongoose.disconnect()
        console.log('Disconnected from MongoDB')
    } catch (error) {
        
    }
}