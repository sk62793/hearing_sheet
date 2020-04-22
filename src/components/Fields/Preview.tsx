import React from 'react'

export const renderPreview = (props: any) => {
    const { index, queries } = props
    let path = queries[index].path
    return (
        <div>
            {path !== '' && <img src={path} alt='' style={{ width: '50%' }} />}
        </div>
    )
}
