import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/types";
import { userSchema } from "@/utils/validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type InitalValue = Pick<User, "name" | "username" | "role"> & {
  password: string;
};
type Props = {
  oldData?: User;
};

const AddUser = ({ oldData }: Props) => {
  const [showPass, setShowPass] = useState(false);
  const isEditing = !!oldData?._id;
  const intialValue: InitalValue = {
    name: oldData?.name || "",
    username: oldData?.username || "",
    role: oldData?.role || "user",
    password: "",
  };

  const renderText = (isSubmitting: boolean) => {
    if (isEditing) {
      return isSubmitting ? "Updating..." : "Update";
    }
    return isSubmitting ? "Creating..." : "Create";
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" rounded-sm font-medium px-4 h-8">Add User</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95dvh] overflow-y-auto !max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Update" : "Create"} User</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={intialValue}
          onSubmit={(v) => {}}
          validationSchema={userSchema}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex flex-col gap-2">
              <div className="space-y-2">
                <Label htmlFor="name"> Name</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  className="rounded-sm"
                  placeholder="Name of user"
                />
                <ErrorMessage name="name" component="p" className="error" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username"> Username</Label>
                <Field
                  as={Input}
                  id="username"
                  name="username"
                  className="rounded-sm"
                  placeholder="Short username"
                />
                <ErrorMessage name="username" component="p" className="error" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password"> Password</Label>

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
                <ErrorMessage name="password" component="p" className="error" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role"> Role</Label>
                <Select
                  defaultValue="user"
                  value={values.role}
                  onValueChange={(v) => setFieldValue("role", v)}
                >
                  <SelectTrigger className="w-full rounded-sm capitalize">
                    <SelectValue placeholder="User Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {["user", "manager"].map((item, i) => (
                      <SelectItem key={i} value={item} className="capitalize">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end items-end mt-2">
                <Button className="rounded-sm px-4 h-8" disabled={isSubmitting}>
                  {renderText(isSubmitting)}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
