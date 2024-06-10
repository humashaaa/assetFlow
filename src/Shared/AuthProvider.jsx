import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";

export const AuthContext = createContext(null)
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
   const axiosPublic = useAxiosPublic()
    // create user
    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password )
    }
    // password sign in
    const signIn=(email, password)=>{
        setLoading(true)

        return signInWithEmailAndPassword(auth, email, password)

    }
    // google sign in
    const googleSignIn = ()=>{
        setLoading(true)

        return signInWithPopup(auth, provider)

    }
    // log out
    const logOut = ()=>{
        setLoading(true)
        setUser(null)

        return signOut(auth)

    }

// update profile 
const updateUser = (name, photo)=>{
   return updateProfile(auth.currentUser, {
        displayName: name, 
        photoURL: photo
      })

}



    // manage users
    useEffect(()=>{
        const unSubscribe =  onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
        
                if(currentUser){
                    // get token and store client in local storage
                    const userInfo = {
                        email : currentUser.email
                    }
                    axiosPublic.post('/jwt', userInfo)
                    .then(res=>{
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false)
                        }  
                    })
    
                } 
                else{
                    localStorage.removeItem('access-token')
                    setLoading(false)
                }
              } 
              
            });
            return ()=> unSubscribe()
    },[axiosPublic])
    console.log(user);


    const allInfo={
        user,
        setUser, 
        loading,
        signIn,
        googleSignIn,
        createUser,
        logOut, 
        updateUser



    }

    return (
        <AuthContext.Provider value={allInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;