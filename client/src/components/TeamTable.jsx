export default function TeamTable({
    teamData,
    userData,
    teamPosition
}) {

    const bestPlayer = teamData?.team?.stage?.reduce((maxPlayer, player) =>
        player.overall > maxPlayer.overall ? player : maxPlayer,
        teamData?.team?.stage[0])


    // Função utilitária para converter em float e garantir que seja um número válido
    const parseFloatSafe = (value) => parseFloat(value) || 0;

    // Somar e tirar a média de ACS
    const totalACS = teamData?.team?.stage?.reduce((sum, player) => sum + parseFloatSafe(player.acs), 0);
    const averageACS = totalACS / teamData?.team?.stage?.length;

    // Somar e tirar a média de KAST
    const totalKAST = teamData?.team?.stage?.reduce((sum, player) => sum + parseFloatSafe(player.kast), 0);
    const averageKAST = totalKAST / teamData?.team?.stage?.length;

    // Somar e tirar a média de KD
    const totalKD = teamData?.team?.stage?.reduce((sum, player) => sum + parseFloatSafe(player.kd), 0);
    const averageKD = totalKD / teamData?.team?.stage?.length;

    // Somar e tirar a média de ADR
    const totalADR = teamData?.team?.stage?.reduce((sum, player) => sum + parseFloatSafe(player.adr), 0);
    const averageADR = totalADR / teamData?.team?.stage?.length;

    return (
        <>
            <li className={`${teamData?.team?.id === userData?.team?.id ? 'border-2 border-green-500' : ''} flex justify-start items-center p-4 rounded-md m-2 bg-[#1a1a1a] shadow-lg cursor-pointer transition hover:scale-[1.05]`}>
                <p className="font-bold px-2">{teamPosition}</p>
                <img
                    src={teamData?.team?.picture}
                    className="w-[50px] mx-2"
                />
                <div className="mx-4">
                    {bestPlayer && (
                        <img
                            src={bestPlayer?.playerPicture}
                            alt={bestPlayer?.name}
                            className="w-[64px]"
                        />
                    )}
                </div>
                <div className="mx-2 w-[100px] overflow-hidden overflow-ellipsis">
                    <h2 className="text-xl italic font-bold">{teamData?.team?.name}</h2>
                    <p className="text-sm font-thin italic text-blue-400">@{teamData?.name}</p>
                </div>

                <ul className="grid grid-cols-4 justify-center items-center">
                    <li className="mx-2 text-center">
                        <p className="font-bold italic">ACS</p>
                        <p>{averageACS.toFixed(1)}</p>
                    </li>
                    <li className="mx-2 text-center">
                        <p className="font-bold italic">KAST</p>
                        <p>{averageKAST.toFixed(1)}</p>
                    </li>
                    <li className="mx-2 text-center">
                        <p className="font-bold italic">ADR</p>
                        <p>{averageADR.toFixed(1)}</p>
                    </li>
                    <li className="mx-2 text-center">
                        <p className="font-bold italic">KD</p>
                        <p>{averageKD.toFixed(1)}</p>
                    </li>
                </ul>
                <div
                    className="border border-[#dddddd60] p-2 bg-[#dddddd1c] rounded-md w-[50px] text-center mx-1"
                >
                    <p className="text-lg font-semibold italic">
                        {teamData?.team?.overall.toFixed(0)}
                    </p>
                </div>
            </li>
        </>
    )
}