import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  
  import { useRouter } from 'next/navigation'
  import { createContext, useContext, useEffect, useMemo, useState } from 'react'
  import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Props{
  id: string;
  name: string;
  amount: number;
  expiry: Date;
}
  
  interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    planDetails: Props | null
    error: string | null
    loading: boolean
  }
  
  const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    planDetails: null,
    error: null,
    loading: false,
  })
  
  interface AuthProviderProps {
    children: React.ReactNode
  }
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [planDetails, setPlanDetails] = useState<Props | null>(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()
  
    // Persisting the user
    useEffect(
      () =>
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // Logged in...
            setUser(user)
            fetchSubs(user);
            setLoading(false)
          } else {
            // Not logged in...
            setUser(null)
            setLoading(false)
            router.push('/login')
          }
  
          setInitialLoading(false)
        }),
      [auth])
    
      useEffect(() => {
        if(error!=null){
          setLoading(false)
          setError(null);
        }
      }, [error])

      const fetchSubs = async (userD: User) : Promise<void> => {
              const isSub = await isSubscribed(userD);

          }
  
    const signUp = async (email: string, password: string) => {
      setLoading(true)
  
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user)
          router.push('/')
          setLoading(false)
        })
        .catch((err) => {
          alert(err.message)
          setError(err.message)
        })
        .finally(() => {
          setLoading(false)})
    }
  
    const signIn = async (email: string, password: string) => {
      setLoading(true)
  
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user)
          router.push('/')
          setLoading(false)
        })
        .catch((err) => {
          alert(err.message)
          setError(err.message)
        })
        .finally(() => {
          setLoading(false)})
    }

    const isSubscribed = async (user: User | null) : Promise<boolean | null> => {
      if(user == null) return null;
      const userRef =  doc(db, "subscriptions", user.uid);
      const docSnap = await getDoc(userRef);
      if(!docSnap.exists()) return false;
      else{
        const data = docSnap.data();
        const newdate = new Date().toISOString()
        const expiryDate = data.subscriptionExpiryDate
        if(newdate > expiryDate){
          return false;
        }
        else{
          setPlanDetails({id: data.subscriptionPlanId, name: data.subscriptionPlan, amount: data.subscriptionAmount, expiry: expiryDate})
          return true;
        }
      }
    }
  
    const logout = async () => {
      setLoading(true)
  
      signOut(auth)
        .then(() => {
          setUser(null)
        })
        .catch((err) => {
          alert(err.message)
          setError(err.message)
        })
        .finally(() => {
          setLoading(false)})
    }
  
    const memoedValue = useMemo(
      () => ({
        user,
        signUp,
        signIn,
        logout,
        planDetails,
        loading,
        error,
      }),
      [user, loading]
    )
  
    return (
      <AuthContext.Provider value={memoedValue}>
        {!initialLoading && children}
      </AuthContext.Provider>
    )
  }
  
  export default function useAuth() {
    return useContext(AuthContext)
  }