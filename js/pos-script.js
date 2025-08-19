document.addEventListener('DOMContentLoaded', function() {
    
    const menuItems = document.querySelectorAll('.menu-item');
    const orderTabsContainer = document.querySelector('.order-tabs');
    const orderDetailsContainer = document.querySelector('.order-details-container');
    const addOrderBtn = document.getElementById('add-order-btn');
    let orderCounter = 37; // Bắt đầu đếm hóa đơn mới từ số này

    // --- HÀM CHUYỂN TAB ---
    function switchTab(tab) {
        // Bỏ active ở tất cả các tab và content
        document.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.order-details').forEach(c => c.classList.remove('active'));

        // Thêm active cho tab và content được chọn
        const orderId = tab.dataset.orderId;
        tab.classList.add('active');
        document.querySelector(`.order-details[data-order-id="${orderId}"]`).classList.add('active');
    }

    // Gắn sự kiện click cho các tab đã có sẵn
    document.querySelectorAll('.order-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
    });

    // --- HÀM THÊM MÓN VÀO HÓA ĐƠN ---
    function addItemToActiveOrder(name, price) {
        const activeOrderDetails = document.querySelector('.order-details.active');
        if (!activeOrderDetails) {
            alert('Vui lòng chọn hoặc tạo một hóa đơn trước!');
            return;
        }
        
        const orderList = activeOrderDetails.querySelector('.order-list');
        const existingItem = Array.from(orderList.children).find(li => li.dataset.name === name);

        if (existingItem) {
            // Tăng số lượng nếu món đã tồn tại
            const quantityInput = existingItem.querySelector('input');
            quantityInput.value = parseInt(quantityInput.value) + 1;
        } else {
            // Thêm món mới nếu chưa có
            const li = document.createElement('li');
            li.dataset.name = name;
            li.dataset.price = price;
            li.innerHTML = `
                <div class="item-details">
                    <span class="name">${name}</span>
                    <span class="price">@ ${price.toLocaleString('vi-VN')}đ</span>
                </div>
                <div class="item-quantity">
                    <button class="qty-btn minus">-</button>
                    <input type="text" value="1" readonly>
                    <button class="qty-btn plus">+</button>
                </div>
                <div class="item-total-price">${price.toLocaleString('vi-VN')}đ</div>
                <button class="remove-item-btn"><i class="fa-solid fa-xmark"></i></button>
            `;
            orderList.appendChild(li);
        }
        updateOrderTotal(activeOrderDetails);
    }
    
    // Gắn sự kiện click cho các món trong menu
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.dataset.name;
            const price = parseFloat(item.dataset.price);
            addItemToActiveOrder(name, price);
        });
    });

    // --- HÀM CẬP NHẬT TỔNG TIỀN ---
    function updateOrderTotal(orderDetails) {
        const orderList = orderDetails.querySelector('.order-list');
        let subtotal = 0;
        orderList.querySelectorAll('li').forEach(item => {
            const price = parseFloat(item.dataset.price);
            const quantity = parseInt(item.querySelector('input').value);
            const itemTotal = price * quantity;
            item.querySelector('.item-total-price').textContent = itemTotal.toLocaleString('vi-VN') + 'đ';
            subtotal += itemTotal;
        });
        
        orderDetails.querySelector('.subtotal').textContent = subtotal.toLocaleString('vi-VN') + 'đ';
        // Logic giảm giá có thể thêm ở đây
        const discount = 0; // Giả sử
        orderDetails.querySelector('.discount').textContent = `-${discount.toLocaleString('vi-VN')}đ`;
        orderDetails.querySelector('.final-total').textContent = (subtotal - discount).toLocaleString('vi-VN') + 'đ';
    }
    
    // --- SỰ KIỆN CHO CÁC NÚT TRONG HÓA ĐƠN (Tăng/giảm/xóa) ---
    orderDetailsContainer.addEventListener('click', function(e) {
        const activeOrderDetails = document.querySelector('.order-details.active');
        const target = e.target;
        
        // Nút xóa món
        if (target.closest('.remove-item-btn')) {
            target.closest('li').remove();
            updateOrderTotal(activeOrderDetails);
        }
        
        // Nút tăng/giảm số lượng
        const quantityInput = target.parentElement.querySelector('input');
        if (target.classList.contains('plus')) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateOrderTotal(activeOrderDetails);
        }
        if (target.classList.contains('minus')) {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            } else {
                 // Nếu số lượng là 1 mà nhấn trừ thì xóa món
                target.closest('li').remove();
            }
            updateOrderTotal(activeOrderDetails);
        }
    });

    // --- HÀM TẠO HÓA ĐƠN MỚI ---
    addOrderBtn.addEventListener('click', function() {
        const newOrderId = 'hd' + orderCounter;
        
        // 1. Tạo tab mới
        const newTab = document.createElement('li');
        newTab.className = 'order-tab';
        newTab.dataset.orderId = newOrderId;
        newTab.textContent = `Hóa đơn #${orderCounter}`;
        newTab.addEventListener('click', () => switchTab(newTab));
        orderTabsContainer.appendChild(newTab);
        
        // 2. Tạo khung chi tiết hóa đơn mới
        const newDetails = document.createElement('div');
        newDetails.className = 'order-details';
        newDetails.dataset.orderId = newOrderId;
        newDetails.innerHTML = `
            <ul class="order-list">
                <!-- Trống, chờ thêm món -->
            </ul>
            <div class="order-footer">
                <div class="total-section">
                    <div class="line"><span>Tạm tính</span><span class="subtotal">0đ</span></div>
                    <div class="line"><span>Giảm giá</span><span class="discount">0đ</span></div>
                    <div class="line total"><span>THÀNH TIỀN</span><span class="final-total">0đ</span></div>
                </div>
                <div class="order-actions">
                    <button class="btn btn-secondary"><i class="fa-solid fa-print"></i> In hóa đơn</button>
                    <button class="btn btn-primary"><i class="fa-solid fa-credit-card"></i> Thanh toán</button>
                </div>
            </div>
        `;
        orderDetailsContainer.appendChild(newDetails);
        
        // 3. Tự động chuyển sang tab mới tạo
        switchTab(newTab);
        
        orderCounter++;
    });

});