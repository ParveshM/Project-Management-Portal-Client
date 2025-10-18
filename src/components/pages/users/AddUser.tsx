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
import { useAppSelector } from "@/lib/redux/hooks";
import type { User } from "@/types";
import { handleApiError } from "@/utils";
import { adminAPI } from "@/utils/api/admin";
import { authAPI } from "@/utils/api/auth";
import { userSchema } from "@/utils/validation";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type InitalValue = Pick<User, "name" | "username" | "role"> & {
  password: string;
};
type Props = {
  oldData?: User;
  children: React.ReactNode;
};

const AddUser = ({ oldData, children }: Props) => {
  const [open, setOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const queryClient = useQueryClient();
  const { role } = useAppSelector((state) => state.user);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[95dvh] overflow-y-auto !max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Update" : "Create"} User</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={intialValue}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              if (isEditing) {
                await adminAPI.updateUser(oldData?._id as string, values);
                queryClient.invalidateQueries({ queryKey: ["users"] });
                toast.success("User updated successfully");
                setOpen(false);
                return;
              }
              await authAPI.registerUser(values);
              queryClient.invalidateQueries({ queryKey: ["users"] });
              setOpen(false);
              toast.success("User created successfully");
              resetForm();
            } catch (error) {
              const e = handleApiError(error);
              toast.error(e?.message);
            } finally {
              setSubmitting(false);
            }
          }}
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

              {role === "admin" && (
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
              )}
              <div className="flex justify-end items-end mt-2">
                <Button
                  type="submit"
                  className="rounded-sm px-4 h-8"
                  disabled={isSubmitting}
                >
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
