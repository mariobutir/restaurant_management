import FilterBar from "../../components/FilterBar"
import { useSelector } from "react-redux"
import ViewContent from "../../layouts/Main/ViewContent"
import enums from "../../enums"
import DailyView from "../../components/DailyView"

import "./Overview.scss"
import useModal from "../../hooks/useModal"
import CreateReportOverlay from "./CreateUpdateReportOverlay"

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

  const reportOverlay = useModal({ defaultVisible: false })

  return (
    <div className="overview">
      <CreateReportOverlay overlay={reportOverlay} />
      <FilterBar />
      <ViewContent className="overview-content" spinning={loading}>
        <GranulatedView type={type} overlay={reportOverlay} />
      </ViewContent>
    </div>
  )
}

export default Overview
