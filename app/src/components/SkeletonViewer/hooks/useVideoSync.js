import { useEffect, useRef } from 'react'
import { drawSkeleton, drawHeatmap, drawAngles } from '../utils/drawSkeleton.js'

/**
 * video.currentTime에 따라 매 프레임 canvas 위에 스켈레톤/히트맵/각도를 렌더링한다.
 *
 * @param {Object} params
 * @param {React.RefObject<HTMLVideoElement>} params.videoRef
 * @param {React.RefObject<HTMLCanvasElement>} params.canvasRef
 * @param {Object|null} params.skeletonData
 * @param {Object|null} params.analysisResult
 * @param {Object} params.vizConfig - { showSkeleton, jointLoad, angleOverlay }
 */
export function useVideoSync({ videoRef, canvasRef, skeletonData, analysisResult, vizConfig }) {
    const rafRef = useRef(null)
    // Ref로 최신 vizConfig를 추적 — RAF 루프 재시작 없이 실시간 반영
    const vizConfigRef = useRef(vizConfig)
    useEffect(() => { vizConfigRef.current = vizConfig }, [vizConfig])

    useEffect(() => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (!video || !canvas || !skeletonData) return

        const fps = skeletonData.fps
        const frames = skeletonData.frames
        const analysisFrames = analysisResult?.frames ?? null

        function renderFrame() {
            const vc = vizConfigRef.current
            const ctx = canvas.getContext('2d')
            const cw = canvas.width
            const ch = canvas.height

            const frameIndex = Math.min(
                Math.round(video.currentTime * fps),
                frames.length - 1
            )
            const frame = frames[frameIndex]
            const metrics = analysisFrames?.[frameIndex] ?? null

            ctx.clearRect(0, 0, cw, ch)

            if (frame?.landmarks) {
                if (vc.showSkeleton) {
                    drawSkeleton(ctx, frame.landmarks, cw, ch)
                }
                if (vc.jointLoad && metrics?.joint_load) {
                    drawHeatmap(ctx, frame.landmarks, metrics.joint_load, cw, ch)
                }
                if (vc.angleOverlay && metrics?.joint_angles) {
                    drawAngles(ctx, frame.landmarks, metrics.joint_angles, cw, ch)
                }
            }

            rafRef.current = requestAnimationFrame(renderFrame)
        }

        rafRef.current = requestAnimationFrame(renderFrame)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [videoRef, canvasRef, skeletonData, analysisResult])
}
