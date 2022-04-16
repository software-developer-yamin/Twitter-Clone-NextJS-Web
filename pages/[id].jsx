import {
     collection,
     doc,
     onSnapshot,
     orderBy,
     query
} from "@firebase/firestore";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, IconButton, Typography } from "@mui/material";
import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import CommentPage from "../components/Comment";
import Post from "../components/FeedPost";
import ModalPage from "../components/ModalPage";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { db } from "../firebase";

export default function PostPage({ trendingResults, followResults, providers }) {
     const { data: session } = useSession();
     const [post, setPost] = useState();
     const [isOpen, setIsOpen] = useRecoilState(modalState);
     const [comments, setComments] = useState([]);
     const router = useRouter();
     const { id } = router.query;

     useEffect(
          () =>
               onSnapshot(doc(db, "posts", id), (snapshot) => {
                    setPost(snapshot.data());
               }),
          [db]
     );

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

     if (!session) return <Login providers={providers} />;

     return (
          <Box component="section" >
               <Head>
                    <title>
                         {post?.username} on Twitter: "{post?.text}"
                    </title>
                    <link rel="icon" href="/favicon.ico" />
               </Head>
               <Box display="flex" minHeight="100vh" maxWidth="1500px" mx="auto" component="main">
                    <Sidebar />
                    <Box
                         sx={{
                              maxWidth: "672px",
                              marginLeft: { xl: "370px", sm: "80px", xs: "0px" },
                              flexGrow: 1,
                         }}
                         borderLeft="1px solid #e0e0e0"
                         borderRight="1px solid #e0e0e0"
                         component="section"
                    >
                         <Box
                              sx={{
                                   display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #e0e0e0",
                                   py: "8px",
                                   px: "6px",
                                   backgroundColor: "white",
                              }}
                         >
                              <IconButton onClick={() => router.push("/")} sx={{ mr: "15px" }} >
                                   <KeyboardBackspaceIcon fontSize="medium" />
                              </IconButton>
                              <Typography sx={{ fontSize: { xs: '18px', sm: '20px' } }} variant="subtitle2" component="h2" fontWeight="500" >Tweet</Typography>
                         </Box>
                         <Post id={id} post={post} postPage />
                         {comments?.length > 0 && (
                              <Box sx={{ pb: "288px" }}>
                                   {comments?.map((comment) => (
                                        <CommentPage
                                             key={comment.id}
                                             id={comment.id}
                                             comment={comment.data()}
                                        />
                                   ))}
                              </Box>
                         )}
                    </Box>
                    <Widgets
                         trendingResults={trendingResults}
                         followResults={followResults}
                    />
               </Box>
               {isOpen && <ModalPage />}
          </Box>
     )
};

export async function getServerSideProps(context) {
     const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
          (res) => res.json()
     );
     const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
          (res) => res.json()
     );
     const providers = await getProviders();
     const session = await getSession(context);

     return {
          props: {
               trendingResults,
               followResults,
               providers,
               session,
          },
     };
}
