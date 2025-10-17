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
import { projectSchema } from "@/utils/validation";
import { ErrorMessage, Field, Form, Formik } from "formik";

type InitalValue = Pick<
  Project,
  "name" | "description" | "status" | "startDate" | "endDate"
>;
type Props = {
  oldData?: Project;
};

const AddProject = ({ oldData }: Props) => {
  const isEditing = !!oldData?._id;
  const intialValue: InitalValue = {
    name: oldData?.name || "",
    description: oldData?.description || "",
    startDate: oldData?.startDate || "",
    endDate: oldData?.endDate || "",
    status: oldData?.status || "pending",
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
        <Button className=" rounded-sm font-medium px-4 h-8">
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95dvh] overflow-y-auto !max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Update" : "Create"} project</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={intialValue}
          onSubmit={(v) => {}}
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

export default AddProject;
