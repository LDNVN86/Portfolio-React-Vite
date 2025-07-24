import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

import { SiGmail } from "react-icons/si";
import { FaGithub, FaDiscord, FaYoutube, FaLine } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";

const IconHomePage = () => {
  const icons = [
    {
      id: "1",
      icon: <SiGmail />,
      label: "Gmail",
      link: "https://mail.google.com",
    },
    {
      id: "2",
      icon: <FaGithub />,
      label: "GitHub",
      link: "https://github.com/LDNVN86",
    },
    {
      id: "3",
      icon: <FaDiscord />,
      label: "Discord",
      link: "https://discord.com/channels/@me",
    },
    {
      id: "4",
      icon: <FaYoutube />,
      label: "YouTube",
      link: "https://www.youtube.com/@%E3%83%91%E3%83%B3%E3%83%89%E3%83%A9%E6%82%AA%E5%BD%B9",
    },
    {
      id: "5",
      icon: <IoLogoFacebook />,
      label: "Facebook",
      link: "https://www.facebook.com/https://www.facebook.com/",
    },
    { id: "6", icon: <FaLine />, label: "Line", link: "https://www.line.me/" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {icons.map((item) => (
        <Tippy
          key={item.id}
          content={item.label}
          placement="top"
          animation="scale"
        >
          <Link
            to={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-black 
              bg-cyan-200 hover:bg-cyan-700 
              font-medium 
              rounded-full 
              text-2xl 
              w-10 h-10 
              flex items-center justify-center 
              dark:bg-cyan-200 dark:hover:bg-cyan-400
            "
          >
            {item.icon}
          </Link>
        </Tippy>
      ))}
    </div>
  );
};

export default IconHomePage;
