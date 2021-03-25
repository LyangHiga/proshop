import { Typography } from "@material-ui/core";

import Header from "../components/Header";
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";

const register = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Sign Up
        </Typography>
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
};

export default register;
