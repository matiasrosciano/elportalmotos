import React from 'react'
import Paper from '@material-ui/core/Paper'
import background from './../../sources/background.jpg'


const HomeSection = () =>(
     <Paper 
        style={styles.paperContainer}
     />
)

const styles = {
    paperContainer: {
        backgroundImage: `url(${background})`,
        height: '100vh',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
};

export default HomeSection