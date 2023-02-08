import { Box, styled, SxProps, Theme } from '@mui/material'; 
import { executeReducerBuilderCallback } from '@reduxjs/toolkit/dist/mapBuilders';

 export const Dividers = styled('div')(({ theme }) => ({
    width: '300px',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  })); 
  export const Root = { 
    display:'flex'
  }