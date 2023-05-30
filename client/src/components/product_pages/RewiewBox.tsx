const RewiewBox = (props: any) => {
    let rewiew = props.rewiew;
    let rating = props.rating;

    let array: any[] = []

    for(let i = 0; i < rating; i++){
        array.push(<div key={i} className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>)
    }

    return (
        <>
            <div className="bg-slate-200 w-96 p-2 flex items-center justify-between my-1">
                <h1 className="text-zinc-950 w-2/3">{rewiew}</h1>
                <div className="flex items-center justify-end w-1/3">{array}<p className="text-xl">/ 5</p></div>
            </div>
        </>
    )
}

export default RewiewBox;