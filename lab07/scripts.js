// เริ่มต้นการทำงานหลังจาก DOM โหลดเสร็จ
document.addEventListener("DOMContentLoaded", function () {
    // ดึงอ็อบเจกต์ของรายการ Todo, input, และปุ่ม "เพิ่ม" จาก HTML
    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");

    // อาร์เรย์สำหรับเก็บรายการ Todo
    let todos = [];

    // เพิ่มรายการ Todo เมื่อปุ่ม "เพิ่ม" ถูกคลิก
    function addTodo() {
        // ดึงข้อความจาก input และตัดช่องว่างที่อยู่ด้านหน้าและด้านหลัง
        const todoText = todoInput.value.trim();
        // ตรวจสอบว่าข้อความไม่เป็นค่าว่าง
        if (todoText !== "") {
            // สร้างอ็อบเจกต์ Todo ที่ประกอบด้วยข้อความและสถานะ "ยังไม่เสร็จสิ้น"
            const todoItem = {
                text: todoText,
                completed: false,
            };
            // เพิ่ม Todo ลงในอาร์เรย์
            todos.push(todoItem);
            // แสดงรายการ Todo อัพเดท
            renderTodoList();
            // ล้างค่าใน input
            todoInput.value = "";
        }
    }

    // ลบรายการ Todo ตาม index ที่ระบุ
    function deleteTodo(index) {
        todos.splice(index, 1);
        // แสดงรายการ Todo อัพเดท
        renderTodoList();
    }

    // เปลี่ยนสถานะ "เสร็จสิ้น" หรือ "ยังไม่เสร็จสิ้น" ของรายการ Todo ตาม index ที่ระบุ
    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        // แสดงรายการ Todo อัพเดท
        renderTodoList();
    }

    // แสดงรายการ Todo บนหน้าเว็บ
    function renderTodoList() {
        console.log(todos); // แสดงอาร์เรย์ todos ใน console เพื่อตรวจสอบ

        // ล้าง HTML ทั้งหมดที่อยู่ในรายการ Todo
        todoList.innerHTML = "";

        // สร้าง HTML สำหรับแต่ละรายการ Todo และเพิ่มลงในรายการ Todo
        for (let i = 0; i < todos.length; i++) {
            const todoItem = todos[i];
            const listItem = document.createElement("li");
            listItem.textContent = todoItem.text;

            // เพิ่ม class "completed" ถ้า Todo เสร็จสิ้นแล้ว
            if (todoItem.completed) {
                listItem.classList.add("completed");
            }

            // สร้างปุ่ม "ลบ" และเพิ่ม event listener ให้ลบรายการ Todo
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "ลบ";
            deleteButton.addEventListener("click", () => deleteTodo(i));

            // สร้างปุ่ม "เสร็จ" หรือ "ยกเลิก" และเพิ่ม event listener ให้เปลี่ยนสถานะ Todo
            const completeButton = document.createElement("button");
            completeButton.textContent = todoItem.completed ? "ยกเลิก" : "เสร็จ";
            completeButton.addEventListener("click", () => toggleComplete(i));

            // เพิ่มปุ่มลบและปุ่มเสร็จ/ยกเลิกลงในรายการ Todo
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);

            // เพิ่มรายการ Todo ลงใน HTML
            todoList.appendChild(listItem);
        }
    }

    // เพิ่ม event listener ให้ปุ่ม "เพิ่ม" เรียกใช้ฟังก์ชัน addTodo
    addButton.addEventListener("click", addTodo);

    // เพิ่ม event listener ให้ input เมื่อกด Enter เรียกใช้ฟังก์ชัน addTodo
    todoInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    // แสดงรายการ Todo ครั้งแรกที่หน้าเว็บโหลด
    renderTodoList();
});
