export default function MyTeam(props) {

    return (
        <>
            <div className={props.visible ? `block` : `hidden`}>
                <h1>My Team</h1>
            </div>
        </>
    )
}