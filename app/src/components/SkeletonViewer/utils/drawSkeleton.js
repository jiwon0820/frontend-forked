import { POSE_EDGES, LOAD_JOINTS, ANGLE_JOINTS } from './poseEdges.js'

const VIS_THRESHOLD = 0.5

function lm(landmarks, idx) {
    return landmarks?.[idx]
}

/**
 * 스켈레톤 선/점을 캔버스에 그린다.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array<{x:number, y:number, z:number, visibility:number}>} landmarks
 * @param {number} w - canvas.width
 * @param {number} h - canvas.height
 */
export function drawSkeleton(ctx, landmarks, w, h) {
    if (!landmarks || landmarks.length < 33) return
    ctx.save()

    // edges
    ctx.strokeStyle = '#00D4FF'
    ctx.lineWidth = 2
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    for (const [i, j] of POSE_EDGES) {
        const a = lm(landmarks, i)
        const b = lm(landmarks, j)
        if (!a || !b) continue
        if ((a.visibility ?? 1) < VIS_THRESHOLD || (b.visibility ?? 1) < VIS_THRESHOLD) continue

        ctx.beginPath()
        ctx.moveTo(a.x * w, a.y * h)
        ctx.lineTo(b.x * w, b.y * h)
        ctx.stroke()
    }

    // joints
    for (let i = 0; i < landmarks.length; i++) {
        const p = landmarks[i]
        if (!p || (p.visibility ?? 1) < VIS_THRESHOLD) continue

        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#FFFFFF'
        ctx.fill()
        ctx.strokeStyle = '#00D4FF'
        ctx.lineWidth = 1.5
        ctx.stroke()
    }

    ctx.restore()
}

/**
 * 관절 부하를 방사형 그라디언트 히트맵으로 그린다.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} landmarks
 * @param {Object<string,number>} jointLoad - 0~1 normalized
 * @param {number} w
 * @param {number} h
 */
export function drawHeatmap(ctx, landmarks, jointLoad, w, h) {
    if (!landmarks || !jointLoad) return
    ctx.save()

    for (const [jointName, landmarkIdx] of Object.entries(LOAD_JOINTS)) {
        const load = jointLoad[jointName]
        if (load === undefined || load === null) continue

        const p = lm(landmarks, landmarkIdx)
        if (!p || (p.visibility ?? 1) < VIS_THRESHOLD) continue

        const x = p.x * w
        const y = p.y * h
        const radius = 28

        // blue(low) → orange → red(high)
        let r, g, b
        const t = Math.max(0, Math.min(1, load))
        if (t < 0.5) {
            const s = t / 0.5
            r = Math.round(13 + (255 - 13) * s)
            g = Math.round(147 + (165 - 147) * s)
            b = Math.round(242 * (1 - s))
        } else {
            const s = (t - 0.5) / 0.5
            r = 255
            g = Math.round(165 * (1 - s))
            b = 0
        }

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius)
        grad.addColorStop(0, `rgba(${r},${g},${b},0.65)`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
    }

    ctx.restore()
}

/**
 * 주요 관절에 각도 수치를 텍스트로 그린다.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} landmarks
 * @param {Object<string,number>} jointAngles - degrees
 * @param {number} w
 * @param {number} h
 */
export function drawAngles(ctx, landmarks, jointAngles, w, h) {
    if (!landmarks || !jointAngles) return
    ctx.save()
    ctx.font = 'bold 12px monospace'

    for (const [jointName, { vertex }] of Object.entries(ANGLE_JOINTS)) {
        const angle = jointAngles[jointName]
        if (angle === undefined || angle === null) continue

        const p = lm(landmarks, vertex)
        if (!p || (p.visibility ?? 1) < VIS_THRESHOLD) continue

        const text = `${Math.round(angle)}°`
        const metrics = ctx.measureText(text)
        const pad = 4
        const bw = metrics.width + pad * 2
        const bh = 16

        const tx = p.x * w + 10
        const ty = p.y * h

        ctx.fillStyle = 'rgba(10,10,12,0.72)'
        ctx.fillRect(tx - pad, ty - bh * 0.75, bw, bh)

        ctx.fillStyle = '#E8F4FD'
        ctx.fillText(text, tx, ty)
    }

    ctx.restore()
}
