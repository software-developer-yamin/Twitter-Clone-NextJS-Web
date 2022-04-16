import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import { Box, IconButton, Typography } from '@mui/material';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import FeedInput from './FeedInput';
import FeedPost from './FeedPost';

function Feed() {
     const [posts, setPosts] = useState([]);


     useEffect(() => {
          onSnapshot(
               query(collection(db, "posts"), orderBy("timestamp", "desc")),
               (snapshot) => {
                    setPosts(snapshot.docs);
               }
          )
     }, [db]);


     return (
          <Box
               sx={{
                    maxWidth: "800px",
                    marginLeft: { xl: "370px", sm: "80px", xs: "0px" },
                    flexGrow: 1,
               }}
               borderLeft="1px solid #e0e0e0"
               borderRight="1px solid #e0e0e0"
               component="section"
          >
               <Box
                    sx={{
                         display: "flex",

                         alignItems: "center",
                         justifyContent: { sm: "space-between" },
                         position: "sticky",
                         top: 0,
                         zIndex: 50,
                         borderBottom: "0.5px solid #e0e0e0",
                         py: "8px",
                         px: "12px",
                         backgroundColor: "white",
                    }}
               >
                    <Typography sx={{ fontSize: { xs: '18px', sm: '20px' } }} variant="subtitle1" component="h1" fontWeight="500" >Home</Typography>
                    <IconButton sx={{ marginLeft: "auto" }} >
                         <PhotoFilterIcon color="black" />
                    </IconButton>
               </Box>
               <FeedInput />
               <Box sx={{ pb: "288px" }} >
                    {posts.map((post) => (
                         <FeedPost key={post.id} id={post.id} post={post.data()} />
                    ))}
               </Box>
          </Box>
     )
}

export default Feed;