/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { account } from "@/config/appwrite";
import { createUser } from "@/services/authService.service";
import { saveUserData } from "@/services/databaseService.service";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import SuccessDialog from "./SuccessDialog";
// import { SlideInDialog } from "./SlideInDialog";

type SignUpPopUpProps = {
  onSuccess: () => void;
};

export default function SignUpPopUp({ onSuccess }: SignUpPopUpProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    zipcode: "",
    phonenumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  //   const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setErrorMsg("");
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phonenumber: value,
    }));
    setErrorMsg("");
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMsg("");

  //   try {
  //     await createUser(
  //       formData.email,
  //       formData.password,
  //       `${formData.firstName} ${formData.lastName}`
  //     );

  //     await account.createEmailPasswordSession(formData.email, formData.password);

  //     await saveUserData({
  //       email: formData.email,
  //       firstname: formData.firstName,
  //       password: formData.password,
  //       lastname: formData.lastName,
  //       zipcode: formData.zipcode,
  //       phonenumber: formData.phonenumber,
  //     });

  //     await account.deleteSession("current");

  //     //   setOpen(true);
  //     onSuccess();
  //   } catch (err: any) {
  //     console.error(err);
  //     setErrorMsg(err?.message || "Signup failed. Try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ...existing code...

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setErrorMsg("");

  try {
    // Create user account
    await createUser(
      formData.email,
      formData.password,
      `${formData.firstName} ${formData.lastName}`
    );

    // Log user in
    await account.createEmailPasswordSession(formData.email, formData.password);

    // Save additional user data
    await saveUserData({
      email: formData.email,
      firstname: formData.firstName,
      password: formData.password,
      lastname: formData.lastName,
      zipcode: formData.zipcode,
      phonenumber: formData.phonenumber,
    });

    // Log user out
    await account.deleteSession("current");

    onSuccess();
  } catch (err: any) {
    console.error(err);
    setErrorMsg(err?.message || "Signup failed. Try again.");
  } finally {
    setLoading(false);
  }
};
// ...existing code...

  return (
    <>
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg">
        <Card className="w-full border-none shadow-none">
          <CardHeader className="text-center" />
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    onChange={handleChange}
                    value={formData.firstName}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    onChange={handleChange}
                    value={formData.lastName}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  onChange={handleChange}
                  value={formData.email}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  value={formData.password}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input
                  id="zipcode"
                  type="number"
                  placeholder="123456"
                  onChange={handleChange}
                  value={formData.zipcode}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phonenumber">Phone Number</Label>
                <PhoneInput
                  country={'us'} // default country
                  value={formData.phonenumber}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true
                  }}
                  containerClass="w-full"
                  inputClass="w-full"
                />
              </div>

              {errorMsg && (
                <p className="text-red-600 text-sm text-center">{errorMsg}</p>
              )}

              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-none px-8 py-6 bg-[#CD0C0C] text-white text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin w-5 h-5" />
                      Creating account...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Dialog Slide-In */}
      {/* <SlideInDialog open={open} setOpen={setOpen}>
        <SuccessDialog />
      </SlideInDialog> */}
    </>
  );
}
