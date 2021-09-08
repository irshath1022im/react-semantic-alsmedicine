
// export const logginRequest = (payload) =>{
//     return {
//         type: 'REQUEST_LOGGING',
//         payload
//     }
// }

const users = [
    {
        id:1,
        name:"Irshath",
        role: 'admin'
    },
    {
        id:2,
        name:"Zia",
        role: 'consumer'
    },
    {
        id:3,
        name:"Nafi",
        role: 'receiver'
    },
]


const logginRequest = (payload) =>{
    return {
        type: 'LOGGIN_REQUEST',
        payload
     }
}

const logginSuccess = (payload) =>{
    return {
        type: 'LOGGIN_SUCCESS',
        payload
     }
}

const logOut = () =>{
    return {
        type: 'LOGGIN_OUT',
     }
}

const logFail = (payload) =>{
    return {
        type: 'LOGGIN_FAIL',
        payload
     }
}


export const logginRequestAction = (data) => {
    return async (dispatch) => {
        dispatch( logginRequest(data))

        let loggedUser = users.filter( (el) => {
            return el.name === data.userName
        })

        // console.log(loggedUser)

        if(loggedUser.length > 0) {
            setTimeout( ()=>{
                dispatch(logginSuccess(loggedUser[0]))

            }, 500)
        } else {
            setTimeout( ()=>{
                dispatch(logFail({ message: 'No User Found!'}))

            }, 500)
        }

        

    
    }
}

export const logOutRequest = () => {
    return async(dispatch) =>{

        dispatch(logOut())
    }
}