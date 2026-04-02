import style from './Components.module.css'
import Button from './components/Button/Button';

export default function components(){
    return(
    <div className={style.background}>
        <Button
            
        />
        <Button
            theme='negative'
        />
    </div>
    )
}