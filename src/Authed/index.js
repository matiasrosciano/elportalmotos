import React, {useState, useEffect} from 'react'
import { withFirebase } from './../Firebase'

const AuthedContext = React.createContext(null)

const withauthed = Component =>{
    const WithAuthed = (props) =>{
        const [AuthUser,SetAuthUser] = useState(null)
    
        useEffect(()=>{
            props.firebase.auth.onAuthStateChanged(authUser =>{
              authUser
                ? SetAuthUser(authUser)
                : SetAuthUser(null)
            })
            console.log('asd')
          })
    
        return( 
            <AuthedContext.Provider value={AuthUser}>
              <Component {...props} />
            </AuthedContext.Provider>
        )
    }
    return withFirebase(WithAuthed)
}

const WithAuthConsumer = AuthedContext.Consumer

export {withauthed,WithAuthConsumer}