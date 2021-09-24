import model from './model.js'

export default {
    Query: {
        orders: async () => await model.orders()
    },

    Mutation: {
        addOrder: async(_, args) => {
            let order = await model.insertOrder(args)
            try {
                if(order) {
                    return {
                        status: 201,
                        message: 'The new Order has been added!',
                        data: order
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
        payOrder: async(_, args) => {
            let order = await model.payOrder(args)
            try {
                if(order) {
                    return {
                        status: 201,
                        message: 'The Order has been pay!',
                        data: order
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
        updateOrder: async(_, args) => {
            let order = await model.putOrder(args)
            try {
                if(order) {
                    return {
                        status: 201,
                        message: 'The Order has been updated!',
                        data: order
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
        deleteOrder: async(_, args) => {
            let order = await model.deleteOrder(args)
            try {
                if(order) {
                    return {
                        status: 201,
                        message: 'The Order has been deleted!',
                        data: order
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
        deleteOrderSet: async(_, args) => {
            let order = await model.deleteOrderSet(args)
            try {
                if(order) {
                    return {
                        status: 201,
                        message: 'The Order has been deleted orderset!',
                        data: order
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

    Order: {
        orderId:       global => global.order_id,
        orderPaid:     global => global.order_paid,
        tableNumber:   global => global.table_number,
        orderSets:     global => global.order_sets,
        orderCreateAt: global => global.order_created_at,
        orderPrice:    global => global.order_total_price,
    },
    OrderSet: {
        orderSetId: global => global.order_set_id
    }
}