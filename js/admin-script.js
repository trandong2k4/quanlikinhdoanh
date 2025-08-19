document.addEventListener('DOMContentLoaded', function() {
    
    // Logic cho modal Thêm/Sửa sản phẩm
    const productModal = document.getElementById('product-modal');
    const addProductBtn = document.getElementById('add-product-btn');
    const closeBtn = document.querySelector('#product-modal .close-btn');
    const cancelProductBtn = document.getElementById('cancel-product-btn');

    // Mở modal
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            productModal.style.display = 'flex';
        });
    }

    // Đóng modal
    function closeProductModal() {
        if(productModal) productModal.style.display = 'none';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
    if (cancelProductBtn) cancelProductBtn.addEventListener('click', closeProductModal);
    
    window.addEventListener('click', function(event) {
        if (event.target == productModal) {
            closeProductModal();
        }
    });

    // Xử lý các nút sửa/xóa (ví dụ)
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => {
            // Logic để lấy dữ liệu từ dòng và đổ vào form
            alert('Mở form sửa sản phẩm!');
            if (productModal) productModal.style.display = 'flex';
        });
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
                // Logic xóa
                console.log('Xóa sản phẩm');
            }
        });
    });
});


// Thêm vào trong hàm DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ... (code cho modal sản phẩm đã có ở trên) ...

    // --- LOGIC CHO MODAL KHUYẾN MÃI ---
    const promoModal = document.getElementById('promo-modal');
    const addPromoBtn = document.getElementById('add-promo-btn');
    const closePromoBtn = document.querySelector('#promo-modal .close-btn');
    const cancelPromoBtn = document.getElementById('cancel-promo-btn');

    // Mở modal
    if (addPromoBtn) {
        addPromoBtn.addEventListener('click', () => {
            if (promoModal) promoModal.style.display = 'flex';
        });
    }

    // Đóng modal
    function closePromoModal() {
        if (promoModal) promoModal.style.display = 'none';
    }

    if (closePromoBtn) closePromoBtn.addEventListener('click', closePromoModal);
    if (cancelPromoBtn) cancelPromoBtn.addEventListener('click', closePromoModal);

    window.addEventListener('click', function(event) {
        if (event.target == promoModal) {
            closePromoModal();
        }
    });

    // Xử lý các nút khác
    document.querySelectorAll('.btn-delete i.fa-power-off').forEach(button => {
        button.parentElement.addEventListener('click', () => {
             if (confirm('Bạn có muốn tạm dừng chương trình khuyến mãi này?')) {
                // Logic tạm dừng
                console.log('Tạm dừng khuyến mãi.');
            }
        });
    });

});


document.addEventListener('DOMContentLoaded', function() {
    
    // --- LOGIC CHO TRANG THÔNG TIN QUÁN ---
    const logoInput = document.getElementById('logo-input');
    const logoPreview = document.getElementById('logo-preview');
    if (logoInput) {
        logoInput.addEventListener('change', function(event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    logoPreview.src = e.target.result;
                }
                reader.readAsDataURL(event.target.files[0]);
            }
        });
    }

    const shopInfoForm = document.getElementById('shop-info-form');
    if(shopInfoForm) {
        shopInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Đã lưu thông tin quán thành công!');
        });
    }

    // --- LOGIC CHO TRANG PHÂN QUYỀN (MODAL) ---
    const roleModal = document.getElementById('role-modal');
    const addRoleBtn = document.getElementById('add-role-btn');
    const closeRoleBtn = document.querySelector('#role-modal .close-btn');
    const cancelRoleBtn = document.getElementById('cancel-role-btn');
    const roleForm = document.getElementById('role-form');

    function openRoleModal() {
        if(roleModal) roleModal.style.display = 'flex';
    }

    function closeRoleModal() {
        if(roleModal) roleModal.style.display = 'none';
    }

    if(addRoleBtn) addRoleBtn.addEventListener('click', openRoleModal);
    if(closeRoleBtn) closeRoleBtn.addEventListener('click', closeRoleModal);
    if(cancelRoleBtn) cancelRoleBtn.addEventListener('click', closeRoleModal);
    
    window.addEventListener('click', function(event) {
        if (event.target == roleModal) {
            closeRoleModal();
        }
    });
    
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            // Logic để lấy dữ liệu vai trò và điền vào form
            document.getElementById('modal-title').textContent = 'Sửa vai trò';
            openRoleModal();
        });
    });

    if(roleForm) {
        roleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Đã lưu vai trò thành công!');
            closeRoleModal();
        });
    }
});