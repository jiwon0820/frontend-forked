import style from './AnalysisDashboard.module.css';

export default function AnalysisDashboard(){
    return(
        <section className={style.sectionContainer}>
            <div className={style.sectionIntro}>
                <h2 className={style.sectionHeading}>
                    ANALYSIS DASHBOARD
                </h2>
                <p className={style.sectionDescription}>
                    Precise feedback output through frame data and kinematic models
                </p>
            </div>
        </section>
    )
}