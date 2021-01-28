import axios from "axios"

export const sendFriendReq = async (otherUserData, user) => {
    // console.log("putting the sendFriendReq here");
    await axios
      .post("/api/friends/makeFriendReq", {
        sender: user,
        receiver: otherUserData,
      })
      .then((data) => console.log(data));
  };