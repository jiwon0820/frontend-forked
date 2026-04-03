import style from './FpsSelector.module.css'

const FPS_OPTIONS = [30, 60, 120]

/**
 * Sampling Rate(FPS) 토글 선택 컴포넌트.
 *
 * @param {Object} props
 * @param {30|60|120} [props.value=60] - 현재 선택된 FPS 값.
 * @param {Function} [props.onChange] - FPS 선택 시 숫자 값을 인자로 호출.
 * @returns {JSX.Element}
 */
export default function FpsSelector({ value = 60, onChange }) {
    return (
        <div className={style.container}>
            <span className={style.label}>Sampling Rate (FPS)</span>
            <div className={style.options}>
                {FPS_OPTIONS.map(fps => (
                    <button
                        key={fps}
                        type="button"
                        className={`${style.option} ${value === fps ? style.selected : ''}`}
                        onClick={() => onChange?.(fps)}
                    >
                        {fps} FPS
                    </button>
                ))}
            </div>
        </div>
    )
}
