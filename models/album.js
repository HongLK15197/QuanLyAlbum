export class Album {
    danhSachAlbum = [];

    constructor() {}

    themAlbum(album) {
        this.danhSachAlbum.push(album);
    }

    xoaAlbum(album) {
        let index = this.danhSachAlbum.findIndex((item) => item.id == album);
        if (index !== -1) {
            this.danhSachAlbum.splice(index, 1);
        }
    }

    suaAlbum(album) {
        let index = this.danhSachAlbum.findIndex((item) => item.id == album)
        if (index !== -1) {
            return this.danhSachAlbum[index]

        }
    }

    capNhat(album) {
        let index = this.danhSachAlbum.findIndex((item) => item.id == album)
        return index;
    }

    luuAlbum() {
        //Biến dữ liệu this.danhSachAlbum thành chuỗi lưu storage
        let sAlbum = JSON.stringify(this.danhSachAlbum);
        localStorage.setItem('album', sAlbum);
    }


    layAlbum() {
        //Lấy dữ liệu từ storage gán vào thược tính danhSachAlbum
        if (localStorage.getItem('album')) {
            let menu = JSON.parse(localStorage.getItem('album'));
            this.danhSachAlbum = menu;
        } else {
            this.danhSachAlbum = [];
        }
    }
}