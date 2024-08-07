
import Menu from "./modules/Menu";
import MyTeam from "./modules/MyTeam";
import Packs from "./modules/Packs"
import OnlineLeague from "./modules/OnlineLeague"
import Market from "./modules/Market"
import Settings from "./modules/Settings"

export default function Screens({ activeScreen }) {
    return (
        <>
            {activeScreen === 'menu' && <Menu visible={true} />}
            {activeScreen === 'team' && <MyTeam visible={true} />}
            {activeScreen === 'packs' && <Packs visible={true} />}
            {activeScreen === 'online' && <OnlineLeague visible={true} />}
            {activeScreen === 'market' && <Market visible={true} />}
            {activeScreen === 'settings' && <Settings visible={true} />}
        </>
    )
}