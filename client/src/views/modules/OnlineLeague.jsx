export default function OnlineLeague(props) {

    return (
        <>
            <div className={props.visible ? `flex justify-center items-center` : `hidden`}>
                <div className="p-8 w-[90%] flex justify-center items-center h-[85vh]">
                    <h1>Online</h1>
                </div>
            </div>
        </>
    )
}