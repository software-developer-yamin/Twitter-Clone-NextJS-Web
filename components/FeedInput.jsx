import {
     addDoc,
     collection,
     doc,
     serverTimestamp,
     updateDoc
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { BarChartOutlined, CalendarMonthRounded, Close, EmojiEmotionsOutlined, GifBoxOutlined, PhotoOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { signOut, useSession } from "next-auth/react";
import React, { useRef, useState } from 'react';
import { db, storage } from "../firebase";


function FeedInput() {
     const { data: session } = useSession();
     const [input, setInput] = useState("");
     const [loading, setLoading] = useState(false);
     const [selectedFile, setSelectedFile] = useState(null);
     const filePickerRef = useRef(null);
     const [showEmojis, setShowEmojis] = useState(false);

     const sendPost = async () => {
          if (loading) return;
          setLoading(true);
          const docRef = await addDoc(collection(db, "posts"), {
               id: session.user.uid,
               username: session.user.name,
               userImg: session.user.image,
               tag: session.user.tag,
               text: input,
               timestamp: serverTimestamp(),
          });
          const imageRef = ref(storage, `posts/${docRef.id}/image`);
          if (selectedFile) {
               await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "posts", docRef.id), {
                         image: downloadURL,
                    });
               });
          }
          setLoading(false);
          setInput("");
          setSelectedFile(null);
          setShowEmojis(false);
     };

     const addImageToPost = (e) => {
          const reader = new FileReader();
          if (e.target.files[0]) {
               reader.readAsDataURL(e.target.files[0]);
          }
          reader.onload = (readerEvent) => {
               setSelectedFile(readerEvent.target.result);
          };
     };

     const addEmoji = (e) => {
          let sym = e.unified.split("-");
          let codesArray = [];
          sym.forEach((el) => codesArray.push("0x" + el));
          let emoji = String.fromCodePoint(...codesArray);
          setInput(input + emoji);
     };

     return (
          <Box
               sx={{ borderBottom: "1px solid #e0e0e0", display: "flex", flex: 1, p: "12px", opacity: loading ? 0.5 : 1, }}
          >
               <Avatar onClick={signOut} src={session.user.image} alt="" fontSize="large" mt="auto" sx={{ "&:hover": { opacity: 0.8, cursor: "pointer" } }} />
               <Box
                    sx={{ borderTop: "1px solid #e0e0e0", borderBottom: "1px solid #e0e0e0", width: "100%", ml: { xs: "6px", sm: "10px" }, overflow: "hidden" }}
               >
                    <Box>
                         <TextareaAutosize
                              minRows={2}
                              aria-label="maximum height"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              placeholder="What's happening?"
                              style={{ backgroundColor: "transparent", outline: "none", fontSize: "18px", fontWeight: "500", minHeight: "60px", overflow: "hidden", border: "none", paddingLeft: "6px", width: "100%", minWidth: "200px" }}
                         />
                         {
                              selectedFile && (
                                   <Box position="relative">
                                        <IconButton
                                             onClick={() => setSelectedFile(null)}
                                             sx={{
                                                  position: "absolute",
                                                  top: "4px",
                                                  left: "4px",
                                             }}
                                        >
                                             <Close sx={{ color: "white" }} />
                                        </IconButton>
                                        <img
                                             src={selectedFile}
                                             alt="selected file"
                                             style={{ borderRadius: "16px", maxHeight: "320px", objectFit: "contain" }}
                                        />
                                   </Box>
                              )
                         }
                    </Box>
                    {!loading && (
                         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: "10px", mb: "4px" }} >
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                   <IconButton
                                        onClick={() => filePickerRef.current.click()}
                                        sx={{ mr: "6px" }}
                                   >
                                        <PhotoOutlined color="mainIconColor" />
                                        <input
                                             type="file"
                                             ref={filePickerRef}
                                             hidden
                                             onChange={addImageToPost}
                                        />
                                   </IconButton>
                                   <IconButton
                                        onClick={() => setShowEmojis(!showEmojis)}
                                        sx={{ mr: "6px" }}
                                   >
                                        <EmojiEmotionsOutlined color="mainIconColor" />
                                   </IconButton>
                                   <IconButton sx={{ mr: "6px" }} >
                                        <CalendarMonthRounded color="white" sx={{ color: "#1d9bf0" }} />
                                   </IconButton>
                                   <IconButton sx={{ mr: "6px" }} >
                                        <GifBoxOutlined color="mainIconColor" />
                                   </IconButton>
                                   <IconButton>
                                        <BarChartOutlined color="mainIconColor" />
                                   </IconButton>
                                   {showEmojis && (

                                        <Picker
                                             onSelect={addEmoji}
                                             style={{ position: "absolute", marginTop: "465px", marginLeft: -40, maxWidth: "320px", borderRadius: "20px", zIndex: "999", }}
                                             theme="dark"
                                        />
                                   )}
                              </Box>
                              <Button
                                   disabled={!input && !selectedFile}
                                   onClick={sendPost}
                                   sx={{
                                        backgroundColor: "#1A8CD8", color: "white", borderRadius: "80px", textTransform: "lowercase", letterSpacing: "0.8px", fontSize: "18px", fontWeight: "bold",
                                        "&:hover": {
                                             backgroundColor: "#1A8CD8",
                                             color: "white",
                                        },
                                        "&:disabled": {
                                             backgroundColor: "#8ECDF8",
                                             color: "white",
                                        }
                                   }}
                                   variant="contained"
                              >
                                   Tweet
                              </Button>
                         </Box>
                    )}
               </Box>
          </Box>
     )
}

export default FeedInput