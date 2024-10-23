import Card from "../../components/Card";
import colorize from "../../utils/colorize.js";

export default function Menu({
    visible,
    userData
}) {


    return (
        <>
            <div
                className={visible ? `flex justify-center items-center` : `hidden`}>
                <div className="p-8 w-[90%] flex justify-center items-center flex-col h-[85vh]">
                    <div className="w-full p-4">
                        <div className="flex items-center">
                            <img
                                src={userData?.team?.picture}
                                className="w-[30px]"
                                alt=""
                            />
                            <b className="text-xl ml-2 italic uppercase">{userData?.team?.name}</b>
                        </div>
                        <p className="py-2 w-[500px]">
                            Contrate jogadores do servidor , evolua sua carta e de seus companheiros  para ter um time cada vez melhor
                        </p>
                    </div>
                    <div className="p-4 flex justify-center items-center">
                        <div className="grid grid-cols-6 w-[70%] mr-6">
                            {
                                userData?.team?.stage?.map((card) => (
                                    <Card
                                        cardData={card}
                                        borderColor={colorize.colorizeItem(card?.overall)}
                                        key={card.id}
                                        inStage={false}
                                    />
                                ))
                            }
                        </div>
                        <div className="w-[30%]">
                            <div className="rounded-md p-4 px-8 bg-[#1e1e1e] shadow-xl my-4">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={userData?.team?.picture}
                                        className="w-[30px]"
                                        alt=""
                                    />
                                    <b className="text-xl ml-2 italic uppercase">{userData?.team?.name}</b>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-[50%] flex justify-center items-center flex-col">
                                        <div className="flex items-center">
                                            <h2 className="text-5xl font-extrabold text-[#f3e901] italic">{userData?.team?.value}</h2>
                                            <img src="/vc-icon.png" className="w-[25px] ml-1" alt="" />
                                        </div>
                                        <p className="text-gray-300 mt-2 text-sm text-left rounded-md w-[140px]">
                                            Valor do Time
                                        </p>
                                    </div>
                                    <div className="w-[50%] flex justify-center items-center flex-col">
                                        <h2
                                            style={{
                                                borderColor: colorize.colorizeItem(userData?.team?.overall.toFixed(0)),
                                                color: colorize.colorizeItem(userData?.team?.overall.toFixed(0))
                                            }}
                                            className="bg-[#dddddd0b] border-2 text-center w-[100px] p-4 text-5xl font-bold italic rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none"
                                        >
                                            {userData?.team?.overall.toFixed(0)}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-md p-4 bg-[#1e1e1e] shadow-xl my-4">
                                <div className="text-center">
                                    <h2 className="font-bold italic">VUT WL - SEMANA #1</h2>
                                </div>
                                <div className="flex justify-around items-center">
                                    <div className="text-center w-[50%] flex justify-center items-center flex-col py-2">
                                        <img
                                            src={userData?.team?.picture}
                                            className="w-[70px]"
                                            alt=""
                                        />
                                        <b className="text-xl ml-2 italic uppercase">{userData?.team?.name}</b>
                                    </div>
                                    <div className="text-center italic font-bold">
                                        <h2>VS</h2>
                                    </div>
                                    <div className="text-center w-[50%] flex justify-center items-center flex-col py-2 cursor-pointer">
                                        <img
                                            src={userData?.team?.picture}
                                            className="w-[70px]"
                                            alt=""
                                        />
                                        <b className="text-xl ml-2 italic uppercase">{userData?.team?.name}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}