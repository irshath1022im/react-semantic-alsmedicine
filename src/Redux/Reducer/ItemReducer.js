

const items = {
    loading: false,
    message: '',
    request_errror:'',
    items:{}
}

export const itemReducer = (state=items, action) =>{

    switch (action.type) {

        case 'REQUEST_ADD_ITEM':
            return {
                ...state,
                loading:true,
                message:'Requesting',
                items: action.payload
            }

        
            break;

        case 'GET_RESPONSE':
            return {
                ...state,
                loading: false,
                message: 'Created',
                items: {}
            }
            break;

        case 'REQUEST_ERROR':
            return {
                ...state,
                loading:false,
                message: action.payload,
            }
            break;
    
        default:
            return state;
            break;
    }

}