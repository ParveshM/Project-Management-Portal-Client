import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl transition-all hover:shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold tracking-tight">
            User Profile
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Welcome back! Manage your profile below.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex  gap-4 pt-4">
          <Avatar className=" border-2 border-ring/20">
            <AvatarFallback className="text-lg font-medium">N</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center text-center space-y-1">
            <span className="text-base font-semibold text-foreground">
              username
            </span>
            <span className="text-sm text-muted-foreground">Full Name</span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-2">
          <Button
            variant="destructive"
            className="gap-2 rounded-sm font-medium px-4"
          >
            Log out
            <Icon icon="material-symbols:logout-rounded" className="size-5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
