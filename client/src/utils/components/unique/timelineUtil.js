import axios from "axios";

// Import Func Utils
import { compare } from "./feedUtil";

export async function genPosts(whichUser, setPostsByUser) {
  //   console.log(whichUser);
  return await axios.post("/api/users/genUserPost", { jwt: whichUser }).then(async (userPost) => {
    const arrBasedOnTimeCreated = userPost.data.sort(compare).reverse();

    for (let i = 0; i < arrBasedOnTimeCreated.length; i++) {
      arrBasedOnTimeCreated[i].timeStampSmall = arrBasedOnTimeCreated[i].timeStamp.substring(
        11,
        16
      );
    }
    // console.log(arrBasedOnTimeCreated);
    return setPostsByUser(arrBasedOnTimeCreated);
  });
}

export async function genFriends(whichUser, setUserFriends) {
  await axios
    .put("/api/users/friends", {
      jwt: whichUser,
    })
    .then((data) => {
      setUserFriends(data.data);
      //   console.log(data.data);
    });
}

export async function genChoice(whichUser, user, setAddOrUnfriend) {
  if (whichUser !== user) {
    await axios
      .put("/api/friends/alreadyFriends", {
        person: whichUser,
        jwt: user,
      })
      .then((data) => {
        // console.log(data.data);
        setAddOrUnfriend(data.data);
      });
  }
}

export async function unfriend(otherUser, user, history, workSpaces, setWorkSpaces, setUserFinder) {
  // console.log(otherUser);
  // console.log(user);
  await axios
    .delete("/api/friends/unfriend", {
      params: {
        jwt: user,
        person: otherUser,
      },
    })
    .then((data) => {
      if (otherUser.id === user.id) {
        setWorkSpaces({ ...workSpaces, currentSearch: undefined, isOnUP: true });
      } else {
        setWorkSpaces({ ...workSpaces, currentSearch: otherUser.username, isOnUP: true });
      }

      setUserFinder(otherUser.id);
      history.push(`/frommetoyou/${otherUser.username}`);
    });
}
