import React from 'react'

export const LayoutDefault = (props: any) => {
  return (
    <div>
        <h2>LayoutDefault</h2>
        <div>This is default layout...</div>
        <div>{props.children}</div>
    </div>
  )
}
