import { BookmarkBorderRounded, HomeRounded, ListAltRounded, MailOutlineRounded, MoreHoriz, NotificationsNoneRounded, PermIdentityRounded, TagRounded, Twitter } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import SidebarItem from './SidebarItem';
import { signOut, useSession } from "next-auth/react";

function Sidebar() {
     const { data: session } = useSession();

     return (
          <Box
               sx={{
                    display: { xs: "none", sm: "flex" },
                    alignItems: { xs: "center", xl: 'flex-start' },
                    justifyContent: "center",
                    width: { xs: "80px", xl: "340px" },
                    height: '100%',
                    flexDirection: "column",
                    position: "fixed",
                    padding: "8px",
               }}
               component="section"
          >
               <IconButton component="div" color="twitterColor" sx={{ marginLeft: { xl: "102px" }, }} >
                    <Twitter fontSize='large' />
               </IconButton>
               <Box
                    sx={{
                         marginLeft: { xl: "96px" },
                         marginTop: '16px',
                         marginBottom: '10px',
                    }}
               >
                    <SidebarItem Icon={HomeRounded} title="Home" active />
                    <SidebarItem Icon={TagRounded} title="Explore" />
                    <SidebarItem Icon={NotificationsNoneRounded} title="Notifications" />
                    <SidebarItem Icon={MailOutlineRounded} title="Messages" />
                    <SidebarItem Icon={BookmarkBorderRounded} title="Bookmarks" />
                    <SidebarItem Icon={ListAltRounded} title="Lists" />
                    <SidebarItem Icon={PermIdentityRounded} title="Profile" />
                    <SidebarItem Icon={MoreHoriz} title="More" />
               </Box>
               <Button
                    sx={{
                         display: { xs: "none", xl: "inline" },
                         marginLeft: { xl: "96px" },
                         width: "224px",
                         height: "52px",
                         borderRadius: "50px",
                    }}
                    variant="contained"
                    ml="auto"
                    my={1.5}
               >
                    Tweet
               </Button>
               <Box
                    sx={{
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         marginLeft: { xl: "auto" },
                         transition: "all 0.4s ease-in-out",
                         p: { xl: "12px 24px"},
                         cursor: "pointer",
                         "&:hover": {
                              backgroundColor: "#E7E7E8",
                              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
                         }
                    }}
                    component="footer"
                    mt="auto"
                    borderRadius={10}
                    onClick={() => signOut()}
               >

                    <Avatar
                         src={session.user.image}
                         alt=""
                    />
                    <Box ml={2} sx={{ display: { xs: "none", xl: "inline" } }} >
                         <Typography variant="subtitle1" fontWeight="800" component="h4">{session.user.name}</Typography>
                         <Typography variant="body2" color="gray" fontWeight="bold" component="p">@{session.user.tag}</Typography>
                    </Box>
                    <MoreHoriz sx={{ display: { xs: "none", xl: "inline", color: "gray" }, marginLeft: "12px" }} />
               </Box>
          </Box>
     )
}

export default Sidebar;