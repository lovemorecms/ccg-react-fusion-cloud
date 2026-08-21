import { useParams } from 'react-router-dom'
import { getPlatformArticleBySlug } from '../data/platformArticleContent'
import AzurePlatformPage from './AzurePlatformPage'
import GcpPlatformPage from './GcpPlatformPage'
import GcpPlatformPageV2 from './GcpPlatformPageV2'
import PlatformArticlePage from './PlatformArticlePage'
import PlatformInteriorPage from './PlatformInteriorPage'

export default function PlatformRoutePage() {
  const { platformSlug } = useParams<{ platformSlug: string }>()

  if (platformSlug === 'google-cloud-platform') {
    return <GcpPlatformPage />
  }

  if (platformSlug === 'google-cloud-platform-v2') {
    return <GcpPlatformPageV2 />
  }

  if (platformSlug === 'azure-commercial') {
    return <AzurePlatformPage />
  }

  if (platformSlug && getPlatformArticleBySlug(platformSlug)) {
    return <PlatformArticlePage articleSlug={platformSlug} />
  }

  return <PlatformInteriorPage />
}
