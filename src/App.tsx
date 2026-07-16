import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FloatingAssistDock } from './components/FloatingAssistDock'
import { ScrollToTop } from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import FusionToolkitLandingPage from './pages/FusionToolkitLandingPage'
import PlatformRoutePage from './pages/PlatformRoutePage'
import InitiativesPage from './pages/InitiativesPage'
import KnowledgeCenterPage from './pages/KnowledgeCenterPage'
import MavenIntegrationDevOpsPage from './pages/MavenIntegrationDevOpsPage'
import NavDemoPage from './pages/NavDemoPage'
import NavNewCcgPage from './pages/NavNewCcgPage'
import NavOption2Page from './pages/NavOption2Page'
import PageLayoutsPage from './pages/PageLayoutsPage'
import LandingPageTemplateDemoPage from './pages/LandingPageTemplateDemoPage'
import PageLayoutTemplatePage from './pages/PageLayoutTemplatePage'
import ThreeColumnTemplateDemoPage from './pages/ThreeColumnTemplateDemoPage'
import TwoColumnTemplateDemoPage from './pages/TwoColumnTemplateDemoPage'
import SharedServicesPage from './pages/SharedServicesPage'
import SharedServiceArticlePage from './pages/SharedServiceArticlePage'
import ProgramOverviewPage from './pages/ProgramOverviewPage'
import TrainingEnablementPage from './pages/TrainingEnablementPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FloatingAssistDock />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn/knowledge-center" element={<KnowledgeCenterPage />} />
        <Route path="/learn/knowledge-center/devops/maven-integration" element={<MavenIntegrationDevOpsPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/explore/platforms/:platformSlug" element={<PlatformRoutePage />} />
        <Route path="/explore/fusion-toolkit" element={<FusionToolkitLandingPage />} />
        <Route path="/explore/shared-services" element={<SharedServicesPage />} />
        <Route
          path="/explore/shared-services/:categorySlug/:serviceSlug"
          element={<SharedServiceArticlePage />}
        />
        <Route path="/learn/initiatives" element={<InitiativesPage />} />
        <Route path="/learn/training-enablement" element={<TrainingEnablementPage />} />
        <Route path="/nav-demo" element={<NavDemoPage />} />
        <Route path="/nav-new-ccg" element={<NavNewCcgPage />} />
        <Route path="/nav-option-2" element={<NavOption2Page />} />
        <Route path="/about/program-overview" element={<ProgramOverviewPage />} />
        <Route path="/resources/page-layouts" element={<PageLayoutsPage />} />
        <Route path="/resources/page-layouts/2-column" element={<TwoColumnTemplateDemoPage />} />
        <Route path="/resources/page-layouts/3-column" element={<ThreeColumnTemplateDemoPage />} />
        <Route path="/resources/page-layouts/landing" element={<LandingPageTemplateDemoPage />} />
        <Route path="/resources/page-layouts/:slug" element={<PageLayoutTemplatePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
