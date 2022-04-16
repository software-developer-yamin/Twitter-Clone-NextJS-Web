import {
     collection,
     deleteDoc,
     doc,
     onSnapshot,
     orderBy,
     query,
     setDoc
} from "@firebase/firestore";
import { DataSaverOnOutlined, DeleteOutlined, Favorite, FavoriteBorder, MarkChatUnreadOutlined, MoreHoriz, Share } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";


function FeedPost({ id, post, postPage }) {
     const { data: session } = useSession();
     const [isOpen, setIsOpen] = useRecoilState(modalState);
     const [postId, setPostId] = useRecoilState(postIdState);
     const [comments, setComments] = useState(["eoir", "ajoe", 4]);
     const [likes, setLikes] = useState([1, 1, 1]);
     const [liked, setLiked] = useState(false);
     const router = useRouter();

     useEffect(
          () =>
               onSnapshot(
                    query(
                         collection(db, "posts", id, "comments"),
                         orderBy("timestamp", "desc")
                    ),
                    (snapshot) => setComments(snapshot.docs)
               ),
          [db, id]
     );

     useEffect(
          () =>
               onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
                    setLikes(snapshot.docs)
               ),
          [db, id]
     );

     useEffect(
          () =>
               setLiked(
                    likes.findIndex((like) => like.id === session?.user?.uid) !== -1
               ),
          [likes]
     );

     const likePost = async () => {
          if (liked) {
               await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
          } else {
               await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                    username: session.user.name,
               });
          }
     };

     return (
          <Box
               sx={{
                    p: "12px",
                    display: "flex",
                    borderBottom: "1px solid #e0e0e0",
               }}
               onClick={() => router.push(`/${id}`)}
               component="section"
          >
               {!postPage && (
                    <Avatar
                         src={post?.userImg}
                         alt=""
                         sx={{ mr: "16px", mt: "12px" }}
                    />
               )}

               <Box sx={{ display: "flex", flexDirection: "column", my: "8px", width: "100%" }} >
                    <Box component="header" sx={[{ display: "flex" }, !postPage && { justifyContent: "space-between" }]} >
                         {postPage && (
                              <Avatar
                                   src={post?.userImg}
                                   alt="Profile Pic"
                                   sx={{ mr: "16px", mt: "12px" }}
                              />
                         )}
                         <Box>
                              <Box sx={{ display: "inline-block" }} >
                                   <Typography sx={[!postPage && { display: "inline-block" }]} variant="subtitle2" component={"h4"}>{post?.username}</Typography>
                                   <Typography sx={[!postPage && { ml: "6px" }]} variant="body2" component={"span"}>@{post?.tag}</Typography>
                              </Box>
                              {" "}·{" "}
                              <Typography variant="body2" component="span" >
                                   <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                              </Typography>
                              {!postPage && (
                                   <Typography sx={{ mt: "2px" }} variant="body2" component="p">
                                        {post?.text}
                                   </Typography>
                              )}
                         </Box>
                         <Box sx={{ display: "flex", ml: "auto", flexShrink: 0, alignItems: "center", justifyContent: "center", mb: "10px" }} >
                              <IconButton  >
                                   <MoreHoriz />
                              </IconButton>
                         </Box>
                    </Box>
                    {postPage && (
                         <Typography sx={{ my: "4px" }} variant="body2" component="p">{post?.text}</Typography>
                    )}
                    {post?.image && (
                         <Image
                              src={post.image}
                              height={500}
                              width={500}
                              layout='responsive'
                              objectFit="cover"
                              alt=""
                              style={{ borderRadius: "30px" }}
                         />
                    )}
                    <Box component={"footer"} sx={[{ display: "flex", justifyContent: "space-between", width: "83%", mt: "6px" }, !postPage && { mx: "auto" }]}  >
                         <Box sx={{ display: "flex", alignItems: "center", mx: "auto" }} >
                              <IconButton
                                   onClick={(e) => {
                                        e.stopPropagation();
                                        setPostId(id);
                                        setIsOpen(true);
                                   }}
                                   color="mainIconColor"
                              >
                                   <MarkChatUnreadOutlined />
                              </IconButton>
                         </Box>

                         {session.user.uid === post?.id ? (
                              <Box
                                   onClick={(e) => {
                                        e.stopPropagation();
                                        deleteDoc(doc(db, "posts", id));
                                        router.push("/");
                                   }}
                                   sx={{ display: "flex", alignItems: "center", mx: "4px" }}>
                                   <IconButton color="error">
                                        <DeleteOutlined />
                                   </IconButton>
                              </Box>
                         ) : (
                              <Box sx={{ display: "flex", alignItems: "center", mx: "4px" }}>
                                   <IconButton color="secondary" >
                                        <Share />
                                   </IconButton>
                              </Box>
                         )}

                         <Box
                              onClick={(e) => {
                                   e.stopPropagation();
                                   likePost();
                              }}
                              sx={{ display: "flex", alignItems: "center", mx: 'auto' }} >
                              {liked ? (
                                   <IconButton color="likeIconColor" >
                                        <Favorite />
                                   </IconButton>
                              ) : (
                                   <IconButton color="likeIconColor" >
                                        <FavoriteBorder />
                                   </IconButton>
                              )}
                         </Box>
                         <IconButton color="mainIconColor" >
                              <DataSaverOnOutlined />
                         </IconButton>
                    </Box>
               </Box>
          </Box>
     )
}

export default FeedPost;