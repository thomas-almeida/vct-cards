export default function Market(props) {

    return (
        <>
            <div className={props.visible ? `flex justify-center items-center` : `hidden`}>
                <div className="p-8 w-[90%] flex justify-center items-center h-[85vh]">
                    <h1>Market</h1>
                </div>
            </div>
        </>
    )
}