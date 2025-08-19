// Đợi cho toàn bộ nội dung trang web được tải xong rồi mới chạy code
document.addEventListener('DOMContentLoaded', function() {

    // 1. Lấy ra các phần tử HTML cần thiết qua ID
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // 2. Gắn một sự kiện "submit" vào form
    loginForm.addEventListener('submit', function(event) {
        
        // Ngăn chặn hành vi mặc định của form là tải lại trang
        event.preventDefault();

        // 3. Lấy giá trị người dùng nhập vào từ các ô input
        // .trim() để xóa các khoảng trắng thừa ở đầu và cuối chuỗi
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // 4. Kiểm tra thông tin đăng nhập
        if (username === 'admin' && password === '123') {
            // Nếu đúng, thông báo và chuyển hướng
            //alert('Đăng nhập thành công!');
            // Chuyển hướng đến trang admin dashboard
            window.location.href = '../index.html'; 
        } else if (username === 'cashier' && password === '123') {
            // Nếu đúng, thông báo và chuyển hướng
            //alert('Đăng nhập thành công!');
            // Chuyển hướng đến trang admin dashboard
            window.location.href = '../form/cashier/staff.html'; 
        }else {
            // Nếu sai, hiển thị thông báo lỗi
            errorMessage.textContent = 'Tên tài khoản hoặc mật khẩu không chính xác.';
            errorMessage.style.display = 'block'; // Cho thông báo lỗi hiện ra
        }
    });

});