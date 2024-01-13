"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";

type Props = {
  startCursor: string;
  endCursor: string;
  previousPage: boolean;
  nextPage: boolean;
};

const LoadMore = ({
  startCursor,
  endCursor,
  previousPage,
  nextPage,
}: Props) => {
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === "next" && nextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    } else if (direction === "first" && previousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  };

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {previousPage && (
        <Button
          title="First Page"
          handleClick={() => handleNavigation("first")}
        />
      )}
      {nextPage && (
        <Button title="Next" handleClick={() => handleNavigation("next")} />
      )}
    </div>
  );
};

export default LoadMore;
