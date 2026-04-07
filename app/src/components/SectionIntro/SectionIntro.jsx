import style from './SectionIntro.module.css'

/**
 * 섹션 제목과 설명을 표시하는 공통 인트로 컴포넌트.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.heading - 섹션 제목 (`h2`에 렌더링)
 * @param {React.ReactNode} props.description - 섹션 설명 (`p`에 렌더링)
 */
export default function SectionIntro({ heading, description }) {
    return (
        <div className={style.sectionIntro}>
            <h2 className={style.sectionHeading}>{heading}</h2>
            <p className={style.sectionDescription}>{description}</p>
        </div>
    )
}
