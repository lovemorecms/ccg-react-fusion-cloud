import { useParams } from 'react-router-dom'
import { getPlatformArticleBySlug } from '../data/platformArticleContent'
import AzurePlatformPage from './AzurePlatformPage'
import GcpPlatformPage from './GcpPlatformPage'
import PlatformArticlePage from './PlatformArticlePage'
import PlatformInteriorPage from './PlatformInteriorPage'

export default function PlatformRoutePage() {
  const { platformSlug } = useParams<{ platformSlug: string }>()

  if (platformSlug === 'google-cloud-platform') {
    return <GcpPlatformPage />
  }

  if (platformSlug === 'azure-commercial') {
    return <AzurePlatformPage />
  }

  if (platformSlug && getPlatformArticleBySlug(platformSlug)) {
    return <PlatformArticlePage articleSlug={platformSlug} />
  }

  return <PlatformInteriorPage />
}
