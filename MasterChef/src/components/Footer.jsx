const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className=" flex flex-wrap justify-center align-middle w-auto  text-lg md:text-2xl pt-5 pr-2.5 pb-2 pl-2.5   rounded-md shadow-2xl shadow-slate-400 bottom-0 z-10">
      Created By
      <i className="fa-solid fa-copyright"></i>
      <a
        className="hover:text-purple-800 text-lg md:text-2xl mx-1 "
        href="https://www.linkedin.com/in/sankalp-haritash/"
        target="_blank"
        title="Sankalp Haritash Linkedin"
      >
        <b>Sankalp Haritash</b>
      </a>
      {year}
      <a
        className=" hover:text-purple-800 text-lg md:text-2xl mx-1 "
        href="https://github.com/SankalpHaritash21"
        target="_blank"
        title="Sankalp Haritash"
      >
        <strong className="mx-1">
          <b>MasterChef</b>
        </strong>
      </a>
    </div>
  );
};

export default Footer;
