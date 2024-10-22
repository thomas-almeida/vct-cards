import Card from "../../components/Card"

export default function MyTeam({
    visible,
    userData
}) {


    function colorizeCard(overall) {

        if (overall === undefined) {
            return '#f53c3d'
        } else if (overall <= 30) {
            return '#bf868f'
        } else if (overall > 30 && overall <= 50) {
            return '#a7c6cc'
        } else if (overall > 50 && overall <= 75) {
            return '#e6bc5c'
        } else if (overall > 75 && overall <= 85) {
            return '#5ee790'
        } else if (overall > 85 && overall <= 88) {
            return '#3ecbff'
        } else if (overall > 88) {
            return '#f53c3d'
        }
    }

    return (
        <>
            <div className={visible ? `flex justify-center items-center` : `hidden`}>
                <div className="p-8 w-[90%] flex justify-around items-center flex-col h-[85vh] overflow-y-scroll">
                    <div className="flex justify-center items-center">
                        <div className="flex justify-center items-center flex-col">
                            <div className="flex items-center mb-6">
                                <img
                                    src={userData?.team?.picture}
                                    className="w-[30px] mr-2"
                                    alt=""
                                />
                                <h2 className="text-2xl font-bold">
                                    {userData?.team?.name}
                                </h2>
                            </div>
                            <div className="grid grid-cols-10 w-[80%]">
                                {
                                    userData?.team?.players?.map((card) => (
                                        <Card
                                            cardData={card}
                                            borderColor={colorizeCard(card?.overall)}
                                            key={card.id}
                                            inStage={card.inStage}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}