import { ListMovies } from "../../components/organisms/ListMovies";
import { Header } from "../organisms/header";
import { Footer } from "../organisms/footer";

export const HomePage = () => {

  return (
    <>
      <Header></Header>
      <ListMovies isLandingPage={false}></ListMovies>
      <Footer></Footer>
    </>
  );
};