import React from 'react'
import Box from '@material-ui/core/Box';
import HomeSection from './Sections/HomeSection'
import SeccionOfertas from './Sections/SeccionOfertas'
import SeccionAbout from './Sections/SeccionAbout'

const Landing = () =>(
    <Box style={styles.MainSection}>
        <HomeSection/>
        <SeccionOfertas/>
        <SeccionAbout/>            
    </Box>    
)

const styles = {
    MainSection:{
        display:'flex',
        flexDirection:'column'
    }
  };

export default Landing