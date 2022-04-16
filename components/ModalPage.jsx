import {
     addDoc,
     collection,
     doc,
     onSnapshot,
     serverTimestamp
} from "@firebase/firestore";
import { Chair, Message, Share, ThumbUp } from "@mui/icons-material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Avatar, Box, Button, IconButton, Modal, TextareaAutosize, Typography } from '@mui/material';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from 'react';
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";

const styles = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 500,
     bgcolor: 'background.paper',
     border: '2px solid gray',
     outline: 'none',
     boxShadow: 24,
     p: 1,
     borderRadius: 3,
};



export default function ModalPage() {
     const { data: session } = useSession();
     const [isOpen, setIsOpen] = useRecoilState(modalState);
     const [postId, setPostId] = useRecoilState(postIdState);
     const [post, setPost] = useState();
     const commentRef = React.useRef();
     const router = useRouter();

     useEffect(
          () =>
               onSnapshot(doc(db, "posts", postId), (snapshot) => {
                    setPost(snapshot.data());
               }),
          [db]
     );

     const sendComment = async (e) => {
          e.preventDefault();

          console.log(commentRef.current.value);

          await addDoc(collection(db, "posts", postId, "comments"), {
               comment: commentRef.current.value,
               username: session.user.name,
               tag: session.user.tag,
               userImg: session.user.image,
               timestamp: serverTimestamp(),
          });

          setIsOpen(false);
          commentRef.current.value = "";

          router.push(`/${postId}`);
     };

     return (
          <>
               <Modal
                    open={() => isOpen}
                    onClose={() => setIsOpen(!isOpen)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
               >

                    <Box component="main" sx={styles}>
                         <IconButton onClick={() => setIsOpen(false)} sx={{ mb: "4px" }} >
                              <CloseRoundedIcon />
                         </IconButton>
                         <Box component="header" sx={{ display: "flex", px: { xs: 2, sm: 3 }, pt: "18px", pb: "10px", borderTop: "2px solid #eee", borderBottom: "1px solid #e0e0e0" }} >
                              <Box sx={{ display: "flex", columnGap: "12px", position: "relative" }} >
                                   <Avatar src={post?.userImg} alt="" />
                                   <Box>
                                        <Typography>
                                             <Typography fontWeight="700" variant="subtitle2" component="span" >{post?.username}</Typography>{" || "}
                                             <Typography variant="subtitle2" fontStyle="italic" fontSize="small" fontWeight="bold" component="span" >@{post?.tag}</Typography>{" || "}
                                             <Typography variant="body1" fontSize="small" component="span" >
                                                  <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                                             </Typography>
                                        </Typography>
                                        <Typography variant="body2" component="p" >{post?.text}</Typography>
                                   </Box>
                              </Box>
                         </Box>
                         <Box component="footer" sx={{ display: "flex", flexDirection: "column", mx: 3, mt: 2, width: "92%" }}>
                              <Box sx={{ display: "flex" }} >
                                   <Avatar src={session.user.image} alt="" />
                                   <TextareaAutosize
                                        minRows={2}
                                        ref={commentRef}
                                        placeholder="Tweet your reply"
                                        style={{ backgroundColor: "transparent", outline: "none", fontSize: "16px", fontWeight: "500", minHeight: "60px", overflow: "hidden", border: "none", paddingLeft: "12px", width: "100%", }}
                                   />
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 1 }} >
                                   <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <IconButton>
                                             <ThumbUp />
                                        </IconButton>
                                        <IconButton>
                                             <Share />
                                        </IconButton>
                                        <IconButton>
                                             <Message />
                                        </IconButton>
                                        <IconButton>
                                             <Chair />
                                        </IconButton>
                                   </Box>
                                   <Button sx={{ borderRadius: "20px" }} onClick={sendComment}>Reply</Button>
                              </Box>
                         </Box>
                    </Box>
               </Modal>
          </>
     );
}
