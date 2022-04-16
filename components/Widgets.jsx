import { Search } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React from 'react';
import Trending from "./Trending";

function Widgets({ trendingResults, followResults }) {
     return (
          <Box
               component="section"
               sx={{
                    display: { xs: "none", lg: "inline" },
                    ml: "32px",
                    width: { xl: "400px" },
                    py: "4px",
                    my: "20px",
               }}
          >
               <Box sx={{ position: "sticky", backgroundColor: "white", top: 0, py: "6px", zIndex: 50, width: { lg: "91%", xl: "75%" } }} >
                    <TextField
                         size="small"
                         placeholder="Search twitter"
                         sx={{ display: "flex", alignItems: "center", width: "100%" }}
                         InputProps={{
                              startAdornment: (
                                   <InputAdornment position="start">
                                        <IconButton>
                                             <Search />
                                        </IconButton>
                                   </InputAdornment>
                              )
                         }}
                    />
               </Box>
               <Box sx={{ my: "12px", pt: "8px", borderRadius: "12px", width: { lg: "91%", xl: "75%" }, border: "1px solid #e0e0ee" }} >
                    <Typography variant='subtitle1' fontSize="large" fontWeight='bold' px={2} component="h4">What's happening</Typography>
                    {trendingResults.map((result, index) => (
                         <Trending key={index} result={result} />
                    ))}
                    <Button fullWidth >
                         Show more
                    </Button>
               </Box>
               <Box sx={{ my: "12px", pt: "8px", borderRadius: "12px", width: { lg: "91%", xl: "75%" }, border: "1px solid #e0e0ee" }} >
                    <Typography variant='subtitle2' fontSize="large" fontWeight='bold' px={2} component="h4">Who to follow</Typography>
                    {
                         followResults.map((result, index) => (
                              <Box
                                   key={index}
                                   px={2}
                                   py={1}
                                   sx={{
                                        cursor: "pointer",
                                        overflow: "hidden",
                                        display: "flex",
                                        alignItems: "center",
                                        transition: "all 0.2s ease-out",
                                        "&:hover": {
                                             backgroundColor: "#eee",
                                             opacity: 0.9,
                                        }
                                   }}
                              >
                                   <Image
                                        src={result.userImg}
                                        width={50}
                                        height={50}
                                        objectFit="cover"
                                        style={{ borderRadius: "100%" }}
                                   />
                                   <Box sx={{ ml: "16px", lineHeight: "20px" }} >
                                        <Typography variant="subtitle2" fontWeight="bold" component="h4">{result.username}</Typography>
                                        <Typography variant="body2" fontWeight="bold" fontStyle="italic" fontSize="small" component="h5">{result.tag}</Typography>
                                   </Box>
                                   <Button variant="text" size="small" sx={{ ml: "auto" }} >Follow</Button>
                              </Box>
                         ))
                    }
                    <Button fullWidth >
                         Show more
                    </Button>
               </Box>
          </Box>
     )
}

export default Widgets