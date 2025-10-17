import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import type { FC } from "react";

type Props = {
  title: string;
  value: string;
  className?: string;
};
export const Ministatistics: FC<Props> = ({ title, value, className }) => {
  return (
    <Card className={clsx(className, "rounded-md")}>
      <CardHeader>
        <CardDescription className="text-base sm:text-lg capitalize">
          {title}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
