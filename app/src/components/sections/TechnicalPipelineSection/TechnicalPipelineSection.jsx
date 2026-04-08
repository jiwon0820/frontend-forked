import style from './TechnicalPipelineSection.module.css'
import SectionContainer from '../../SectionContainer/SectionContainer'
import { hypotheses, pipelineSteps, architectureLayers, jobStatusStages, apiEndpoints } from './TechnicalPipelineSection.mock'
import LogoFastAPI from '../../../assets/images/Logo_FastAPI.svg'
import LogoOpenCV from '../../../assets/images/Logo_OpenCV.svg'
import LogoMediaPipe from '../../../assets/images/Logo_MediaPipe.svg'
import LogoPython from '../../../assets/images/Logo_Python.svg'
import LogoNumPy from '../../../assets/images/Logo_NumPy.svg'
import LogoClaude from '../../../assets/images/Logo_Claude.svg'

const tagLogoMap = {
    FastAPI: LogoFastAPI,
    OpenCV: LogoOpenCV,
    MediaPipe: LogoMediaPipe,
    Python: LogoPython,
    NumPy: LogoNumPy,
    LLM: LogoClaude,
}

export default function TechnicalPipelineSection() {
    return (
        <div className={style.sectionWrapper}>
            <SectionContainer id="technicalPipeline">

                {/* Header */}
                <div className={style.intro}>
                    <span className={style.introLabel}>Architecture</span>
                    <h2 className={style.introHeading}>Technical Pipeline</h2>
                    <p className={style.introDescription}>
                        FastAPI backend with async job processing, OpenCV frame extraction,
                        MediaPipe BlazePose inference, and LLM-generated coaching feedback.
                    </p>
                </div>

                {/* Pipeline Flow */}
                <div className={style.pipelineFlow}>
                    {pipelineSteps.map((step, index) => (
                        <div key={step.number} className={style.pipelineStepWrapper}>
                            <div className={style.pipelineStep}>
                                <div className={style.stepHeader}>
                                    <span className={style.stepIndex}>{step.number}</span>
                                    <span
                                        className={style.stepTag}
                                        style={{ '--tag-color': step.tagColor }}
                                    >
                                        {step.tag}
                                    </span>
                                </div>
                                {tagLogoMap[step.tag] && (
                                    <img
                                        src={tagLogoMap[step.tag]}
                                        alt={step.tag}
                                        className={style.stepLogo}
                                    />
                                )}
                                <h4 className={style.stepName}>{step.name}</h4>
                                <p className={style.stepDescription}>{step.description}</p>
                            </div>
                            {index < pipelineSteps.length - 1 && (
                                <div className={style.stepConnector} aria-hidden="true">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Panels */}
                <div className={style.bottomPanels}>

                    {/* Architecture Layers */}
                    <div className={style.panel}>
                        <h3 className={style.panelHeading}>Architecture Layers</h3>
                        <div className={style.layerList}>
                            {architectureLayers.map((layer) => (
                                <div key={layer.index} className={style.layerItem}>
                                    <div className={style.layerLeft}>
                                        <span className={style.layerIndex}>{layer.index}</span>
                                        <div className={style.layerInfo}>
                                            <span className={style.layerName}>{layer.name}</span>
                                            <span className={style.layerDescription}>{layer.description}</span>
                                        </div>
                                    </div>
                                    <code className={style.layerFiles}>{layer.files}</code>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Async Job Model */}
                    <div className={style.panel}>
                        <h3 className={style.panelHeading}>Async Job Model</h3>
                        <div className={style.jobModel}>
                            <div className={style.jobStages}>
                                {jobStatusStages.map((stage, index) => (
                                    <div key={stage.status} className={style.jobStageRow}>
                                        <div className={`${style.jobStage} ${stage.isTerminal ? style.jobStageTerminal : ''}`}>
                                            <span className={style.jobStatusBadge}>{stage.status}</span>
                                            <span className={style.jobStageRatio}>{stage.ratio}</span>
                                        </div>
                                        {index < jobStatusStages.length - 1 && (
                                            <div className={style.jobArrow} aria-hidden="true">↓</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className={style.apiEndpoints}>
                                {apiEndpoints.map((endpoint) => (
                                    <div key={endpoint.path} className={style.apiEndpoint}>
                                        <span className={style.apiMethod}>{endpoint.method}</span>
                                        <code className={style.apiPath}>{endpoint.path}</code>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* R&D Hypotheses */}
                <div className={style.hypothesesPanel}>
                    <h3 className={style.hypothesesHeading}>MVP v1 R&D Hypotheses</h3>
                    <div className={style.hypothesesGrid}>
                        {hypotheses.map((text, index) => (
                            <div key={index} className={style.hypothesisItem}>
                                <span className={style.bullet} aria-hidden="true" />
                                <p className={style.hypothesisText}>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </SectionContainer>
        </div>
    )
}
