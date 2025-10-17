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
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/types";
import { handleApiError } from "@/utils";
import { adminAPI } from "@/utils/api/admin";
import { projectSchema } from "@/utils/validation";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";

type InitialValue = Pick<
  Project,
  "name" | "description" | "status" | "startDate" | "endDate"
>;
type Props = {
  oldData?: Project;
  children: React.ReactNode;
};

const AddProject = ({ oldData, children }: Props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const isEditing = !!oldData?._id;
  const intialValue: InitialValue = {
    name: oldData?.name || "",
    description: oldData?.description || "",
    startDate: oldData?.startDate?.substring(0, 10) || "",
    endDate: oldData?.endDate?.substring(0, 10) || "",
    status: oldData?.status || "pending",
  };

  const renderText = (isSubmitting: boolean) => {
    if (isEditing) {
      return isSubmitting ? "Saving..." : "Save";
    }
    return isSubmitting ? "Creating..." : "Create";
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[95dvh] overflow-y-auto !max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Update" : "Create"} project</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={intialValue}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              if (isEditing) {
                await adminAPI.updateProject(oldData?._id as string, values);
                queryClient.invalidateQueries({ queryKey: ["projects"] });
                toast.success("Project updated successfully");
                setOpen(false);
                return;
              }
              await adminAPI.createProject(values);
              queryClient.invalidateQueries({ queryKey: ["projects"] });
              setOpen(false);
              toast.success("Project created successfully");
              resetForm();
            } catch (error) {
              const e = handleApiError(error);
              toast.error(e?.message);
            } finally {
              setSubmitting(false);
            }
          }}
          validationSchema={projectSchema}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex flex-col gap-2">
              <div className="space-y-2">
                <Label htmlFor="name"> Project Name</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  className="rounded-sm"
                  placeholder="Project Name"
                />
                <ErrorMessage name="name" component="p" className="error" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description"> Description</Label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  className="rounded-sm"
                  placeholder="Short Description"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="error"
                />
              </div>

              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="status"> Status</Label>
                  <Select
                    defaultValue="user"
                    value={values.status}
                    onValueChange={(v) => setFieldValue("status", v)}
                  >
                    <SelectTrigger className="w-full rounded-sm capitalize">
                      <SelectValue placeholder="Your Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {["pending", "in-progress", "completed"].map(
                        (item, i) => (
                          <SelectItem
                            key={i}
                            value={item}
                            className="capitalize"
                          >
                            {item}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="startDate"> Start Date</Label>
                  <Field
                    as={Input}
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="rounded-sm"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="p"
                    className="error"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate"> End Date</Label>
                  <Field
                    as={Input}
                    id="endDate"
                    name="endDate"
                    type="date"
                    className="rounded-sm"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="p"
                    className="error"
                  />
                </div>
              </div>

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

export default AddProject;
