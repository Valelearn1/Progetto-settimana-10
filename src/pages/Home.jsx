import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="home">
      <h1 className="app-title">Breezy</h1>
      <p className="home-subtitle">Check the atmosphere before you head out.</p>
      <SearchBar />
    </div>
  );
};

export default Home;
