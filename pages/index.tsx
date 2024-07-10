import { useState, useEffect } from "react";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";

import {
  Container,
  Text,
  Card,
  Image,
  Loader,
  Modal,
  Button,
  TextInput,
} from "@mantine/core";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const initialUrl = `http://www.omdbapi.com/?apikey=${API_KEY}&type=movie`;

const Home = () => {
  interface Movie {
    imdbID: string;
    Title: string;
    Poster: string;
    Rated: string; // Add Rated property
    Released: string; // Add Released property
    Runtime: string; // Add Runtime property
  }

  const [movies, setMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(initialUrl);
      setMovies(response.data.Search || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${initialUrl}&s=${searchTerm}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
        setNoResults(false);
      } else {
        setMovies([]);
        setNoResults(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setMovies([]);
    setNoResults(false);
  };

  const handleDetail = async (movieId: string) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}&plot=full`
      );
      setSelectedMovie(response.data);
      open();
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };
  //
  return (
    <Container size="md">
      <Text align="center" size="xl" style={{ marginBottom: "1rem" }}>
        Search Movies
      </Text>
      <TextInput
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="(Ex.Marvel Batman  )"
        style={{ marginBottom: "1rem" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <Button style={{ marginRight: "1rem" }} onClick={handleSearch}>
          Search
        </Button>
        <Button variant="filled" color="red" onClick={handleReset}>
          Reset
        </Button>
      </div>
      {loading ? (
        <div
          style={{
            display: "block",
            margin: "0 auto",
            marginTop: "5px",
            textAlign: "center",
          }}
        >
          <Loader />
        </div>
      ) : noResults ? (
        <Text align="center" style={{ marginTop: "1rem" }}>
          No results found
        </Text>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {movies.map((movie) => (
            <Card key={movie.imdbID}>
              <Image src={movie.Poster} alt={movie.Title} />
              <div
                style={{
                  display: "block",
                  margin: "0 auto",
                  marginTop: "5px",
                  textAlign: "center",
                }}
              >
                <h4>{movie.Title}</h4>
              </div>
              <Button
                variant="gradient"
                gradient={{ from: "grape", to: "pink", deg: 90 }}
                style={{
                  display: "block",
                  margin: "0 auto",
                  marginTop: "5px",
                }}
                onClick={() => handleDetail(movie.imdbID)}
              >
                Detail
              </Button>
            </Card>
          ))}
        </div>
      )}
      <Modal opened={opened} onClose={close} title={selectedMovie?.Title || ""}>
        {selectedMovie && (
          <div>
            <Text align="center">
              Rated: {selectedMovie.Rated}
              <br />
              Released: {selectedMovie.Released}
              <br />
              Runtime: {selectedMovie.Runtime}
            </Text>
          </div>
        )}
      </Modal>
    </Container>
  );
};
export default Home;
