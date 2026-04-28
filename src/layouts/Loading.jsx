import React from "react"
import { Box, CircularProgress } from "@mui/material"

export default function Loading(){
    return(
    <Box display="flex" justifyContent="center" my={6}>
        <CircularProgress />
    </Box>
    )
}