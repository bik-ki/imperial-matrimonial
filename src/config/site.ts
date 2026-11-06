/**
 * Central business configuration. Replace every "[placeholder]" value with the
 * firm's verified details before publishing.
 */
export const site = {
  name: "Imperial Matrimonial",
  tagline: "Advocates & Legal Associates",
  referenceUrl: "https://www.lawimperial.com/",
  // International format, digits only, no "+" (used for wa.me links). PLACEHOLDER.
  whatsappNumber: "9770000000000",
  phoneDisplay: "+977 [Phone number]",
  phoneHref: "tel:+9770000000000",
  whatsappDisplay: "+977 [WhatsApp number]",
  email: "[email@yourfirm.com]",
  address: "[Office address], Kathmandu, Nepal",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kathmandu+Nepal",
  mapsEmbed: "https://www.google.com/maps?q=Kathmandu,Nepal&output=embed",
  hours: [
    { days: "Sunday – Friday", time: "[10:00 AM – 5:00 PM]" },
    { days: "Saturday", time: "[Closed / By appointment]" },
  ],
  whatsappMessage:
    "Hello Imperial Matrimonial, I would like to know more about your court marriage services in Nepal.",
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
    youtube: "https://www.youtube.com/",
  },
  instagramHandle: "@imperialmatrimonial",
};

export function whatsappUrl(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
