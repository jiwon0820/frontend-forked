import style from './LlmFeedback.module.css';

export default function LlmFeedback({LlmFeedback}){
    return(
        <article className={style.LlmFeedbackConatiner}>
            <p className={LlmFeedback}>
                {LlmFeedback}
            </p>
        </article>
    )
}
