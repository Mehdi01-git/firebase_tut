import { useEffect, useState } from "react";
import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOnxyi6etkeQT1rExvIR1_fc4LPcJFxYY",
  authDomain: "fir-tut-6fa08.firebaseapp.com",
  projectId: "fir-tut-6fa08",
  storageBucket: "fir-tut-6fa08.appspot.com",
  messagingSenderId: "852473750102",
  appId: "1:852473750102:web:74baa0615c08f1fa9c11f7",
  measurementId: "G-9NBET26D11",
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  return <div className="App">{user ? <Home /> : <SignIn />}</div>;
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}
function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function Home() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const usersCollectionRef = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    getUsers();
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = {
      age: age + 1,
    };
    await updateDoc(userDoc, newFields);
    getUsers();
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getDocs();
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [usersCollectionRef]);
  return (
    <div>
      <SignOut />
      <input
        placeholder="Name..."
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(e) => setNewAge(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user, i) => {
        return (
          <div key={i}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={() => updateUser(user.id, user.age)}>
              Increase Age
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
