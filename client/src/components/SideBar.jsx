export default function SideBar(
    {
        setActiveScreen,
        userTeamPic,
        userTeamName,
        userCoins,
        userCredits,
        userLevel
    }
) {
    return (
        <div className="bg-[#1d1d1d] h-svh w-[350px]">
            <div className="flex items-center px-4 py-6">
                <img
                    src={userTeamPic}
                    className="w-[50px] mr-3"
                />
                <div className="">
                    <div className="flex items-center">
                        <h2 className="whitespace-nowrap overflow-hidden text-ellipsis w-[110px] mr-1 font-bold text-xl">
                            {userTeamName}
                        </h2>
                    </div>
                    <div className="flex items-center font-normal">
                        <p className="mr-4">GC {userCoins}</p>
                        <p className="mr-4">UC {userCredits}</p>
                        <b className="border border-gray-500 px-3 rounded-sm font-medium text-sm text-gray-300">
                            LV {userLevel}
                        </b>
                    </div>
                </div>
            </div>
            <div className="px-4 mt-8">
                <ul>
                    <li
                        className="p-2 my-2 cursor-pointer font-normal text-lg hover:font-bold"
                        onClick={() => setActiveScreen('menu')}
                    >
                        <a href="#">Início</a>
                    </li>
                    <li
                        className="p-2 my-2 cursor-pointer font-normal text-lg hover:font-bold"
                        onClick={() => setActiveScreen('team')}
                    >
                        <a href="#">Meu Time</a>
                    </li>
                    <li
                        className="p-2 my-2 cursor-pointer font-normal text-lg hover:font-bold"
                        onClick={() => setActiveScreen('packs')}
                    >
                        <a href="#">Pacotes</a>
                    </li>
                    <li
                        className="p-2 my-2 cursor-pointer font-normal text-lg hover:font-bold"
                        onClick={() => setActiveScreen('online')}
                    >
                        <a href="#">Online League</a>
                    </li>
                    <li
                        className="p-2 my-2 cursor-pointer font-normal text-lg hover:font-bold"
                        onClick={() => setActiveScreen('market')}
                    >
                        <a href="#">Mercado</a>
                    </li>
                    <li
                        className="p-2 my-2 cursor-pointer font-normal text-lg hover:font-bold"
                        onClick={() => setActiveScreen('settings')}
                    >
                        <a href="#">Configurações</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
