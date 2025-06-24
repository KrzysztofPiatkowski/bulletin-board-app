class Post {
    constructor(title, content, date, photo, price, localization, sellerInfo) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.photo = photo;
        this.price = price;
        this.localization = localization;
        this.sellerInfo = sellerInfo;
    }
}

module.exports = Post;