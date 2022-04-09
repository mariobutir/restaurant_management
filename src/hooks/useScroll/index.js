import { useRef } from 'react'

const useScroll = () => {
  const ref = useRef()

  const assignRef = shouldAssign => {
    return shouldAssign ? ref : undefined
  }

  const scrollTo = () => {
    if (ref.current)
      ref.current.scrollIntoView({
        block: 'start',
        inline: 'center',
      })
  }

  return { ref, assignRef, scrollTo }
}

export default useScroll
