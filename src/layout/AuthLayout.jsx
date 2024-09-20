import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <>
        <Typography variant='h2' py={'10px'} textAlign={'center'}>
            Logo
        </Typography>

        <Divider/>

        <Box mt={'20px'}>
            {children}
        </Box>
    </>
  )
}

export default AuthLayout