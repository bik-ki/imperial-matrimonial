const localPhoneNumber = "9745722755";

export const site = {
  name: "BiheInCourt",
  tagline: "Advocates & Legal Associates",
  location: "Thapathali, Kathmandu, Nepal",
  referenceUrl: "https://www.lawimperial.com/",
  whatsappNumber: `977${localPhoneNumber}`,
  phoneDisplay: "+977 974 572 2755",
  phoneHref: `tel:+977${localPhoneNumber}`,
  whatsappDisplay: "+977 974 572 2755",
  email: "biheincourt@gmail.com",
  whatsappMessage:
    "Hello BiheInCourt, I would like to know more about your court marriage services in Nepal.",
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/profile.php?id=61572165336250",
    tiktok: "https://vm.tiktok.com/ZS9fktqq3uryh-0QlTU/",
    youtube: "https://www.youtube.com/",
  },
  instagramHandle: "[Client to provide verified Instagram handle]",
};

export function whatsappUrl(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
