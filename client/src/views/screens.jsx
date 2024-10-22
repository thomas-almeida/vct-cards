
import Menu from "./modules/Menu";
import MyTeam from "./modules/MyTeam";
import Packs from "./modules/Packs"
import OnlineLeague from "./modules/OnlineLeague"
import Market from "./modules/Market"
import Settings from "./modules/Settings"

export default function Screens(
    {
        activeScreen,
        userData,
        packData
    }
) {
    return (
        <>
            {activeScreen === 'menu' && <Menu visible={true} userData={userData} />}
            {activeScreen === 'team' && <MyTeam visible={true} userData={userData} />}
            {activeScreen === 'packs' && <Packs visible={true} userData={userData} packData={packData} />}
            {activeScreen === 'online' && <OnlineLeague visible={true} userData={userData} />}
            {activeScreen === 'market' && <Market visible={true} userData={userData} />}
            {activeScreen === 'settings' && <Settings visible={true} userData={userData} />}
        </>
    )
}