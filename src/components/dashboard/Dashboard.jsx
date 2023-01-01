import { useEffect, useState } from "react";
import { getChatroom } from "../../services/apiServices";
import io from "socket.io-client";
import Chatroom from "../chatroom/Chatroom";

const socket = io.connect("http://localhost:3030");

const Dashboard = () => {
  const [chatroom, setChatroom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [roomDetail, setRoomDetail] = useState("");

  // to join room
  const joinRoom = async (data) => {
    if (data._id) {
      socket.emit("join_room", data._id);
      setRoomDetail(data);
      setShowChat(true);
    }
  };

  // to get chatroom
  useEffect(() => {
    const getChatroomData = async () => {
      const data = await getChatroom();
      // console.log(data, "data here");
      setChatroom(data.data);
      setLoading(false);
    };
    getChatroomData();
  }, []);

  return (
    <>
      <div className="flex justify-start gap-4 w-full mx-auto bg-tertiary p-4">
        <div className="p-4 w-80 bg-red-100 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Message Room
            </h3>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {chatroom.map((chatroom, index) => {
                    console.log(chatroom, "chatroom");
                    return (
                      <li className="py-3 sm:py-4" key={index}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                              alt="Neil image"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {chatroom.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@gmail.com
                            </p>
                          </div>
                          <div>
                            {/* <Link to={"/chatroom/" + chatroom._id}> */}
                            <button
                              onClick={() => {
                                joinRoom(chatroom);
                              }}
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Message
                            </button>
                            {/* </Link> */}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
        {showChat && (
          <Chatroom
            socket={socket}
            roomId={roomDetail._id}
            roomName={roomDetail.name}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
