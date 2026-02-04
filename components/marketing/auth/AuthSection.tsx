import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import AuthForm from "../form/AuthForm";

const AuthSection = () => {
  return (
    <section className="rv-account-form-section">
      <DivAnimateYAxis className="container">
        <div className="row justify-content-center">
          <div className="col-12 auth-container">
            <h3 className="single-form-title">Admin Login</h3>
            <AuthForm />
          </div>
        </div>
      </DivAnimateYAxis>
    </section>
  );
};

export default AuthSection;
