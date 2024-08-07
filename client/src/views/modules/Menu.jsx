export default function Menu(props) {

    return (
        <>
            <div className={props.visible ? `block` : `hidden`}>
                <h1>Menu</h1>
            </div>
        </>
    )
}