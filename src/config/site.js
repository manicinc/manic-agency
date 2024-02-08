export function constructMetadata({
  title = "Manic Agency",
  description = "Manic Agency is a software and design firm housing a multitude of innovative tech and media platforms.",
  image = "/agency.PNG",
  // icons = "/favicon.ico",
  noIndex = false,
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "",
    },
    icons,
    metadataBase: new URL("https://manic.agency"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
