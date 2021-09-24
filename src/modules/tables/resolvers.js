import model from './model.js'

export default {
    Query: {
        tables: async () => await model.tables()
  
    },

    Mutation: {
        addTable: async(_, args) => {
            let steak = await model.insertTable(args)
            try {
                if(steak) {
                    return {
                        status: 201,
                        message: 'The new Table has been added!',
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
        deleteTable: async(_, args) => {
            let steak = await model.deleteTable(args)
            try {
                if(steak) {
                    return {
                        status: 201,
                        message: 'The Table has been deleted!',
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
        }
    },

    Table:{
        tableId:      global => global.table_id,
        tableNumber:  global => global.table_number,
        tableBusy:    global => global.table_busy,
        order:        async global => {
            if(global.table_busy) return await model.order(global.table_id)
            else return null
        }
    }
}