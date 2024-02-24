const env = "local";

const config = {
  local: {
    baseURL: "http://localhost:5000/",
    socketURL: "http://localhost:5000/postgram",
  },
};

export default config[env];
