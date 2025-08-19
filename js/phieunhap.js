document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('receipt-modal');
    const addReceiptBtn = document.getElementById('add-receipt-btn');
    const closeBtn = document.querySelector('#receipt-modal .close-btn');
    const cancelBtn = document.getElementById('cancel-receipt-btn');
    const receiptForm = document.getElementById('receipt-form');

    // Hàm mở modal
    function openModal() {
        receiptForm.reset(); // Làm mới form
        // Set ngày nhập kho dự kiến là ngày hiện tại
        document.getElementById('import-date').valueAsDate = new Date();
        modal.style.display = 'flex';
    }

    // Hàm đóng modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Sự kiện click nút "Tạo Phiếu Nhập"
    if (addReceiptBtn) {
        addReceiptBtn.addEventListener('click', openModal);
    }
    
    // Sự kiện click các nút đóng modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Đóng modal khi click ra ngoài vùng nội dung
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Xử lý khi submit form
    if (receiptForm) {
        receiptForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn form gửi đi
            
            const formData = new FormData(this);
            const receiptData = Object.fromEntries(formData.entries());
            
            console.log('Đang tạo phiếu nhập mới:', receiptData);
            // Logic gọi API để lưu phiếu nhập vào database
            
            alert('Đã tạo phiếu nhập thành công!');
            closeModal();
        });
    }

    // Logic cho các nút khác như Sửa, Xóa...
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Bạn có muốn xóa phiếu nhập này?')) {
                this.closest('tr').remove();
                console.log('Đã xóa phiếu nhập.');
            }
        });
    });

});