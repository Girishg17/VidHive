import React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos2 = ({ videos,direction }) => {
  console.log(videos);
  return (
    <Stack direction={direction||'row'} flexWrap="wrap" justifyContent="start" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id && item.id.videoId && <VideoCard video={item} />}
          {item.id && item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos2;
