import { useRef } from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onAdd, onCancel }) {
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        console.log('handleSave');
        const enteredTitle = title.current.value;
        const enteredDesc = description.current.value;
        const enteredDueDate = dueDate.current.value;

        //validate
        if (enteredTitle.trim() === '' ||
            enteredDesc.trim() === '' ||
            enteredDueDate.trim() === '') {
            modal.current.open();
            return;
        }

        // โยน object ใน onAdd นี้ไปให้กับต้นทางที่เรียก call มัน
        // ก็คือ func handleAddProject(prrojectData) ที่ App.jsx 
        // ดูได้จาก code <NewProject onAdd={handleAddProject}/> ที่มีการส่ง func handleAddProject มาให้ NewProject onAdd อีกที
        onAdd({
            title: enteredTitle,
            description: enteredDesc,
            dueDate: enteredDueDate
        }); // โยน object  กลับไป ที่ prrojectData
    }

    return (
        <>
            < Modal ref={modal} buttonCaption="ปิด">
                <h2 className="text-xl font-bold text-stone-700 my-4">เกิดข้อผิดพลาด</h2>
                <p className="text-stone-600 mb-4">ดูเหมือนว่าคุณจะลืมกรอกข้อมูลเกี่ยวกับโปรเจ็คของคุณ</p>
                <p className="text-stone-600 mb-4">โปรดกรอกข้อมูลให้ครบถ้วน</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li><button
                        onClick={handleSave}
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">บันทึก</button></li>
                    <li>
                        <button
                            onClick={onCancel}
                            className="text-stone-800 hover:text-stone-950">ยกเลิก</button>
                    </li>

                </menu>

                <div>
                    <Input type="text" ref={title} label="ชื่อโปรเจ็ค" />
                    <Input ref={description} label="รายละเอียด" isTextarea={true} />
                    <Input type="date" ref={dueDate} label="วันที่สิ้นสุด" />
                </div>
            </div>
        </>
    );
}