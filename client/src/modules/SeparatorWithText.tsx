const HorizontalSeparator = (props: any) => {
    return (
        <>
            <div className={`h-[1px] w-full flex  items-center ${props.className} my-4`}>
                <h1 className="text-white bg-zinc-800 px-2 mx-4">{props.text}</h1>
            </div>
        </>
    )
}

export {HorizontalSeparator}