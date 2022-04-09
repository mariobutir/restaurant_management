import { useState } from 'react'

const useKey = initialKey => {
  const [key, setKey] = useState(initialKey ?? Math.random())

  const updateKey = newKey => {
    setKey(newKey ?? Math.random())
  }

  return { key, updateKey }
}

export default useKey
