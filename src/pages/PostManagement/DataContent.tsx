import { List, ListItem, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostOption from './PostOption';

export type props = {
    dataView: any,
}

const DataContent = ({dataView}: props) => {
  return (
    <Box sx={{height:'100%', width:'80%', backgroundColor:'grey', borderRadius:'15px',}}>  
<List sx={{display:'flex'}}>   
      <ListItemText sx={{color:'white', padding:'30px'}}> 
      <Typography variant="h1" sx={{fontSize:'25px'}}>
        {dataView?.title}
        </Typography>
        <Typography variant='h1' sx={{fontSize:'20px'}}>
        {dataView?.company}
        </Typography>
        <Typography variant='h2'>
        {dataView?.city}
        </Typography>
        <Typography variant='h2'>
        {dataView?.salary}
        </Typography>
        </ListItemText>
        <PostOption/>
        </List>
    </Box>
  )
}

export default DataContent