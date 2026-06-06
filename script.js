// 1. Khởi tạo cầu nối giao tiếp nội bộ
const eraWidget = new ERaWidget();

// Tạo 2 biến để hứng cấu hình từ ERa truyền xuống
let onLight = null;
let offLight = null;

// Khởi tạo và tự động lấy cấu hình từ IFrame With Config
eraWidget.init({
    onConfiguration: (configuration) => {
        // Lấy hành động số 1 (Bật) và số 2 (Tắt) từ mảng actions
        onLight = configuration.actions[0];
        offLight = configuration.actions[1];
        console.log("Đã tải xong cấu hình từ ERa:", configuration);
    },
    onValues: (values) => {
        // Nơi nhận giá trị cập nhật từ mạch thật gửi lên (nếu có)
    }
});

// 2. Hàm xử lý nút bấm trên web
function toggleDevice(id) {
    const deviceItem = document.getElementById(`device-${id}`);
    const statusText = document.getElementById(`status-${id}`);
    const isChecked = event.target.checked;

    if (isChecked) {
        // Hành động khi BẬT
        deviceItem.classList.add('active');
        statusText.innerText = "Đang bật";
        
        // Nếu là công tắc Đèn Phòng Khách (id = 1) và đã có cấu hình Bật
        if (id === 1 && onLight) {
            eraWidget.triggerAction(onLight.action, null); 
            console.log("Đã gửi lệnh BẬT theo cấu hình IFrame");
        }
    } else {
        // Hành động khi TẮT
        deviceItem.classList.remove('active');
        statusText.innerText = "Đang tắt";
        
        // Nếu là công tắc Đèn Phòng Khách (id = 1) và đã có cấu hình Tắt
        if (id === 1 && offLight) {
            eraWidget.triggerAction(offLight.action, null);
            console.log("Đã gửi lệnh TẮT theo cấu hình IFrame");
        }
    }
}