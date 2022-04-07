import DateSelect from "./DateSelect"
import { Layout } from "antd"
import "./styles.scss"

const { Header } = Layout

const FilterBar = () => {
  return (
    <Header className="overview-header">
      <DateSelect />
    </Header>
  )
}

export default FilterBar
