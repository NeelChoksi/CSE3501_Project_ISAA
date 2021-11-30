import React from 'react';
import {BiUserCircle,BiSend} from 'react-icons/bi';
import {GrAttachment} from 'react-icons/gr';
import {AiFillCloseCircle} from 'react-icons/ai'

const MessagesControl = ({sendMessage,
	value,
	onChange,
	groupMessage,
	sortNames,
	username,
	reciever,
	setMedia,
	onChatClose
	})=>{

	const messages = groupMessage ? groupMessage[sortNames(username,reciever)]: [];

	return(
		    <div>
                <div className="online-users-header">
                  <div className="step2-header">{reciever}</div>
                  <div><AiFillCloseCircle 
                   style={{margin:"0 .5rem", cursor:"pointer"}}
                   onClick={onChatClose}
                    /></div>
                </div>
                <div className="message-area">
                  <ul>
	                  {messages &&     	messages.length >0 ? messages.map((msg,index)=>(
		                    <li style={{flexDirection:username === msg.reciever ? "row" : "row-reverse"}} key={index}>
		                      <div className="user-pic">
		                        <BiUserCircle />
		                      </div>
		                      <div className="message-text">
		                        {msg.message}
		                      </div>
		                    </li>

	                  	)) : null
	                  }
                  </ul> 
                </div> 
                <form onSubmit ={sendMessage} className="message-control">
                  <textarea
                   placeholder="Enter message.."
                   value={value}
                   onChange={onChange}
                    />
                 {/* <div className="file-input-container">
                                     <input type="file" id="hidden-file"  />
                                     <label htmlFor="hidden-file">
                                       <GrAttachment />
                                     </label>
                                   </div> */}
                  <button>
                    <BiSend />
                  </button>
                </form> 
              </div>  

	);
}

export default MessagesControl;