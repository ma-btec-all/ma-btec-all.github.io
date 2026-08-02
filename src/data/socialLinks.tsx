import { Instagram, Youtube, Globe, Mail, MessageCircle, Facebook, Ghost, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SocialLink = {
  id: string;
  label: string;
  hint?: string;
  url: string;
  Icon: LucideIcon;
  /** Brand color (hex) used for hover glow + border */
  brand: string;
  /** When true, hover background is light → use dark icon color */
  lightHover?: boolean;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "linkedin",
    label: "لينكد إن",
    hint: "Mohammad-Atallah@",
    url: "https://www.linkedin.com/in/mohammad-atallah-756907377",
    Icon: Linkedin,
    brand: "#0A66C2",
  },

  {
    id: "whatsapp",
    label: "واتساب",
    hint: "0779538251",
    url: "https://wa.me/962779538251",
    Icon: MessageCircle,
    brand: "#25D366",
  },
  {
    id: "instagram-personal",
    label: "إنستغرام (شخصي)",
    hint: "@mohammaed_atallah",
    url: "https://www.instagram.com/mohammaed_atallah",
    Icon: Instagram,
    brand: "#E4405F",
  },
  {
    id: "instagram-btec",
    label: "إنستغرام BTEC",
    hint: "@its.btec.it",
    url: "https://www.instagram.com/its.btec.it",
    Icon: Instagram,
    brand: "#E4405F",
  },
  {
    id: "facebook",
    label: "فيسبوك",
    url: "https://www.facebook.com/share/173Lm6oHHR/",
    Icon: Facebook,
    brand: "#1877F2",
  },
  {
    id: "youtube",
    label: "يوتيوب",
    hint: "@Mohammad-Atallah",
    url: "https://www.youtube.com/@Mohammad-Atallah",
    Icon: Youtube,
    brand: "#FF0000",
  },
  {
    id: "snapchat",
    label: "سناب شات",
    hint: "@mohammaed_2008",
    url: "https://www.snapchat.com/add/mohammaed_2008",
    Icon: Ghost,
    brand: "#FFFC00",
    lightHover: true,
  },
  {
    id: "portfolio",
    label: "الموقع الشخصي",
    url: "https://mohammaed-atallah.netlify.app/",
    Icon: Globe,
    brand: "#8A2BE2",
  },
  {
    id: "email",
    label: "البريد الإلكتروني",
    hint: "atallahmohammad07@gmail.com",
    url: "mailto:atallahmohammad07@gmail.com",
    Icon: Mail,
    brand: "#EA4335",
  },
];
