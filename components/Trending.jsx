import { More } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import Image from "next/image"
import React from 'react'

function Trending({ result }) {
     return (
          <Box px={2} py={1}
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
               <Box sx={{ my: "2px" }}>
                    <Typography variant="subtitle2" fontWeight="bold" component="p">{result.heading}</Typography>
                    <Typography sx={{ maxWidth: "250px" }} fontSize="small" fontWeight="600" variant="body1" component="h6">{result.description}</Typography>
                    <Typography sx={{ maxWidth: "250px" }} variant="body2" fontWeight="500" fontStyle="italic" fontSize="small" component="p">Trending with{" "}
                         {result.tags.map((tag, index) => (
                              <span className="tag" key={index}>
                                   {tag}
                              </span>
                         ))}
                    </Typography>
               </Box>

               {result.img ? (
                    <Image
                         src={result.img}
                         width={70}
                         height={70}
                         objectFit="cover"
                         style={{ borderRadius: "16px" }}
                    />
               ) : (
                    <IconButton>
                         <More />
                    </IconButton>
               )}
          </Box>

     )
}

export default Trending