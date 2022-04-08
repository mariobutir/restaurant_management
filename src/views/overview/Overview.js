import FilterBar from "../../components/FilterBar"
import { useSelector } from "react-redux"
import ViewContent from "../../layouts/ViewContent"
import enums from "../../enums"
import DailyView from "../../components/DailyView"

import "./Overview.scss"

const GranulatedView = (props) => {
  const { type, ...rest } = props
  if (type === enums.IntervalType.Day) return <DailyView {...rest} />
  return <div />
}

const Overview = () => {
  const {
    loading,
    filters: { type }
  } = useSelector((store) => store.overview)

  return (
    <div className="overview">
      <FilterBar />
      <ViewContent className="overview-content" spinning={loading}>
        <GranulatedView type={type} />
      </ViewContent>
    </div>
  )
}

export default Overview
