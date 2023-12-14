import { Box, Dialog, FormLabel, TextField, Typography } from '@mui/material'
import React from 'react'

const AuthForm = () => {
  return (
    <Dialog open={true}>
        <Typography varient="h4" textAlign={"center"}>
            Login
        </Typography>
        <form>
            <Box display={"flex"} justifyContent={'center'} flexDirection={'column'} width={400} margin={"auto"} alignContent={"center"}>  
                <FormLabel>
                    Email
                </FormLabel>
                <TextField type='email' name='email'/>
                <FormLabel>PassWord</FormLabel>
                <TextField type='password' name='password'/>
            </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm
