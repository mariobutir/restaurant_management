import { Spin } from "antd"

const ViewContent = (props) => {
  const { className = "", children, spinning = false } = props
  return (
    <Spin spinning={spinning} delay={25}>
      <div className={`main__content ${className}`}>{children}</div>
    </Spin>
  )
}

export default ViewContent
