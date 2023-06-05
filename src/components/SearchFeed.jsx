import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
// import SideBar from './SideBar';
// import Videos from './Videos';
import { useParams } from "react-router-dom";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
const SearchFeed = () => {
 
  const [videos, setVideos] = useState([]);
  const { searchterm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchterm}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchterm]);
  return (
    <Box p={2} sx={{ overflow: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results For: <span style={{ color: "#F31503" }}>{searchterm}</span>
      </Typography>
      <Videos videos={[videos]} />
    </Box>
  );
};

export default SearchFeed;
