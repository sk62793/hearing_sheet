import firebase, { db } from '../../Firebase';

export const CREATE_FORM_REQUESTED = 'CREATE_FORM_REQUESTED'
export const CREATE_FORM_SUCCESS = 'CREATE_FORM_SUCCESS'
export const CREATE_FORM_FAILURE = 'CREATE_FORM_FAILURE'
export const READ_FORM = 'READ_FORM'

export const readForm = () => async dispatch => {
    let docRef = db.collection("form").doc("values");
    let response;
    docRef.get()
    .then(function(doc) {
        response = doc.data()
        console.log(response)
    }).catch(function(error) {
        console.log("Error getting doc:", error);
    });
    dispatch({ type: READ_FORM, response })
}

export const createForm = (values) => async dispatch => {
    db.collection("form").doc("values").set({
        title: values.title,
        description: values.description,
        querys: values.createForm,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}
