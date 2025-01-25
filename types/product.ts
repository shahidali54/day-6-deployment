export interface Product {
    image: any;
    _id : string;
    title : string;
    _type : "product";
    productImage? : {
        asset : {
            _ref : string;
            _type : "image";
        }
    };
    price : number;
    description : string;
    slug : {
        _type : "slug"
        current : string;
    };

    inventory : number;
    
}