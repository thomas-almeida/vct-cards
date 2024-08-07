export default function Settings(props) {

    return (
        <>
            <div className={props.visible ? `block` : `hidden`}>
                <h1>Settings</h1>
            </div>
        </>
    )
}