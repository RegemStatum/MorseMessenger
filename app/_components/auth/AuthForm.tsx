import { FC, useState } from "react";
import Input from "../ui/forms/Input";
import { PrimaryButton } from "../ui/buttons";
import signUp from "@/app/_firebase/auth/signup";
import signIn from "@/app/_firebase/auth/signin";
import Spinner from "../ui/loaders/Spinner";
import { useAppContext } from "@/app/_context/AppContext";

type Props = {
  formActionText: string;
  action: "signin" | "signup";
};

const AuthForm: FC<Props> = ({ formActionText, action }) => {
  const { showInfoPopup } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const toggleIsPasswordShown = () => {
    const newIsPasswordShown = !isPasswordShown;
    setIsPasswordShown(newIsPasswordShown);
  };

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = { ...formData };
    newFormData[e.target.name as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  };

  const validateForm = () => {
    const validation = { isValid: true, message: "" };
    const { email, password } = formData;
    if (!email || email === "" || email.trim() === "" || !email.includes("@")) {
      validation.isValid = false;
      validation.message = "Email is not valid";
      return validation;
    }
    if (
      !password ||
      password === "" ||
      password.trim() === "" ||
      password.length < 6 ||
      password.length > 18
    ) {
      validation.isValid = false;
      validation.message = "Password is not valid";
      return validation;
    }
    return validation;
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      // validation
      const { isValid, message } = validateForm();
      if (!isValid) throw new Error(message);
      // authentication
      const handleAuth = action === "signup" ? signUp : signIn;
      const { result, error } = await handleAuth(
        formData.email,
        formData.password
      );
      // error occurred
      if (error) {
        console.log(error);
        showInfoPopup(error.message || "Something went wrong", "error");
        setIsLoading(false);
        return;
      }
      // success
      console.log(result);
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      showInfoPopup(e.message || "Something went wrong", "error");
      setIsLoading(false);
    }
  };

  const LoadingButton = (
    <PrimaryButton disabled>
      <div className="flex justify-center items-center gap-1">
        <div className="w-[25px] h-[25px] text-gray-600">
          <Spinner />
        </div>
        <p className="text-gray-600 font-bold">Loading...</p>
      </div>
    </PrimaryButton>
  );

  const SubmitButton = (
    <PrimaryButton onClick={handleFormSubmit}>{formActionText}</PrimaryButton>
  );

  return (
    <form className="space-y-1">
      <Input
        value={formData.email}
        onChange={handleFormDataChange}
        name="email"
        placeholder="Email"
        type="email"
        minLength={3}
      />
      <Input
        value={formData.password}
        onChange={handleFormDataChange}
        name="password"
        placeholder="Password"
        type={isPasswordShown ? "text" : "password"}
        minLength={8}
        maxLength={16}
        functionalIconSrc={
          formData.password.length === 0
            ? ""
            : isPasswordShown
            ? "/images/icons/eyeSolidIcon.svg"
            : "/images/icons/eyeIcon.svg"
        }
        functionalIconOnClickHandler={toggleIsPasswordShown}
        hintText="Password length must be from 8 to 16 characters"
      />
      {isLoading ? LoadingButton : SubmitButton}
    </form>
  );
};

export default AuthForm;
