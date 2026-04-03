import { useRef, useState, useEffect, useCallback } from 'react'
import { useVideoSync } from './hooks/useVideoSync.js'
import style from './SkeletonViewer.module.css'

const PLAYBACK_RATES = [0.5, 1.0, 2.0]

function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = (seconds % 60).toFixed(1).padStart(4, '0')
    return `${String(m).padStart(2, '0')}:${s}s`
}

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
    const [playbackRate, setPlaybackRate] = useState(1.0)
    const [canvasReady, setCanvasReady] = useState(false)

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

    // 배속 변경
    useEffect(() => {
        if (videoRef.current) videoRef.current.playbackRate = playbackRate
    }, [playbackRate])

    // Canvas 렌더링 루프
    useVideoSync({
        videoRef,
        canvasRef,
        skeletonData: canvasReady ? skeletonData : null,
        analysisResult,
        vizConfig,
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

    function stepFrame(direction) {
        const fps = skeletonData?.fps ?? 30
        const video = videoRef.current
        if (!video) return
        const next = Math.max(0, Math.min(duration, video.currentTime + direction / fps))
        video.currentTime = next
        setCurrentTime(next)
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
                <span className={style.title}>Live Sync View</span>
                {isDone && (
                    <span className={style.frameInfo}>
                        Frame {String(frameIndex + 1).padStart(3, '0')} / {totalFrames}
                        <span className={style.separator}>·</span>
                        {formatTime(currentTime)}
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
            {isDone && (
                <div className={style.controls}>
                    <div className={style.scrubberWrap}>
                        <input
                            type="range"
                            className={style.scrubber}
                            min={0}
                            max={duration || 1}
                            step={skeletonData ? 1 / skeletonData.fps : 0.033}
                            value={currentTime}
                            onChange={handleScrub}
                        />
                    </div>
                    <div className={style.controlRow}>
                        <div className={style.playControls}>
                            <button
                                className={style.ctrlBtn}
                                onClick={() => stepFrame(-1)}
                                title="Previous frame"
                            >
                                &#9664;&#9664;
                            </button>
                            <button
                                className={`${style.ctrlBtn} ${style.playBtn}`}
                                onClick={togglePlay}
                                title={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? '⏸' : '▶'}
                            </button>
                            <button
                                className={style.ctrlBtn}
                                onClick={() => stepFrame(1)}
                                title="Next frame"
                            >
                                &#9654;&#9654;
                            </button>
                        </div>
                        <div className={style.speedControls}>
                            {PLAYBACK_RATES.map(rate => (
                                <button
                                    key={rate}
                                    className={`${style.speedBtn} ${playbackRate === rate ? style.activeSpeed : ''}`}
                                    onClick={() => setPlaybackRate(rate)}
                                >
                                    {rate}x
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
