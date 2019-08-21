import React, {useState} from 'react'
import { withFirebase } from './../../Firebase'

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';


const SeccionAbout = (props) =>{
    const [post,SetPost] = useState({
        Title: '',
        Body:''
    })
    
    const handleChange = e =>{
        let newState = {...post}
        newState[e.target.name] = e.target.value
        SetPost(newState)
      }

    const OnSubmit = () =>{
                
    }

    return(
        <div style={styles.SectionContainer}>
            <TextField
                variant="outlined"
                name="Title"
                label="Titulo del post"
                onChange={handleChange}
              />
            <TextareaAutosize
                name="Body"
                rows={10} placeholder="Escribi el post"
                onChange={handleChange}    
            />
            <Button
              variant="contained"
              color="primary"
              onClick={()=>OnSubmit()}
            >
              EnviarPost
            </Button>
        </div>
    )
}

const styles = {
    SectionContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '70vh',
        width: '100%',
        backgoundColor: '#cgcgcg'
    },
};

export default withFirebase(SeccionAbout)