import FilterBar from "../components/FilterBar"
import { useSelector } from "react-redux"
import ViewContent from "../layouts/ViewContent"

const Overview = () => {
  const { loading } = useSelector((store) => store.overview)

  return (
    <div className="overview">
      <FilterBar />
      <ViewContent className="overview-content" spinning={loading}>
        <p>Hello!</p>
      </ViewContent>
    </div>
  )
}

export default Overview
