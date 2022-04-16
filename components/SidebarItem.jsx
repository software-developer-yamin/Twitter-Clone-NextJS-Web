import { Box, Typography } from "@mui/material";

function SidebarItem({ Icon, title, active }) {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: { xs: "center", xl: "flex-start" },
      alignItems: "center",
      transition: "all 0.4s ease-in-out",
      py: { xs: "8px", xl: "12px" },
      px: { xs: "12px", xl: "16px" },
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#E7E7E8",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
      }
    }} borderRadius={8}>
      <Icon color="mainIconColor" sx={{fontSize:{xl:30,sm:40}}}   fontWeight="500" />
      <Typography variant="subtitle1"  fontWeight={active ? "500" : "400"} ml={2}  sx={{ display: { xs: "none", xl: "inline-flex" } }} component="span" >{title}</Typography>
    </Box>
  )
}

export default SidebarItem