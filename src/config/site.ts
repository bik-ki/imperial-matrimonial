const localPhoneNumber = "9745722755";

export const site = {
  name: "BiheInCourt",
  tagline: "Advocates & Legal Associates",
  referenceUrl: "https://www.lawimperial.com/",
  whatsappNumber: `977${localPhoneNumber}`,
  phoneDisplay: "+977 974 572 2755",
  phoneHref: `tel:+977${localPhoneNumber}`,
  whatsappDisplay: "+977 974 572 2755",
  email: "biheincourt@gmail.com",
  consultation: {
    subjectPrefix: "Consultation request",
    bodyHeading: "New consultation request",
  },
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

export function isConfiguredBusinessEmail(email: string = site.email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.includes("[");
}

export function gmailComposeUrl({
  recipient,
  subject,
  body,
}: {
  recipient: string;
  subject: string;
  body: string;
}) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: recipient,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
