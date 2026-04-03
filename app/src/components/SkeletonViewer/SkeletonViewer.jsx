import { useRef, useState, useEffect, useCallback } from 'react'
import { useVideoSync } from './hooks/useVideoSync.js'
import style from './SkeletonViewer.module.css'

/**
 * Live Sync View — 원본 영상 위에 스켈레톤/히트맵/각도를 동기 오버레이해 재생한다.
 *
 * @param {Object} props
 * @param {File|null}   props.videoFile      - 원본 동영상 File 객체
 * @param {Object|null} props.skeletonData   - 백엔드 skeleton JSON
 * @param {Object|null} props.analysisResult - 백엔드 analysis JSON
 * @param {Object}      props.vizConfig      - { showSkeleton, jointLoad, angleOverlay }
 * @param {string}      props.status         - AnalysisStatus
 */
export default function SkeletonViewer({
    videoFile,
    skeletonData,
    analysisResult,
    vizConfig,
    status,
}) {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const [videoURL, setVideoURL] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [canvasReady, setCanvasReady] = useState(false)
    const [skeletonHidden, setSkeletonHidden] = useState(false)

    // videoFile → objectURL
    useEffect(() => {
        if (!videoFile) { setVideoURL(null); return }
        const url = URL.createObjectURL(videoFile)
        setVideoURL(url)
        setIsPlaying(false)
        setCurrentTime(0)
        setDuration(0)
        setCanvasReady(false)
        return () => URL.revokeObjectURL(url)
    }, [videoFile])

    // 메타데이터 로드 → canvas 내부 해상도를 영상 원본 해상도에 맞춤
    const handleLoadedMetadata = useCallback(() => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (!video || !canvas) return
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        setDuration(video.duration)
        setCanvasReady(true)
    }, [])

    // Canvas 렌더링 루프
    const mergedVizConfig = { ...vizConfig, showSkeleton: vizConfig?.showSkeleton && !skeletonHidden }
    useVideoSync({
        videoRef,
        canvasRef,
        skeletonData: canvasReady ? skeletonData : null,
        analysisResult,
        vizConfig: mergedVizConfig,
    })

    function handleTimeUpdate() {
        setCurrentTime(videoRef.current?.currentTime ?? 0)
    }

    function handleVideoEnd() {
        setIsPlaying(false)
    }

    function togglePlay() {
        const video = videoRef.current
        if (!video) return
        if (video.paused) {
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }
    }

    function handleScrub(e) {
        const time = parseFloat(e.target.value)
        if (videoRef.current) videoRef.current.currentTime = time
        setCurrentTime(time)
    }

    const isDone = status === 'done'
    const isLoading = status === 'uploading' || status === 'analyzing'

    const frameIndex = skeletonData
        ? Math.min(Math.round(currentTime * skeletonData.fps), skeletonData.frames.length - 1)
        : 0
    const totalFrames = skeletonData?.frames?.length ?? 0

    return (
        <div className={style.container}>
            {/* Header */}
            <div className={style.header}>
                <div className={style.titleGroup}>
                    <span className={style.liveDot} />
                    <span className={style.title}>LIVE SYNC VIEW</span>
                </div>
                {isDone && (
                    <span className={style.frameInfo}>
                        FRAME: {String(frameIndex + 1).padStart(4, '0')} / {String(totalFrames).padStart(4, '0')}
                    </span>
                )}
            </div>

            {/* Viewport */}
            <div className={style.viewport}>
                {isDone && videoURL ? (
                    <>
                        <video
                            ref={videoRef}
                            src={videoURL}
                            className={style.video}
                            onLoadedMetadata={handleLoadedMetadata}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleVideoEnd}
                            playsInline
                            muted
                        />
                        <canvas ref={canvasRef} className={style.canvas} />
                    </>
                ) : isLoading ? (
                    <div className={style.stateOverlay}>
                        <div className={style.spinner} />
                        <p className={style.stateText}>
                            {status === 'uploading' ? 'Uploading...' : 'Analyzing...'}
                        </p>
                    </div>
                ) : status === 'error' ? (
                    <div className={style.stateOverlay}>
                        <p className={`${style.stateText} ${style.errorText}`}>
                            Analysis failed. Please try again.
                        </p>
                    </div>
                ) : (
                    <div className={style.stateOverlay}>
                        <div className={style.placeholderIcon}>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                                <path d="M19 16l14 8-14 8V16z" fill="rgba(255,255,255,0.3)"/>
                            </svg>
                        </div>
                        <p className={style.stateText}>Upload a video to begin</p>
                        <p className={style.stateSubText}>Results will appear here after analysis</p>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className={style.controls}>
                <div className={style.controlMeta}>
                    <span className={style.timelineLabel}>TIMELINE CONTROL</span>
                    {isDone && <span className={style.analysisActive}>ANALYSIS ACTIVE</span>}
                </div>
                <div className={style.controlMain}>
                    <div className={style.timelineBarWrap}>
                        <input
                            type="range"
                            className={style.scrubber}
                            min={0}
                            max={duration || 1}
                            step={skeletonData ? 1 / skeletonData.fps : 0.033}
                            value={currentTime}
                            onChange={handleScrub}
                            disabled={!isDone}
                            style={{ '--progress': duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                        />
                    </div>
                    <div className={style.actionButtons}>
                        <button
                            className={style.actionBtn}
                            onClick={togglePlay}
                            disabled={!isDone}
                        >
                            {isPlaying ? 'PAUSE' : 'PLAY'}
                        </button>
                        <button
                            className={`${style.actionBtn} ${skeletonHidden ? style.actionBtnActive : ''}`}
                            onClick={() => setSkeletonHidden(v => !v)}
                            disabled={!isDone}
                        >
                            {skeletonHidden ? 'SHOW SKELETON' : 'HIDE SKELETON'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
