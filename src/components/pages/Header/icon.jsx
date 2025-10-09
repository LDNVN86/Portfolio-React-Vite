
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { FaGithub, FaDiscord, FaYoutube, FaLine } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";

const icons = [
  {
    id: "gmail",
    icon: <SiGmail />,
    label: "Gmail",
    link: "https://mail.google.com",
  },
  {
    id: "github",
    icon: <FaGithub />,
    label: "GitHub",
    link: "https://github.com/LDNVN86",
  },
  {
    id: "discord",
    icon: <FaDiscord />,
    label: "Discord",
    link: "https://discord.com/channels/@me",
  },
  {
    id: "youtube",
    icon: <FaYoutube />,
    label: "YouTube",
    link: "https://www.youtube.com/@%E3%83%91%E3%83%B3%E3%83%89%E3%83%A9%E6%82%AA%E5%BD%B9",
  },
  {
    id: "facebook",
    icon: <IoLogoFacebook />,
    label: "Facebook",
    link: "https://www.facebook.com/",
  },
  {
    id: "line",
    icon: <FaLine />,
    label: "Line",
    link: "https://www.line.me/",
  },
];

const IconHomePage = () => (
  <div className="flex flex-wrap gap-3">
    {icons.map(({ id, icon, label, link }) => (
      <Tippy
        key={id}
        content={label}
        placement="top"
        animation="shift-away"
        theme="social-glow"
        duration={[160, 120]}
        delay={[50, 0]}
      >
        <Link
          to={link}
          target="_blank"
          rel="noopener noreferrer"
          className="theme-icon text-xl shadow-sm"
          aria-label={label}
        >
          {icon}
        </Link>
      </Tippy>
    ))}
  </div>
);

export default IconHomePage;
