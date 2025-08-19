document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('employee-modal');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const closeBtn = document.querySelector('.modal .close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const modalTitle = document.getElementById('modal-title');
    const employeeForm = document.getElementById('employee-form');
    const employeeIdField = document.getElementById('employee-id');

    // Hàm mở modal
    function openModal(mode = 'add', data = {}) {
        modal.style.display = 'flex'; // Sử dụng flex để căn giữa

        if (mode === 'edit') {
            modalTitle.textContent = 'Sửa thông tin nhân viên';
            employeeIdField.value = data.id;
            // Điền dữ liệu mẫu vào form
            document.getElementById('name').value = data.name;
            document.getElementById('role').value = data.role;
            document.getElementById('phone').value = data.phone;
            document.getElementById('status').value = data.status;
        } else {
            modalTitle.textContent = 'Thêm nhân viên mới';
            employeeForm.reset(); // Xóa các giá trị cũ trong form
            employeeIdField.value = '';
        }
    }

    // Hàm đóng modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Sự kiện click nút "Thêm mới"
    addEmployeeBtn.addEventListener('click', () => {
        openModal('add');
    });

    // Sự kiện click nút "Sửa" trên từng dòng
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            // Lấy dữ liệu từ dòng của bảng (trong thực tế sẽ lấy từ API)
            const row = this.closest('tr');
            const sampleData = {
                id: row.cells[0].textContent,
                name: row.cells[2].textContent,
                role: 'manager', // Giả sử giá trị
                phone: row.cells[5].textContent,
                status: 'active' // Giả sử giá trị
            };
            openModal('edit', sampleData);
        });
    });
    
    // Sự kiện click nút "Xóa"
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
                // Logic xóa ở đây (ví dụ: gọi API, xóa dòng khỏi bảng)
                this.closest('tr').remove();
                console.log('Đã xóa nhân viên.');
            }
        });
    });

    // Sự kiện click nút đóng (dấu X) và nút Hủy
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Đóng modal khi click ra ngoài
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Xử lý khi submit form
    employeeForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn form gửi đi theo cách truyền thống
        
        // Lấy dữ liệu từ form
        const formData = new FormData(this);
        const employeeData = Object.fromEntries(formData.entries());
        
        if (employeeData['employee-id']) {
            console.log('Đang cập nhật nhân viên:', employeeData);
            // Logic cập nhật ở đây
        } else {
            console.log('Đang thêm nhân viên mới:', employeeData);
            // Logic thêm mới ở đây
        }

        closeModal();
    });

});