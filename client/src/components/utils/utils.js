import axios from "axios";

const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGExN2ZkMzM0OGMxNDkxMjhkMGY5MSIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsImlhdCI6MTY4Njc3MTk1NywiZXhwIjoxNjg3Mzc2NzU3fQ.TfPwDFREQhERowm85klRed0D5UJgwRuI6e8kwyAWQ4o"
);

export const verifyUser = (cb, cb2) => {
  if (localStorage.getItem("token")) {
    axios
      .get(
        `https://dino-trex-game.glitch.me/users/verify/${localStorage.getItem("token")}`
      )
      .then((res) => {
        //console.log(res.data);
        cb(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        cb2("/login-signup");
      });
  } else {
    console.log("No token found");
    console.log("Redirecting to /login-signup");
    cb2("/login-signup");
  }
};
