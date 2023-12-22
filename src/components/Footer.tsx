
import { AiFillFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineGithub } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
import { SiCodewars } from 'react-icons/si';
import { BsCodeSlash } from 'react-icons/bs';
const Footer = () => {
  return (
    <footer className=" text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
      <div className="flex items-center justify-center  p-6 dark:border-neutral-500 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>Get in touch:</span>
        </div>
        <div className="flex justify-center">
          <a href="https://www.facebook.com/profile.php?id=100060346936746" target="_blank" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <AiFillFacebook />
          </a>
          <a href="https://twitter.com/davidpi79664838" target="_blank" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FaXTwitter />
          </a>
          <a href="https://www.instagram.com/jdavi_d0105/" target="_blank" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <AiOutlineInstagram />
          </a>
          <a href="https://www.linkedin.com/in/juan-david-pineda-34b9051a1/" target="_blank" className="mr-6 text-neutral-600 dark:text-neutral-200">
           <AiOutlineLinkedin />
          </a>
          <a href="https://github.com/DaveB4r" target="_blank" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <AiOutlineGithub />
          </a>
          <a href="https://www.codewars.com/users/David0105" target="_blank" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <SiCodewars />
          </a>
          <a href="https://daveb4r.github.io/" target="_blank" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <BsCodeSlash />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
