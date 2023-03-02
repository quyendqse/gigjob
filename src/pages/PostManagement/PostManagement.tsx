import { Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import DataContent from "./DataContent";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export interface ListItem {
  title: string;
  company:string;
  city:string;
  createDate :string;
  closeDate: String;
  salary: string
}

const listItem: ListItem[] = [
  {
    title: 'Remote senior java...',
    company: 'The company',
    city: 'Ho chi minh',
    createDate: 'Opened on Jan 15th, 2023',
    closeDate: 'Close on mar 15th, 2023', 
    salary: 'Salary:30000/hour',

  },
  {
    title: 'Remote senior Python...',
    company: 'The company',
    city: 'Hai Phong',
    createDate: 'Opened on Jan 15th, 2023',
    closeDate: 'Close on mar 15th, 2023',
    salary: 'Salary:25000/hour',
  },
  {
    title: 'Remote senior C#...',
    company: 'The company',
    city: 'Da nang',
    createDate: 'Opened on Jan 15th, 2023',
    closeDate: 'Close on mar 15th, 2023',
    salary: 'Salary:50000/hour',
  },

];

const PostManagement = () => {
  const [dataView, setDataview] = useState()

  const handleOnclick = (id: string) => {
    const r: any  = listItem.filter((i) => i.title === id)
    if(r.length > 0){
      setDataview(r[0])
    }
  }
  return (
    <Grid container spacing={2} >
      <Grid item xs={11}>
        <Typography variant="h2"> Job post </Typography>
      </Grid>
      <Grid item xs={1}>
        <img
          src="/assets/logo2.png"
          style={{ width: "69px", height: "69px", marginTop: "-50px" }}
        />
      </Grid>
   <Grid container spacing={2} sx={{mt:'20px', ml:'20px'}}> 
      <Grid item xs={4}sx={{width:'100%', backgroundColor:'grey',height:'100%', borderRadius:'15px' }} > 
      <Box > 
        <Box sx={{display:'flex', justifyContent:'space-evenly', color:'white'}}>
          <Typography variant="h3"> All post </Typography>
          <Button sx={{color:'wheat'}}>
          <AddCircleOutlineIcon/> <Typography variant="h3" sx={{ml:'10px'}}> New Post </Typography> </Button>
        </Box>
     
        </Box>
        <List> 
         {listItem.map((ite)=> ( 
          <ListItemButton onClick={() => handleOnclick(ite.title)}> 
          <ListItemText sx={{color:'white', padding:'5px'}}>
          <Typography variant="h1" sx={{fontSize:'25px'}}> 
           {ite.title} 
           </Typography>
           <Typography> 
           {ite.company}
           </Typography>
           <Typography> 
           {ite.city}
           </Typography>
           <Typography> 
           {ite.createDate}
           </Typography>
           <Typography> 
           {ite.closeDate}
           </Typography>
           <Divider  color="white" sx={{mt:'10px'}}/>
           </ListItemText>        
           </ListItemButton>
       ))} </List>
      </Grid>

       <Grid item xs={1}> </Grid>
      <Grid item xs={7}> <DataContent dataView={dataView}/>  </Grid>
      </Grid>
    </Grid>
  );
};

export default PostManagement;
