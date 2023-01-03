import { IoIosVideocam, IoMdCall } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import {BASE_URL_BASE} from "../../services/apiHelpers/apiHelpers";
import store from "../../store";
import { userId } from "../../store";
import { getAllMessages } from "../../services/apiServices";
import ScrollToBottom from "react-scroll-to-bottom";
import {MdOutlineAttachFile} from "react-icons/md";
const Chatroom = ({ roomName, roomId, socket,image }) => {
  
  let token = store((state) => state.token);
  let Id = userId((state) => state.userId);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [load, setLoad] = useState(false);

console.log(messageList, "messageList");

// to get the previous messages
  useEffect(() => {
    const getMessages = async () => {
      const data = await getAllMessages(roomId);
      setMessageList(data.data);
    }
    getMessages();
  }, [messageList])

// useRef
const fileRef = useRef(null);
const clickHandler = ()=>{
  fileRef.current.click();
}

const fileUploadHandler = (e)=>{
  setMessageList((prev) => [...prev, e.target.files[0].name]);
  setSelectedFile(e.target.files[0]);
}


  const sendMessage = async () => {
  //  check if ther is a file then send the file else send the message by checking the currentMessage

    if(selectedFile){
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("roomId", roomId);
      formData.append("token", token);
      formData.append("type", selectedFile.type);
      formData.append("message", currentMessage);
      socket.emit("send_message", formData);
      setCurrentMessage("");
      setSelectedFile(null);
    }else if (currentMessage !== "") {
      const message = {
        token,
        roomId,
        message: currentMessage,
      };
      await socket.emit("send_message", message);
      // stop typing
      socket.emit("stop_typing", roomId)
      setMessageList((prev) => [...prev, message]);
      setCurrentMessage("");
    }
    else{
      return;
    }
  
  };

  const handleTyping = (e) => {
      setCurrentMessage(e.target.value);
  }

  useEffect(() => {
    if (load) {
      socket.on("receive_message", (data) => {
        setMessageList((prev) => [...prev, data]);
      });
    } else {
      setLoad(true);
    }
  }, [load]);



  return (
    <div className="flex w-9/12 min-h-[60%]  flex-col border-2 rounded-md ">
      {/* chat header */}
      <div
        className="flex flex-row justify-between items-center
      shadow-md bg-white/90 backdrop-blur-md w-full
      px-8 py-4
      "
      >
        <div className="flex gap-4 items-center ">
          <img
            src={`${BASE_URL_BASE}/${image}`}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-lg font-semibold">{roomName}</h1>
        </div>
        <div className="flex gap-4 items-center">
          <IoIosVideocam className="text-2xl text-green-600" />
          <IoMdCall className="text-2xl text-green-600" />
        </div>
      </div>
      {/* header section end */}

      {/* chat body start */}
        <ScrollToBottom className="message-container" >
      <div class="w-full px-5 flex flex-col justify-between   ">
        <div class="flex flex-col mt-4 ">
    {
      messageList?.map((message) => {
        return(
          <>
          <div class={`flex items-center gap-2
          ${message.user === Id ? "justify-start" : "justify-end"}
          mb-4`}>
            <div class={`mr-2 py-3 px-4 ${message.user===Id? "bg-blue-400": "bg-green-400" } rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white 
            
            `}>
              {message.message}
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class={`object-cover h-8 w-8 rounded-full ${message.user===Id? "hidden": "" } `}
              alt=""
            />
          </div>
          </>

)}
)
}
</div>
</div>
</ScrollToBottom>
        {/* chat input */}
        <div className="flex items-center gap-6 justify-center mx-4 ">
          <input type="file" onChange={fileUploadHandler} ref={fileRef} className="hidden" />
          <div class="relative w-10/12 my-6">
            <input
              value={currentMessage}
              onChange={handleTyping}
              type="text"
              placeholder="Type a message"
              class="flex w-full border rounded-xl  focus:outline-none focus:border-indigo-300 pl-4 h-10 bg-gray-100 "
            />
            <button onClick={clickHandler}  class="absolute flex items-center justify-center h-full w-12 right-10 top-0  ">
              <MdOutlineAttachFile className="hover:text-green-700 " />
            </button>
            <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 ">
              😉
            </button>
          </div>
          <button
            onClick={sendMessage}
            class="flex items-center justify-center w-10/12 h-10 bg-blue-400 rounded-xl text-white w-24 "
          >
            Send
          </button>
        </div>
      {/* chat body end */}
    </div>
  );
};

export default Chatroom;
