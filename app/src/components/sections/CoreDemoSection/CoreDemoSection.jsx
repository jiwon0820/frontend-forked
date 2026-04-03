import { useState } from 'react'
import Panel from '../../Panel/Panel'
import VideoUpload from '../../VideoUpload/VideoUpload'
import FpsSelector from '../../FpsSelector/FpsSelector'
import Button from '../../Button/Button'
import UploadIcon from '../../../assets/images/ArrowUp.png'
import style from './CoreDemoSection.module.css'

export default function CoreDemoSection() {
    const [videoFile, setVideoFile] = useState(null)
    const [fps, setFps] = useState(60)

    function handleStartAnalysis() {
        // TODO: Zustand store 연결 후 upload → polling 로직 구현
    }

    return (
        <section id="coreDemo" className={style.section}>
            <Panel icon={UploadIcon} label="Analysis Settings">
                <div className={style.panelContent}>
                    <VideoUpload file={videoFile} onFileSelect={setVideoFile} />
                    <FpsSelector value={fps} onChange={setFps} />
                    <Button
                        label="Start Analysis"
                        width="100%"
                        height="5.2rem"
                        onClick={handleStartAnalysis}
                    />
                </div>
            </Panel>
        </section>
    )
}
