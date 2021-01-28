import axios from "axios";

export const searched = async function (
  user,
  userTyping,
  setURS,
  workSpaces,
  setWorkSpaces,
  history,
  enterVal
) {
  // console.log(enterVal);
  if (enterVal === "Enter") {
    setWorkSpaces({
      ...workSpaces,
      currentSearch: undefined,
      search: false,
      peopleFinder: false,
      isSearchingPF: false,
      isSearchingChat: false,
      isSearchingHome: false,
      isSearchingSettings: false,
      home: false,
      chat: false,
      settings: false,
    });
    await axios
      .post("/api/users/activateSearch", {
        jwt: user,
        userInput: userTyping,
      })
      .then((data) => {
        //
        const recents = data.data[0].reverse();
        setURS(recents);
        //
        if (enterVal) {
          history.push("/frommetoyou");
          setWorkSpaces({
            ...workSpaces,
            currentSearch: recents[0].searched,
            search: false,
            peopleFinder: true,
            isSearchingPF: true,
            isSearchingChat: false,
            isSearchingHome: false,
            isSearchingSettings: false,
            home: false,
            chat: false,
            settings: false,
          });
        }
      });
    //
  } else if (typeof enterVal === "string") {
    setWorkSpaces({
      ...workSpaces,
      currentSearch: undefined,
      search: false,
      peopleFinder: false,
      isSearchingPF: false,
      isSearchingChat: false,
      isSearchingHome: false,
      isSearchingSettings: false,
      home: false,
      chat: false,
      settings: false,
    });
    //
    await axios
      .post("/api/users/activateSearch", {
        jwt: user,
        userInput: enterVal,
      })
      .then((data) => {
        const recents = data.data[0].reverse();
        setURS(recents);
        //
        if (enterVal) {
          history.push("/frommetoyou");
          setWorkSpaces({
            ...workSpaces,
            currentSearch: recents[0].searched,
            search: false,
            peopleFinder: true,
            isSearchingPF: true,
            isSearchingChat: false,
            isSearchingHome: false,
            isSearchingSettings: false,
            home: false,
            chat: false,
            settings: false,
          });
        }
      });
    //
  } else if (userTyping === "") {
    await axios
      .post("/api/users/activateSearch", {
        jwt: user,
        userInput: userTyping,
      })
      .then((data) => {
        const recents = data.data[0].reverse();
        setURS(recents);
      });
  }
};

export const dbSuggestions = async function (text, setCounter, setSugg) {
  setCounter(0);
  axios
    .put("/api/users/suggestions", {
      userInput: text,
    })
    .then(async (data) => {
      // console.log(data.data);
      const incomingData = data.data;
      // incomingData.batchOneView = true;
      // console.log(incomingData);
      return setSugg(incomingData);
    });
};

export const suggRefresher = async function (counterState, settingCounter, suggs) {
  if (counterState < 16) {
    if (suggs[counterState + 1].length > 0) {
      return settingCounter(counterState + 1);
    } else {
      return settingCounter(0);
    }
  }
};
