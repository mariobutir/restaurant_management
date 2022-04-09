import FilterBar from "../../components/FilterBar"
import { useSelector } from "react-redux"
import ViewContent from "../../layouts/ViewContent"
import enums from "../../enums"
import DailyView from "../../components/DailyView"

import "./Overview.scss"
import useModal from "../../hooks/useModal"
import CreateReportOverlay from "./CreateReportOverlay"

const GranulatedView = (props) => {
  const { type, overlay, ...rest } = props
  if (type === enums.IntervalType.Day)
    return <DailyView overlay={overlay} {...rest} />
  return <div />
}

const Overview = () => {
  const {
    loading,
    filters: { type },
  } = useSelector((store) => store.overview)

  const addNewOverlay = useModal({ defaultVisible: false })

  return (
    <div className="overview">
      <CreateReportOverlay overlay={addNewOverlay} />
      <FilterBar />
      <ViewContent className="overview-content" spinning={loading}>
        <GranulatedView type={type} overlay={addNewOverlay} />
      </ViewContent>
    </div>
  )
}

export default Overview
