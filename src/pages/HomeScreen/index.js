import CardCatalog from "../../components/Catalog"
import Header from "../../components/Header"
import SearchBar from "../../components/Header/SearchBar"

export default function HomeScreen({ navigation }) {
  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <CardCatalog />
    </>
  )
}
