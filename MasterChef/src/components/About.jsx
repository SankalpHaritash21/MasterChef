import { useState, useEffect } from "react";

const About = () => {
  const [user, setUser] = useState([]);
  const fetchrepo = () => {
    return fetch(`https://api.github.com/users/SankalpHaritash21`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    fetchrepo();
  }, []);
  console.log(user);

  return (
    <div className="w-full min-h-screen md:h-auto mt-5 p-14 text-black mb-2 font-Poppins sm:p-4 flex flex-col items-center justify-center gap-x-10 ">
      <div className="bg-black p-2 rounded-full mb-4">
        <img
          src={user.avatar_url}
          alt="Developer Avatar"
          className="rounded-full  h-60 w-60 "
        />
      </div>
      <a href={user.html_url} target="_blank">
        <h1
          className="underline text-2xl md:text-5xl mb-4 mt-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          {user.name}
        </h1>
      </a>
      <h3 className="mt-4 mb-1 text-xl md:text-2xl italic flex-wrap w-[30rem] items-center justify-center text-center ">
        {user.bio}
      </h3>
      <div className="flex gap-x-5 mt-10">
        <a href="https://github.com/SankalpHaritash21" target="_blank">
          <img
            width="64"
            height="64"
            src="https://img.icons8.com/glyph-neue/64/github.png"
            alt="github"
            className="h-[3rem] w-[3rem]"
          />
        </a>
        <a href="https://www.linkedin.com/in/sankalp-haritash/" target="_blank">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency/48/linkedin.png"
            alt="linkedin"
            className="h-[3rem] w-[3rem]"
          />
        </a>
      </div>
    </div>
  );
};
export default About;
