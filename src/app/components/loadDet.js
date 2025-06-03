"use-client";
import { Spinner } from "flowbite-react";

export default function Component() {
  return (
    <div className="text-center">
      <div className="flex flex-wrap items-center gap-2">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    </div>
  );
}
