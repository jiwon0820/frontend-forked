import style from './AnalysisDashboard.module.css';
import Panel from '../../Panel/Panel.jsx';
import SectionContainer from '../../SectionContainer/SectionContainer.jsx';
import MetricsList from '../../MetricsList/MetricsList.jsx';
import LlmFeedback from '../../LlmFeedback/LlmFeedback.jsx';
import RawSkeletonJson from '../../RawSkeletonJson/RawSkeletonJson.jsx';
import { squatMetrics, feedbackText, rawSkeletonJson } from './AnalysisDashboard.mock.js';

export default function AnalysisDashboard(){
    return(
        <SectionContainer
            heading='ANALYSIS DASHBOARD'
            description='Turn skeleton data into actionable insight. Explore biomechanical metrics and AI-generated movement feedback in one unified view.'
        >
            <div className={style.contents}>
                <Panel
                    label='BIOMECHANICS METRICS'
                >
                    <MetricsList
                        metrics={squatMetrics}
                    />
                </Panel>
                <Panel
                    label='LLM FEEDBACK'
                >
                    <LlmFeedback
                        LlmFeedback={feedbackText}
                    />
                </Panel>
                <Panel
                    label='RAW SKELETON JSON'
                >
                    <RawSkeletonJson
                        skeletonJson={rawSkeletonJson}
                    />
                </Panel>
            </div>
        </SectionContainer>

    )
}
