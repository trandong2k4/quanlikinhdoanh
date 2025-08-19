// Đợi cho toàn bộ nội dung trang web được tải xong rồi mới chạy code
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Tìm nút đăng xuất bằng ID mà chúng ta đã đặt
    const logoutButton = document.getElementById('logout-button');

    // 2. Kiểm tra xem nút có tồn tại không để tránh lỗi
    if (logoutButton) {
        
        // 3. Gắn một sự kiện "click" vào nút
        logoutButton.addEventListener('click', function(event) {
            
            // Ngăn chặn hành vi mặc định của thẻ <a> (là nhảy lên đầu trang)
            event.preventDefault();

            // 4. (Tùy chọn nhưng nên có) Hỏi người dùng để xác nhận
            const isConfirmed = confirm('Bạn có chắc chắn muốn đăng xuất không?');

            // 5. Nếu người dùng xác nhận, thực hiện chuyển hướng
            if (isConfirmed) {
                //alert('Đã đăng xuất. Hẹn gặp lại!');
                
                // Chuyển hướng về trang login.html trong thư mục 'form'
                window.location.href = 'form/login.html';
            }
        });
    }
});