import style from './RawSkeletonJson.module.css'

export default function RawSkeletonJson({skeletonJson}){
    return(
        <article className={style.RawSkeletonJsonConatiner}>
            <pre className={style.RawSkeletonJson}>
                {JSON.stringify(skeletonJson, null, 2)}
            </pre>
        </article>
    )
}