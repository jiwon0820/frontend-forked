import { useState } from 'react'
import Panel from '../../Panel/Panel'
import VideoUpload from '../../VideoUpload/VideoUpload'
import FpsSelector from '../../FpsSelector/FpsSelector'
import Button from '../../Button/Button'
import VisualizationSettings from '../../VisualizationSettings/VisualizationSettings'
import SkeletonViewer from '../../SkeletonViewer/SkeletonViewer'
import UploadIcon from '../../../assets/images/icon_ArrowUp.png'
import SettingIcon from '../../../assets/images/icon_setting.png'
import style from './CoreDemoSection.module.css'

export default function CoreDemoSection() {
    const [videoFile, setVideoFile] = useState(null)
    const [fps, setFps] = useState(60)
    const [status, setStatus] = useState('idle') // AnalysisStatus
    const [skeletonData, setSkeletonData] = useState(null)
    const [analysisResult, setAnalysisResult] = useState(null)
    const [vizConfig, setVizConfig] = useState({
        showSkeleton: true,
        jointLoad: false,
        angleOverlay: false,
    })

    function handleVizChange(key, value) {
        setVizConfig(prev => ({ ...prev, [key]: value }))
    }

    function handleStartAnalysis() {
        // TODO: Zustand store 연결 후 upload → polling 로직 구현
    }

    return (
        <section id="coreDemo" className={style.section}>
            <div className={style.layout}>
                {/* Left column: settings panels */}
                <div className={style.leftColumn}>
                    <Panel icon={UploadIcon} label="Analysis Settings">
                        <div className={style.panelContent}>
                            <VideoUpload file={videoFile} onFileSelect={setVideoFile} />
                            <FpsSelector value={fps} onChange={setFps} />
                            <Button
                                label="Start Analysis"
                                width="100%"
                                height="5.2rem"
                                onClick={handleStartAnalysis}
                                disabled={!videoFile}
                            />
                        </div>
                    </Panel>
                    <Panel icon={SettingIcon} label="Visualization Settings">
                        <VisualizationSettings vizConfig={vizConfig} onChange={handleVizChange} />
                    </Panel>
                </div>

                {/* Right column: Live Sync View */}
                <div className={style.rightColumn}>
                    <SkeletonViewer
                        videoFile={videoFile}
                        skeletonData={skeletonData}
                        analysisResult={analysisResult}
                        vizConfig={vizConfig}
                        status={status}
                    />
                </div>
            </div>
        </section>
    )
}
