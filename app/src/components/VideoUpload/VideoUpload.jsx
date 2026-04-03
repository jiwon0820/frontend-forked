import style from './VideoUpload.module.css'

/**
 * 동영상 파일 선택 영역 컴포넌트.
 *
 * @param {Object} props
 * @param {File|null} props.file - 현재 선택된 파일. null이면 안내 텍스트 표시.
 * @param {Function} [props.onFileSelect] - 파일 선택 시 File 객체를 인자로 호출.
 * @returns {JSX.Element}
 */
export default function VideoUpload({ file, onFileSelect }) {
    function handleChange(e) {
        const selected = e.target.files[0]
        if (selected) onFileSelect?.(selected)
    }

    return (
        <label className={`${style.uploadArea} ${file ? style.selected : ''}`}>
            <input
                type="file"
                accept="video/mp4,video/quicktime"
                className={style.input}
                onChange={handleChange}
            />
            {file ? (
                <svg className={style.icon} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M7 16l7 7L25 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ) : (
                <svg className={style.icon} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M16 22V10M16 10L11 15M16 10L21 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 26h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            )}
            <span className={style.label}>
                {file ? file.name : 'Upload Workout Video'}
            </span>
            <span className={style.sub}>
                {file ? 'Click to change file' : 'MP4, MOV (Max. 50MB)'}
            </span>
        </label>
    )
}
