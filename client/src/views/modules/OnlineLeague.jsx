import TeamTable from "../../components/TeamTable";

export default function OnlineLeague({
    visible,
    userData,
    teamsData
}) {

    const sortedTeams = teamsData?.sort((a,b) => b.team.overall - a.team.overall)

    return (
        <>
            <div className={visible ? `flex justify-center items-center` : `hidden`}>
                <div className="p-8 w-[90%] flex justify-center items-center h-[85vh]">
                    <div
                        className="p-4 rounded-md"
                    >
                        <ul className="grid grid-cols-2">
                            <div>
                                {
                                    sortedTeams?.slice(0, 7)?.map((user, index) => (
                                        <TeamTable
                                            key={index}
                                            teamData={user}
                                            userData={userData}
                                            teamPosition={index + 1}
                                        />
                                    ))
                                }
                            </div>
                            <div>
                                {
                                    sortedTeams?.slice(7)?.map((user, index) => (
                                        <TeamTable
                                            key={index + 7}
                                            teamData={user}
                                            userData={userData}
                                            teamPosition={8 + index}
                                        />
                                    ))
                                }
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}