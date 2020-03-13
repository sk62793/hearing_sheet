import axios from 'axios'

export const CREATE_FORM = 'CREATE_FORM'

export const createForm = values => async dispatch => { 
    const response = await axios.post(``, values) //valuesで追加するデータを送信
    dispatch({ type: CREATE_FORM, response })
}
