import { SocialMediaProfiles } from "@/components/SocialMedia";

export const navigation = [
  {
    title: "Products",
    links: [
      { title: "Fortune.day", href: "https://fortune.day" },
      { title: "Quire.work", href: "https://quire.work" },
      // { title: "AH MANA3RAF", href: "/work/blog101" },
      {
        title: (
          <>
            See all <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: "/work",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Mission", href: "/mission" },
      { title: "Work", href: "/work" },
      { title: "Process", href: "/process" },
      { title: "Blog", href: "/blog" },
      { title: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: SocialMediaProfiles,
  },
];
