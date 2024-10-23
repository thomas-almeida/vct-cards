import Card from "../../components/Card"
import colorize from "../../utils/colorize.js"

export default function MyTeam({
    visible,
    userData
}) {


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
                                            borderColor={colorize.colorizeItem(card?.overall)}
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