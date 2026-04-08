import { useState } from 'react'
import HeroSection from './components/sections/HeroSection/HeroSection.jsx'
import MainHeader from './components/sections/MainHeader/MainHeader.jsx'
import CoreDemoSection from './components/sections/CoreDemoSection/CoreDemoSection.jsx'
import AnalysisDashboard from './components/sections/AnalysisDashboardSection/AnalysisDashboard.jsx'
import TechnicalPipelineSection from './components/sections/TechnicalPipelineSection/TechnicalPipelineSection.jsx'
import Footer from './components/sections/Footer/Footer.jsx'


function App() {
    const [analysisResult, setAnalysisResult] = useState(null)

    return (
        <>
            <MainHeader/>
            <HeroSection/>
            <CoreDemoSection onAnalysisComplete={setAnalysisResult}/>
            <AnalysisDashboard analysisResult={analysisResult}/>
            <TechnicalPipelineSection/>
            <Footer/>

        </>
    )
}

export default App
