import noProjectImg from '../assets/no-projects.png'
import Button from './Button.jsx'

export default function NoProjectSelected({onStartAddProject}){
    return(
        <div className="mt-24 text-center w-2/3">
            <img src={noProjectImg} alt="empty task" className='w-16 h-16 object-contain mx-auto' />
            <h2 className='text-xl font-bold text-stone-500 my-4'>
                ไม่พบข้อมูลโปรเจ็ค
            </h2>
            <p className='text-stone-400 mb-4'>
                เลือกโปรเจ็คหรือเริ่มต้นสร้างโปรเจ็คใหม่
            </p>
            <p className='mt-8'>
                <Button 
                    onClick={onStartAddProject}
                    className=''>สร้างโปรเจ็คใหม่</Button>
            </p>
        </div>

    );
}