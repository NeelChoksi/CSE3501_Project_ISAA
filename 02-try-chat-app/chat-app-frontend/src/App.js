import React,{useState,useEffect,useRef} from 'react';
import './App.css';
import {io} from 'socket.io-client';


import CreateUser from './components/CreateUser';
import OnlineUsers from './components/OnlineUsers';
import MessagesControl from './components/MessagesControl';

const socket = io('http://localhost:3040');


function App() {

  const [step,setStep] = useState(0);
  const [username,setUsername] = useState("");
  const [reciever,setReciever] = useState("");
  const [media, setMedia] = useState(null);
  const [users , setUsers] = useState({});
  const [message,setMessage] = useState("");
  const [groupMessage,setGroupMessage] = useState({});
  const recieverRef = useRef(null);

  const sortNames = (username1,username2)=>{
    return [username1,username2].sort().join("-");
  }

  const onCreateUser =()=>{
    // console.log(username)
    socket.emit('new_user',username);
    setStep(prevStep =>(prevStep + 1));
  }

  const onUserSelect = (username)=>{
    setReciever(username);
    recieverRef.current = username;
    setStep(prevStep =>(prevStep + 1))
  }

  const sendMessage = (e)=>{
    e.preventDefault();

    const data = {
      sender : username,
      reciever,
      message,
      media,
      view:false
    }

    socket.emit("send_message",data);

    const key = sortNames(username,reciever);
    const tempGroupMessage= {...groupMessage};
    if(key in tempGroupMessage){
      tempGroupMessage[key]=[...tempGroupMessage[key],{...data,view:true}];
    }else{
      tempGroupMessage[key] =[{...data,view:true}];
    }

    setGroupMessage({...tempGroupMessage});
    console.log({groupMessage});
    // console.log({message}) 

    //hash table: [alice-bob]=>['m1','m2',...]

    // [neel-bob] => [m1,m2,m3,..]
    // [bob-neel] => [m2,m3,m4]
    setMessage('');

  };

  const countUnseenMessages =(reciever)=>{

    const key = sortNames(username,reciever);
    let unseenMessages = []; 
    if(key in groupMessage){
      unseenMessages = groupMessage[key].filter(msg => !msg.view)
    }

    return unseenMessages.length;
  }

  const onChatClose = ()=>{
    setStep(1);
  }

  //check for broadcasted message having list of online users
  useEffect(()=>{
    socket.on("all_users",(users)=>{
      // console.log({users});
      setUsers(users);
    });


    socket.on("new_message",(data)=>{
      // console.log(data);
      setGroupMessage(prevGroupMessage =>{
        const messages = {...prevGroupMessage};
        const key = sortNames(data.sender,data.reciever);
        if (key in messages){
          messages[key] = [...messages[key],data];
        }else{
          messages[key] = [data];
        }
        return {...messages};

      })
    })
  },[]);

  useEffect(()=>{
    //update view count of selected user
    updateMessageView();   
  },[reciever]);

  const updateMessageView = () =>{
    const key = sortNames(username,reciever);
    if(key in groupMessage){
      const messages = groupMessage[key].map(msg => !msg.view? {...msg,view:true}:msg);

      groupMessage[key] = [...messages];

      setGroupMessage({...groupMessage});
    } 
  }

  return (
    <div className="App">
      <header className="app-header">
        ECC -Diffie Hellman
      </header>

      <div className="chat-system">
        <div className="chat-box">
          {/*step1:ask username or email*/}
          {step === 0?(<CreateUser 
            value={username}
            onCreateUser = {onCreateUser}
            onChange = {(e)=> setUsername(e.target.value)}
           />):null}
          {/*step2:show available users*/}
          { step === 1 ? (<OnlineUsers 
            users={users}
            onUserSelect={onUserSelect}
            username={username}
            countUnseenMessages={countUnseenMessages} /> ) :null }
          {/*step3:select user, switch to chat window */}
          {step ===2 ?(<MessagesControl
              sendMessage={sendMessage}
              value ={message}
              onChange= {(e)=> setMessage(e.target.value)}
              groupMessage={groupMessage}
              sortNames={sortNames}
              username={username}
              reciever={reciever}
              setMedia ={setMedia}
              onChatClose={onChatClose}
            /> ):null

          }

        </div>    
      </div>

    </div>

  );
}

export default App;
