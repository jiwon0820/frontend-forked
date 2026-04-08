import style from './Footer.module.css'
import Logo from '../../../assets/images/Logo.svg'

export default function Footer(){
    return(
        <footer className={style.footer}>
            <img
                className={style.logo}
                src= {Logo}
            />
            <p className={style.projectName}>RACK LABS</p>
            <p className={style.copyright}><small>
                © 2024 RACKLABS. All Rights Reserved. Prototype MVP v1 Project.
            </small></p>
        </footer>
    )
}