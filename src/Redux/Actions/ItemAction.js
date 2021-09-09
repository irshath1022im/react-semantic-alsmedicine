import axios from "axios"


const request = (payload) =>  ({ type: 'REQUEST_ADD_ITEM', payload})
const request_fail = (payload) => ( { type: 'REQUEST_ERROR', payload})
const getResponse = payload => ( {type: 'GET_RESPONSE', payload})


export const addItem = (formData) => {
    return async (dispatch) =>{

        let url = `${process.env.REACT_APP_API_SERVER}/items`

        dispatch(request(formData))

        try {
            const result = await axios.post(url, formData)
            const response = result

            // console.log(response)
            
            setTimeout( () => {
                dispatch(getResponse(response.data))
            }, 500)



        } catch (error) {
            
            // console.log(error.response)
            dispatch( request_fail(`${error.response.status}! ${error.response.statusText}`))


        }

    }

}