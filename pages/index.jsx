import { Box } from "@mui/material";
import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Login from "../components/Login";
import ModalPage from "../components/ModalPage";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { followResults, trendingResults } from "../data";


export default function Home({ providers }) {
     const [isOpen, setIsOpen] = useRecoilState(modalState);
     const { data: session } = useSession();

     if (!session) return <Login providers={providers} />;

     return (
          <Box component="section" >
               <Head>
                    <title>Twitter Clone</title>
                    <link rel="icon" href="/favicon.ico" />
               </Head>

               <Box display="flex" minHeight="100vh" maxWidth="1500px" mx="auto" component="main">
                    <Sidebar />
                    <Feed />
                    <Widgets
                         trendingResults={trendingResults}
                         followResults={followResults}
                    />

                    {isOpen && <ModalPage />}
               </Box>
          </Box>
     );
};



export async function getServerSideProps(context) {
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
