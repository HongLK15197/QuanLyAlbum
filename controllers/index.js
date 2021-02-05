import { Album } from '../models/album.js';
import { Information } from '../models/info.js';

//tạo object album từ Album
export let album = new Album();

album.layAlbum();
//Sau khi lấy được danh sách album từ local storage
//Viết hàm lấy dữ liệu tử menu hiển thị ra giao diện list album



//======= Thêm Album và xuất ra màn hình ================ 
document.getElementById("btnThemAlbum").onclick = (event) => {

    let albumDetail = new Information();

    // lấy thông tin người dùng nhập từ giao diện đưa vào đối tượng 

    // viết vòng lặp để dom đến các trường input

    let arrInput = document.querySelectorAll('.form-group input,.form-group select');
    for (let input of arrInput) {
        let value = input.value;
        let id = input.id;

        let temp = '';
        albumDetail = {
            ...albumDetail,
            [id]: value,
        }
    }

    var done = true;
    (album.danhSachAlbum.filter((value, index, arr) => {
        for (let temp in value) {
            if (value[temp] == albumDetail["tenAlbum"]) {
                alert("Tạo album mới đê ~~ Album này đã được tạo rồi ~~~");
                clear();
                done = false;
            }
        }
        return;
    }));

    if (done) {
        // hàm for each dùng để set ID riêng biệt cho mỗi object 
        album.danhSachAlbum.forEach((o, i) => o.id = i + 1);
        album.themAlbum(albumDetail);
        album.luuAlbum();
        themAlbumMoi();
    }
}

const themAlbumMoi = () => {
    let albumMoi = '';
    //lấy dữ liệu từ danh sách tạo ra album moi
    for (let info of album.danhSachAlbum) {
        albumMoi +=
            `
        <div class="row">
        <div class="col-md-4">
            <div class="card mb-4 box-shadow">
                <div>Link ảnh: ${info.linkAnh}</div>
                <div class="card-body">
                    <h3>Tên Album: ${info.tenAlbum}</h3>
                    <p class="card-text">Nội dung mô Tả: ${info.moTa}</p>
                    <p class="card-text"> Thể Loại: ${info.theLoai}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-success text-white btn-sm btn-outline-secondary mr-2" onclick="suaAlbum('${info.id}')">Chỉnh sửa</button>
                            <button type="button" class="btn btn-danger text-white btn-sm btn-outline-secondary" onclick="xoaAlbum('${info.id}')">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    document.getElementById('container').innerHTML = albumMoi;
}
if (document.getElementById('container')) {
    themAlbumMoi();
}




//================Sửa và xóa album======================
window.xoaAlbum = (srcAlbum) => {
    album.xoaAlbum(srcAlbum);
    album.luuAlbum();
    album.danhSachAlbum.forEach((o, i) => o.id = i + 1);
    themAlbumMoi();
}

window.suaAlbum = (modify) => {
    let suaAlbumMoi = album.suaAlbum(modify)
    let arrInput = document.querySelectorAll('.form-group input,.form-control');
    for (let toInput in suaAlbumMoi) {
        //duyêt vào object suaAlbumMoi vòng lặp
        for (let input of arrInput) {
            //cho vòng lặp chạy từ input
            let id = input.id;
            //nếu id của object trùng với id của ô trong input
            if (input.id == toInput) {
                //hiển thị lên object hiện tại lên input
                document.getElementById(id).value = suaAlbumMoi[toInput];
                break;
            }
        }
    }
    disabledBtn("btnCapNhatAlbum")
    EnabledBtn("btnThemAlbum");
}


let indexChange = -1;
// hàm lấy vị trí của object hiện tại 
window.capNhat = (a) => {
    indexChange = model.capNhat(a);
}

//======================== Cập nhật =======================================
document.getElementById("btnCapNhatAlbum").onclick = (event) => {

    event.preventDefault();

    let arrInput = document.querySelectorAll('.form-group input,.form-control');
    let albumDetail = new Album;

    album.luuAlbum();
    album.danhSachAlbum.forEach((o, i) => o.id = i + 1);
    themAlbumMoi();

    for (let input of arrInput) {
        let value = input.value;
        let id = input.id;

        let temp = '';
        albumDetail = {
            ...albumDetail,
            [id]: value,
        }
    }

    let done = true;
    //filter mảng chứa dữ liệu album 
    (album.danhSachAlbum.filter((value, index, arr) => {
        for (let temp in value) {
            if (value["tenAlbum"] == albumDetail["tenAlbum"] && index != indexChange) {
                alert("Cập nhật lại album nhé!");
                clear();
                done = false;
                return;
            } else if ((value["moTa"] != albumDetail["moTa"] ||
                    value["linkAnh"] != albumDetail["linkAnh"] ||
                    value["theLoai"] != albumDetail["theLoai"])) {
                done = true;
                return
            }
        }
    }))
    // nếu hàm trên chưa chạy thì -> 
    if (done) {
        album.danhSachAlbum.splice(indexChange, 1);
        //cập nhật lại ID 
        album.danhSachAlbum.forEach((o, i) => o.id = i + 1);
        album.themAlbum(albumDetail);
        album.luuAlbum();
        themAlbumMoi();
        clear();
        EnabledBtn("btnCapNhatAlbum");
        disabledBtn("btnThemAlbum");
    }
}

//clear value trong input
function clear() {
    let input = document.querySelectorAll('.form-group input');
    input.forEach(input => input.value = '');
}

function disabledBtn(x) {
    document.getElementById(x).disabled = false;
}

function EnabledBtn(x) {
    document.getElementById(x).disabled = true;
}