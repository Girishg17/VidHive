import React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos = ({ videos }) => {
  console.log(videos);
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
      {videos[0].map((item, idx) => (
        <Box key={idx}>
          {item.id && item.id.videoId && <VideoCard video={item} />}
          {item.id && item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
