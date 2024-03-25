import Link from "next/link";
import { Button } from "../ui/button";

export const HeroSection = () => {
  return (
    <div className="mt-4 flex w-full flex-col md:col-span-4">
      <h2 className={`mb-2 text-xl font-bold md:text-2xl`}>Join Meetsync !</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-border p-4">
        <div className="m-auto p-4">
          <h2 className="mt-4 text-2xl font-bold uppercase leading-10">
            Connect, Sync, Meet: Transform your professional network with
            MeetSync!
          </h2>
          <p className="my-6 text-lg leading-8 text-muted-foreground">
            MeetSync revolutionizes professional interactions by offering a
            dynamic platform to optimize your meetings at events. Thanks to our
            intuitive technology, create unique networking opportunities,
            schedule your meetings and share your experiences, all in just a few
            clicks. Join the MeetSync community and take your career to the next
            level.
          </p>
        </div>
        <div className="block w-full gap-2 md:flex">
          {/* <Link href="/signup" className="w-1/2">
            <LoginButton />
            <Button className="w-full px-4 py-2">Signup</Button>
          </Link> */}
          <Link href="/events" className=" w-full">
            <Button className="mt-2 w-full px-4 py-2 md:mt-0">
              Browse event
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
