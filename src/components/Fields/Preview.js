import React from 'react'

export let renderPreview = (props) => {
    const { index, queries } = props
    let path = queries[index].path
    return (
        <div>
            {path !== '' && <img src={path} alt='' style={{ width: '50%' }} />}
        </div>
    )
}
