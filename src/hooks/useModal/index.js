import { useState } from "react"
import useStateCallback from "../useStateCallback"

const useModal = (props) => {
  const {
    defaultVisible = false,
    defaultData = {},
    onHide = () => {},
    onShow = () => {},
  } = props || {}
  const [visible, setVisible] = useState(defaultVisible)
  const [modalData, setModalData] = useStateCallback(defaultData)

  const toggle = () => {
    if (visible) onHide()
    else onShow()
    setVisible((prevValue) => !prevValue)
  }

  const show = (optionalData) => {
    setVisible(true)
    handleOptionalData(optionalData)
    onShow()
  }

  const hide = (optionalData) => {
    setVisible(false)
    handleOptionalData(optionalData, onHide)
  }

  const setVisibility = (newValue) => {
    setVisible(newValue)
  }

  const handleOptionalData = (optionalData, callback = () => {}) => {
    if (optionalData) setModalData(optionalData, () => callback())
    else callback()
  }

  return {
    visible,
    data: modalData,
    toggle,
    show,
    hide,
    setVisibility,
    setData: setModalData,
  }
}

export default useModal
