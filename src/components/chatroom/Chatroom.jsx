import { IoIosVideocam, IoMdCall } from "react-icons/io";
import { useEffect, useState } from "react";
import {BASE_URL_BASE} from "../../services/apiHelpers/apiHelpers";
import store from "../../store";
import { userId } from "../../store";
import { getAllMessages } from "../../services/apiServices";
import ScrollToBottom from "react-scroll-to-bottom";
const Chatroom = ({ roomName, roomId, socket,image }) => {
  
  let token = store((state) => state.token);
  let Id = userId((state) => state.userId);
  console.log(Id, "Id");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [load, setLoad] = useState(false);

// to get the previous messages
  useEffect(() => {
    const getMessages = async () => {
      const data = await getAllMessages(roomId);
      setMessageList(data.data);
    }
    getMessages();
  }, [messageList])

  console.log(messageList, "messageList");


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const message = {
        token,
        roomId,
        message: currentMessage,
      };
      await socket.emit("send_message", message);
      setMessageList((prev) => [...prev, message]);
      setCurrentMessage("");
    }
  };

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
        <div className="flex items-center gap-6 justify-center ">
          <div class="relative w-10/12 my-6">
            <input
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              type="text"
              placeholder="Type a message"
              class="flex w-full border rounded-xl  focus:outline-none focus:border-indigo-300 pl-4 h-10 bg-gray-100 "
            />
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
