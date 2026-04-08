import style from './TechnicalPipelineSection.module.css'
import SectionContainer from '../../SectionContainer/SectionContainer'
import { hypotheses, pipelineSteps } from './TechnicalPipelineSection.mock'

export default function TechnicalPipelineSection() {
    return (
        <div className={style.sectionWrapper}>
            <SectionContainer id="technicalPipeline">
                <div className={style.intro}>
                    <h2 className={style.introHeading}>Technical Pipeline</h2>
                    <p className={style.introDescription}>Technical architecture supporting MVP v1</p>
                </div>
    
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
    
                <div className={style.pipelineSteps}>
                    {pipelineSteps.map((step) => (
                        <div key={step.number} className={style.stepItem}>
                            <div className={style.stepNumberBox}>
                                <span className={style.stepNumber}>{step.number}</span>
                            </div>
                            <h4 className={style.stepName}>{step.name}</h4>
                            <p className={style.stepDescription}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </div>
    )
}
