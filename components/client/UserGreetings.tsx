"use client";
import { PiHandWavingBold } from "react-icons/pi";
import { useSession } from "next-auth/react";

function UserGreetings() {
  const { data: session } = useSession();

  return (
    <section className="flex flex-col items-center">
      <div className="flex space-x-2 items-center text-center mb-3">
        <h1>
          Hello{" "}
          <strong>
            <u>{session?.user?.name}</u>
          </strong>
        </h1>
        <PiHandWavingBold className="dark:text-white text-2xl" />
      </div>

      <p className="dark:bg-red-200 dark:text-red-600 bg-red-100 text-red-500 font-semibold p-1 px-2 text-center rounded-md">
        It seems like you don{"'"}t have any channels yet.
      </p>
    </section>
  );
}

export default UserGreetings;
