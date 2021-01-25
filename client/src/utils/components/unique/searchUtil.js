import axios from "axios";

export const searched = async function (user, userTyping, setURS) {
  await axios
    .post("/api/users/activateSearch", {
      jwt: user,
      userInput: userTyping,
    })
    .then((data) => {
      setURS(data.data[0].reverse());
      console.log(data.data);
    });
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
