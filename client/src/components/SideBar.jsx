export default function SideBar(
    {
        setActiveScreen,
        activeScreen,
        userTeamPic,
        userTeamName,
        userCoins,
        userCredits,
        userLevel,
        userName
    }
) {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-[90%] rounded-xl flex justify-around items-center bg-[#1E1E1E] shadow-lg">
                <div className=" text-gray-400 flex justify-start items-center w-[70%]">
                    <ul className="flex items-center justify-center">
                        <li
                            className={`p-2 px-4 my-2 mr-10 cursor-pointer text-lg text-white font-bold`}
                            onClick={() => setActiveScreen('menu')}
                        >
                            <a href="#" className="font-bold italic">VUT</a>
                        </li>
                        <li
                            className={`p-2 px-4 my-2 cursor-pointer font-bold text-lg hover:text-white hover:font-bold  ${activeScreen === 'menu' ? 'text-white font-bold' : ''}`}
                            onClick={() => setActiveScreen('menu')}
                        >
                            <a href="#">Início</a>
                        </li>
                        <li
                            className={`p-2 px-4 my-2 cursor-pointer font-bold text-lg hover:text-white hover:font-bold  ${activeScreen === 'team' ? 'text-white font-bold' : ''}`}
                            onClick={() => setActiveScreen('team')}
                        >
                            <a href="#">Meu Time</a>
                        </li>
                        <li
                            className={`p-2 px-4 my-2 cursor-pointer font-bold text-lg hover:text-white hover:font-bold  ${activeScreen === 'packs' ? 'text-white font-bold' : ''}`}
                            onClick={() => setActiveScreen('packs')}
                        >
                            <a href="#">Pacotes</a>
                        </li>
                        <li
                            className={`p-2 px-4 my-2 cursor-pointer font-bold text-lg hover:text-white hover:font-bold  ${activeScreen === 'market' ? 'text-white font-bold' : ''}`}
                            onClick={() => setActiveScreen('market')}
                        >
                            <a href="#">Mercado</a>
                        </li>
                        <li
                            className={`p-2 px-4 my-2 cursor-pointer font-bold text-lg hover:text-white hover:font-bold  ${activeScreen === 'online' ? 'text-white font-bold' : ''}`}
                            onClick={() => setActiveScreen('online')}
                        >
                            <a href="#">Competir</a>
                        </li>
                        <li
                            className={`p-2 px-4 my-2 cursor-pointer font-bold text-lg hover:text-white hover:font-bold  ${activeScreen === 'settings' ? 'text-white font-bold' : ''}`}
                            onClick={() => setActiveScreen('settings')}
                        >
                            <a href="#">Configurações</a>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-start items-center px-4">
                    <div className="text-right">
                        <div className="flex items-center font-normal">
                            <p className="mr-4 border px-2 rounded-md">GC {userCoins}</p>
                            <p className="mr-4 border px-2 rounded-md">UC {userCredits}</p>
                            <p className="mr-4 border px-2 rounded-md">LV {userLevel}</p>
                            <p className="font-bold">{userTeamName}</p>
                            <img src={userTeamPic} className="w-[40px] ml-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
