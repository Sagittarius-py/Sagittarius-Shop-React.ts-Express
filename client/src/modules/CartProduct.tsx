const CartProduct = (props: any) => {
    let style = { backgroundImage: `url(${require(`../images/banner_images/643e7dd1f92a66e84d6d4198.jpg`)})` }
    return(
    <div className="w-4/5 h-20  rounded-xl flex overflow-hidden items-center px-2 bg-zinc-100">
        <div style={style} className="h-16 w-16 bg-cover bg-center rounded-full"></div>
        <div className="w-3/5 pl-6">
            <h1>Lorem</h1>
            <input type="number" className="w-12" defaultValue="1" min="1" max=""></input>
        </div>
        <div>
            <h1 className="text-xl">Price</h1>
        </div>
    </div>
    )
}

export default CartProduct;