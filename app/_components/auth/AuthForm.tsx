import { FC, useState } from "react";
import Input from "../ui/forms/Input";
import { PrimaryButton } from "../ui/buttons";
import signUp from "@/app/_firebase/auth/signup";
import signIn from "@/app/_firebase/auth/signin";
import { useAppContext } from "@/app/_context/AppContext";
import LoadingButton from "../ui/buttons/LoadingButton";
import localValidatePassword from "@/app/_lib/helpers/localValidatePassword";
import localValidateEmail from "@/app/_lib/helpers/localValidateEmail";
import { useRouter } from "next/navigation";

type Props = {
  formActionText: string;
  action: "signin" | "signup";
};

const AuthForm: FC<Props> = ({ formActionText, action }) => {
  const router = useRouter();
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
    let validation = { isValid: true, message: "" };
    const { email, password } = formData;
    // validate email
    validation = localValidateEmail(email);
    if (!validation.isValid) return validation;
    // validate password
    validation = localValidatePassword(password);
    if (!validation.isValid) return validation;

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
      router.push("/user");
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      showInfoPopup(e.message || "Something went wrong", "error");
      setIsLoading(false);
    }
  };

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
      {isLoading ? (
        <LoadingButton />
      ) : (
        <PrimaryButton onClick={handleFormSubmit}>
          {formActionText}
        </PrimaryButton>
      )}
    </form>
  );
};

export default AuthForm;
