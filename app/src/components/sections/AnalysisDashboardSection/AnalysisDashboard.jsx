import style from './AnalysisDashboard.module.css';
import Panel from '../../Panel/Panel.jsx';
import SectionContainer from '../../SectionContainer/SectionContainer.jsx';
import MetricsList from '../../MetricsList/MetricsList.jsx';
import LlmFeedback from '../../LlmFeedback/LlmFeedback.jsx';
import RawSkeletonJson from '../../RawSkeletonJson/RawSkeletonJson.jsx';

export default function AnalysisDashboard({ analysisResult }){
    const placeholder = (
        <div className={style.placeholder}>
            <span className={style.placeholderIcon}>—</span>
            <span>Run an analysis to see results.</span>
        </div>
    )

    return(
        <SectionContainer
            id='dataInsight'
            heading='ANALYSIS DASHBOARD'
            description='Turn skeleton data into actionable insight. Explore biomechanical metrics and AI-generated movement feedback in one unified view.'
        >
            <div className={style.contents}>
                <Panel
                    label='BIOMECHANICS METRICS'
                >
                    {analysisResult
                        ? <MetricsList metrics={analysisResult.metrics} />
                        : placeholder
                    }
                </Panel>
                <Panel
                    label='LLM FEEDBACK'
                >
                    {analysisResult
                        ? <LlmFeedback LlmFeedback={analysisResult.feedback} />
                        : placeholder
                    }
                </Panel>
                <Panel
                    label='RAW SKELETON JSON'
                >
                    {analysisResult
                        ? <RawSkeletonJson skeletonJson={analysisResult.skeletonJson} />
                        : placeholder
                    }
                </Panel>
            </div>
        </SectionContainer>

    )
}
