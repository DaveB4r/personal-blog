import { Image } from "@nextui-org/react";

const GoogleAccount = () => {
  return (
    <div className="mb-2 p-4 flex flex-row flex-wrap">
      <div>
        <Image
          removeWrapper
          alt="google logo"
          src="/images/assets/google.png"
        />
      </div>
      <div className="self-center text-center">
        <h1 className="mb-4 text-2xl font-extrabold dark:text-white md:text-3xl lg:text-4xl text-center">
          Use your{" "}
          <span className="tracking-tight inline font-extrabold from-[#0a4b97] to-[#111827] text-[2.1rem] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b">
            Google {" "}
          </span>
          account.
        </h1>
        <div className="text-xl leading-10">
          <p>
            Don't waste your time filling long forms, you can use your Google
            account to begin to create and share.
          </p>
          <p>What are you waiting for!</p>
          <p>
            <a href="/login" className="btn btn-primary">
              Sign in with Google
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleAccount;
