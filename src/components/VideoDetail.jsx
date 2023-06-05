import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Typography, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos2 } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideo(data.items[0])
    );
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setRelatedVideos(data.items)
    );
  }, [id]);

  if (!video?.snippet) return <div>Loading...</div>;

  const {
    snippet: { channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = video;

  return (
    <Box minHeight="95vh" sx={{ paddingBottom: "100px" }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px", zIndex: 1 }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Box p={1}>
              <Typography color="#ffff" variant="h7" fontWeight="bold">
                {video?.snippet?.title}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ color: "#ffff", opacity: 0.7 }}
              >
                <Link to={`/channel/${channelId}`}>
                  <Typography variant=  "h8"  color="#ffff">
                    {channelTitle}
                    <CheckCircle sx={{ fontSize: "10px", color: "gray", ml: "5px" }} />
                  </Typography>
                </Link>
                <Stack direction="row" gap="10px" alignItems="center">
                  <Typography variant="body1">
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                  <Typography variant="body1">
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos2 videos={relatedVideos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
