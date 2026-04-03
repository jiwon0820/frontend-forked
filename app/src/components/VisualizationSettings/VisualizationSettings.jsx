import Toggle from '../Toggle/Toggle'
import style from './VisualizationSettings.module.css'

/**
 * 시각화 옵션 토글 3개를 묶은 컴포넌트.
 *
 * @param {Object} props
 * @param {{ showSkeleton: boolean, jointLoad: boolean, angleOverlay: boolean }} props.vizConfig
 * @param {Function} props.onChange - (key: string, value: boolean) => void
 * @returns {JSX.Element}
 */
export default function VisualizationSettings({ vizConfig, onChange }) {
    return (
        <div className={style.container}>
            <Toggle
                label="Show Skeleton"
                checked={vizConfig.showSkeleton}
                onChange={(v) => onChange('showSkeleton', v)}
            />
            <Toggle
                label="Joint Load"
                checked={vizConfig.jointLoad}
                onChange={(v) => onChange('jointLoad', v)}
            />
            <Toggle
                label="Angle Overlay"
                checked={vizConfig.angleOverlay}
                onChange={(v) => onChange('angleOverlay', v)}
            />
        </div>
    )
}
