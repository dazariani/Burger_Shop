"use client"
import { useState, useEffect } from "react"

function Comment({ commentText }: { commentText: string }) {
  const [isHidden, setIsHidden] = useState(true)

  const commentLength = commentText.length

  const text =
    commentLength > 300 && isHidden
      ? commentText.slice(0, 300) + "..."
      : commentText

  return (
    <div>
      <div className='text-sm'>
        {text}
        <span
          className='cursor-pointer text-blue-500'
          onClick={() => setIsHidden(!isHidden)}
        >
          {isHidden ? "see more" : "see less"}
        </span>
      </div>
    </div>
  )
}
export default Comment
