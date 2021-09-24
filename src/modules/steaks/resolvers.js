import model from './model.js'

export default {
    Query: {
        steaks: async (_, { steakId }) => await model.steaks(steakId)
    },
    
    Mutation: {
        addSteak: async(_, args) => {
            let steak = await model.insertSteak(args)
            try {
                if(steak) {
                    return {
                        status: 201,
                        message: 'The new Steak has been added!',
                        data: steak
                    } 
                }else throw new Error('There is an error')
            }catch(error) {
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        },
        deleteteak: async(_, args) => {
            let steak = await model.deleteSteak(args)
            try {
                if(steak) {
                    return {
                        status: 201,
                        message: 'The new Steak has been deleted!',
                        data: steak
                    } 
                }else throw new Error('The is no such steak!')
            }catch(error) {
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        },
        updateteak: async(_, args) => {
            let steak = await model.updateSteak(args)
            try {
                if(steak) {
                    return {
                        status: 201,
                        message: 'The new Steak has been uptadeted!',
                        data: steak
                    } 
                }else throw new Error('The is no such steak!')
            }catch(error) {
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        }
        
    },

    Steak: {
        steakId:    global => global.steak_id,
        steakName:  global => global.steak_name,
        steakPrice: global => global.steak_price,
        steakImg:   global => global.steak_img
    }
}