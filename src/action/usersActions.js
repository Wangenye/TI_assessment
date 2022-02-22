import axios from 'axios'
import{
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    
    
} from '../constants/User_constatnts'



export const listAllUsers =()=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:USER_LIST_REQUEST,
        })

        const {data} = await axios.get(`https://ti-react-test.herokuapp.com/users`)
        // console.log("D Data::",data)
        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch({
            type:USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


