// AuthProvider.js

const AuthContext = {};

const AuthProvider = (children) => {
  const state = {
    user: null,
    token: getItem("site") || "",
  };

  const loginAction = async (email, pass) => {
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      });
      const res = await response.json();
      console.log(res);
      if (res) {
        state.user = res.user;
        state.token = res.token;
        setItem("site", res.token);
        window.location.href = "/index.html";
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    state.user = null;
    state.token = "";
    removeItem("site");
    navigate("/");
  };

  return {
    context: AuthContext,
    state,
    loginAction,
    logOut,
  };
};

export default AuthProvider;

const useAuth = () => {
  if (!AuthContext) {
    throw new Error("AuthContext is not initialized");
  }
  return AuthContext;
};

const _useAuth = useAuth;
export { _useAuth as useAuth };
