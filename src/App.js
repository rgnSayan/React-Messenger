import React, { useState, useEffect } from 'react'
import './App.css';
import { Input, FormControl, IconButton } from '@material-ui/core'
import Message from './Message';
import db from './firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessage] = useState([])

  const [username, setUsername] = useState(' ')

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessage(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() }))
      )
    })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please Enter Your Name '))
  }, [])

  const submitHandler = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setMessage([...messages, { username: username, text: input }])
    setInput('')
  }

  return (
    <div className="App">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/1200px-Facebook_Messenger_logo_2018.svg.png" alt="#" className="image" />

      <h1>Facebook Messenger  💬</h1>
      <h2>Welcome {username} 🙏</h2>
      <form className="app_form">
        <FormControl className="form_control" >
          <Input className="input_box" placeholder="Enter a message" value={input} onChange={e => setInput(e.target.value)} />
          <IconButton className="icon_button" variant="contained" color="primary"
            type="submit" disabled={!input}
            onClick={submitHandler}>
            <SendIcon />
          </IconButton>

        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({ message, id }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
