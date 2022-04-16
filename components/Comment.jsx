import { MoreHoriz, Share, MarkChatUnreadOutlined, FavoriteBorder, DataSaverOnOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import Moment from 'react-moment';

function CommentPage({ comment }) {
     return (
          <Box sx={{ p: "12px", display: "flex", flexDirection: "column", borderBottom: "1px solid #e0e0e0", cursor: "pointer" }} >
               <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 2 }} >
                    <Avatar src={comment?.userImg} alt="comment" />
                    <Box ml={1}>
                         <Typography fontWeight="700" variant="subtitle2" component="span" >{comment?.username}</Typography>{" . "}
                         <Typography variant="subtitle2" fontStyle="italic" fontSize="small" fontWeight="bold" component="span" >@{comment?.tag}</Typography>{" . "}
                         <Typography variant="body1" fontSize="small" component="span" >
                              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                         </Typography>
                         <Typography variant="subtitle2" component="p" >{comment?.comment}</Typography>
                    </Box>
                    <IconButton sx={{ ml: "auto" }}>
                         <MoreHoriz />
                    </IconButton>
               </Box>
               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <IconButton
                         color="mainIconColor"
                    >
                         <MarkChatUnreadOutlined />
                    </IconButton>
                    <IconButton color="secondary" >
                         <Share />
                    </IconButton>
                    <IconButton color="likeIconColor" >
                         <FavoriteBorder />
                    </IconButton>
                    <IconButton color="mainIconColor" >
                         <DataSaverOnOutlined />
                    </IconButton>
               </Box>
          </Box>
     )
}

export default CommentPage;