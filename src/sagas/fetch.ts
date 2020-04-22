import fetch from 'isomorphic-fetch'

export function fetchPost(url:string, payload:File) {
    return fetch(url, {
        method: "POST",
        body: payload
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(response => {
                    console.log('Success: ', JSON.stringify(response))
                })
            } else {
                return response.json().then(response => {
                    console.log('Error: ', JSON.stringify(response.error))
                })
            }
        })
}

export function fetchDelete(url:string) {
    return fetch(url, {
        method: 'DELETE'
    })
}
