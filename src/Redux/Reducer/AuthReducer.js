

const logginStatus = {
    loggedIn: true,
    message:'',
    loading:true,
    loggedBy:'Guest View'
};

export default (state = logginStatus, action) =>{

    switch (action.type) {
        case 'LOGGIN_REQUEST':
            return {
                ...state,
                message:'Requesting'
            }

        case 'LOGGIN_SUCCESS':
            return {
                ...state,
                message:'logged In',
                loggedIn: true,
                loading: false,
                loggedBy: action.payload.name
            }

        case 'LOGGIN_FAIL':
                return {
                    ...state,
                    message: action.payload.message,
                    loggedIn: false,
                    loading: true
        }

        case 'LOGGIN_OUT':
                return {
                    ...state,
                    message:'logged Out',
                    loggedIn: false,
                    loading: true
        }

        
        default:
            return state;
            break;
    }


}