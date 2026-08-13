export type AboutHybridCloudSectionId =
  | 'about'
  | 'benefits'
  | 'success-stories'
  | 'contact-us'

export const aboutHybridCloudNavItems = [
  {
    id: 'about',
    label: 'About',
    href: '/about',
  },
  {
    id: 'benefits',
    label: 'Benefits',
    href: '/about/benefits',
  },
  {
    id: 'success-stories',
    label: 'Success Stories',
    href: '/about/success-stories',
  },
  {
    id: 'contact-us',
    label: 'Contact Us',
    href: '/about/contact-us',
  },
] as const

export const aboutHybridCloudHero = {
  title: 'Why Hybrid Cloud Hosting',
  description:
    "CMS's Hybrid Cloud service provides all the benefits of cloud hosting – secure, scalable, and cost effective – along with the added benefits of regulatory and organizational control of a traditional data center.",
} as const
