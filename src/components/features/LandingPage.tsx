import { ListMovies } from "../../components/organisms/ListMovies";
import { Header } from "../organisms/header";
import { Footer } from "../organisms/footer";



export const LandingPage = () => {

  return (
    <>
      <Header></Header>
      <ListMovies isLandingPage={true}></ListMovies>
      <Footer></Footer>
    </>
    );
};