import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_ROLES, type AuthPayload } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginValidation } from "@/utils/validation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { toast } from "sonner";
import { handleApiError } from "@/utils";
import { login } from "@/lib/redux/middleware/auth.middleware";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen mx-2 sm:mx-0">
      <div className="flex flex-col gap-6 max-w-sm w-full">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Formik
              initialValues={
                {
                  username: "",
                  password: "",
                  role: "user",
                } as AuthPayload
              }
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                try {
                  const { role } = await dispatch(login(values)).unwrap();
                  toast.success("Login successful");
                  const to =
                    role === "user"
                      ? "/"
                      : role === "admin"
                      ? "/dashboard"
                      : "/projects";

                  navigate(to);
                  resetForm();
                } catch (error) {
                  const e = handleApiError(error);
                  toast.error(e?.message);
                } finally {
                  setSubmitting(false);
                }
              }}
              validationSchema={loginValidation}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="flex flex-col gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      className="rounded-sm"
                    />
                    <ErrorMessage
                      name="username"
                      component="p"
                      className="error"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>

                    <div className="relative border border-input rounded-sm">
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10 border-none"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 [&_svg]:size-4"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="error"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Role</Label>

                    <Select
                      defaultValue={values.role}
                      onValueChange={(v) => setFieldValue("role", v)}
                    >
                      <SelectTrigger className="w-full rounded-sm capitalize">
                        <SelectValue placeholder="Your Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(USER_ROLES).map((role) => (
                          <SelectItem
                            key={role}
                            value={role}
                            className="capitalize "
                          >
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
