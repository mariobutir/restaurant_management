import { useEffect, useState } from "react"

const useMountStatus = (props) => {
  const { defaultTimeout = 500 } = props || {}
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), defaultTimeout)
    return () => clearTimeout(timeout)
  }, [])

  return isMounted
}

export default useMountStatus
