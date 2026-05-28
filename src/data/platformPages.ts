export type PlatformSection = {
  id: string
  label: string
  contentTitle: string
  paragraphs: string[]
}

export type PlatformPage = {
  slug: string
  title: string
  pageSubtext: string
  sections: PlatformSection[]
}

const defaultSections = (platformName: string): PlatformSection[] => [
  {
    id: 'overview',
    label: 'Overview',
    contentTitle: 'Overview',
    paragraphs: [
      `${platformName} on CMS Hybrid Cloud provides a secure, compliant foundation for hosting CMS applications and shared services.`,
      'Use this page to understand platform capabilities, onboarding expectations, and how teams request access.',
    ],
  },
  {
    id: 'getting-started',
    label: 'Getting started',
    contentTitle: 'Getting started',
    paragraphs: [
      'Review prerequisites such as EUA access, approved funding vehicle, and architecture review before provisioning workloads.',
      'Coordinate with your Customer Service Team (CST) to align sandbox and production timelines.',
    ],
  },
  {
    id: 'requirements',
    label: 'Requirements',
    contentTitle: 'Requirements',
    paragraphs: [
      'Document application classification, data sensitivity, and integration points as part of the hosting intake process.',
      'Ensure logging, monitoring, and backup requirements are defined before migration planning begins.',
    ],
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    contentTitle: 'Onboarding',
    paragraphs: [
      'Follow staged onboarding: discovery, sandbox validation, security assessment, and production cutover.',
      'Platform-specific runbooks and guardrails are published in the Knowledge Center as they become available.',
    ],
  },
  {
    id: 'support',
    label: 'Support',
    contentTitle: 'Support',
    paragraphs: [
      'Contact your CST for platform questions, office hours, and escalation paths.',
      'For incidents and operational support, use established CMS Hybrid Cloud service management channels.',
    ],
  },
]

export const platformPages: PlatformPage[] = [
  {
    slug: 'aws-commercial',
    title: 'AWS Commercial',
    pageSubtext:
      'Migrate workloads from AWS GovCloud to AWS Commercial with controls aligned to FISMA High and CMS hybrid-cloud strategy.',
    sections: [
      {
        id: 'overview',
        label: 'Overview',
        contentTitle: 'AWS GovCloud to Commercial Migration',
        paragraphs: [
          'This initiative aims to simplify operations and reduce costs by eliminating GovCloud-to-Commercial transit and consolidating workloads into AWS Commercial. Controls in the Commercial environment will be aligned with FISMA High requirements to support CMS\u2019s hybrid-cloud strategy. AWS will provide a control gap analysis and roadmap, while CMS will implement and validate compensating controls, accepting some risk mitigations that differ from the HIGH baseline. Applications currently in GovCloud will migrate to Commercial unless exceptional security or compliance needs require an alternative.',
        ],
      },
      ...defaultSections('AWS Commercial').filter((s) => s.id !== 'overview'),
    ],
  },
  {
    slug: 'aws-outposts',
    title: 'AWS Outposts',
    pageSubtext:
      'AWS infrastructure delivered on premises for workloads that require low-latency or data residency patterns.',
    sections: defaultSections('AWS Outposts'),
  },
  {
    slug: 'azure-commercial',
    title: 'Azure Commercial',
    pageSubtext:
      'Microsoft Azure Commercial cloud for CMS applications migrating from government-specific environments.',
    sections: defaultSections('Azure Commercial'),
  },
  {
    slug: 'google-cloud-platform',
    title: 'Google Cloud Platform',
    pageSubtext:
      'Google Cloud Platform hosting with select shared services and patterns aligned to CMS Hybrid Cloud standards.',
    sections: defaultSections('Google Cloud Platform'),
  },
  {
    slug: 'oracle-cloud-infrastructure',
    title: 'Oracle Cloud Infrastructure',
    pageSubtext:
      'Oracle Cloud Infrastructure (OCI) for Oracle-centric workloads and enterprise database hosting.',
    sections: defaultSections('Oracle Cloud Infrastructure'),
  },
  {
    slug: 'oracle-at-customer',
    title: 'Oracle at Customer',
    pageSubtext:
      'Oracle Cloud@Customer brings OCI capabilities into CMS-controlled data center space.',
    sections: defaultSections('Oracle at Customer'),
  },
]

export function getPlatformBySlug(slug: string): PlatformPage | undefined {
  return platformPages.find((p) => p.slug === slug)
}

export function platformInteriorPath(slug: string): string {
  return `/explore/platforms/${slug}`
}

export const platformNavLinks = platformPages.map((p) => ({
  label: p.title,
  href: platformInteriorPath(p.slug),
}))

/** Map Explore landing card titles to interior page slugs (when available). */
export const exploreCardHrefByTitle: Record<string, string> = {
  'AWS Commercial': platformInteriorPath('aws-commercial'),
  'AWS Outposts': platformInteriorPath('aws-outposts'),
  'Azure Commercial': platformInteriorPath('azure-commercial'),
  'Google Cloud (GCP)': platformInteriorPath('google-cloud-platform'),
  'Oracle Cloud@Customer': platformInteriorPath('oracle-at-customer'),
}
