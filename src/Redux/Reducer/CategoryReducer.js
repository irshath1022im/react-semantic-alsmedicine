

const category = [
    {
        id:1,
        category: 'Medicine'
    },
    {
        id:2,
        category: 'Supplimentary'
    },
    {
        id:3,
        category: 'Consumables'
    }
]

export default ( state= category, action) => {

    switch (action.type) {
        case 'GET_CATEGORY':
            return state;
            break;
    
        default:
            return state;
            break;
    }

}