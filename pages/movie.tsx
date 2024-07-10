import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const OMDB_API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const { s, i } = query;

  let url = `${OMDB_API_URL}`;
  if (s) url += `&s=${s}`;
  if (i) url += `&i=${i}&plot=full`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from OMDB API" });
  }
}
