import { useEffect, useState } from "react";
import Card from "../../components/Card";

export default function Menu({
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
            <div
                className={visible ? `flex justify-center items-center` : `hidden`}>
                <div className="p-8 w-[90%] flex justify-center items-center flex-col h-[85vh]">
                    <div className="w-full p-4">
                        <div className="flex items-center">
                            <img
                                src={userData?.team?.picture}
                                className="w-[50px]"
                                alt=""
                            />
                            <b className="text-xl ml-2 italic uppercase">{userData?.team?.name}</b>
                        </div>
                        <p className="py-2 w-[500px]">
                            Contrate jogadores do servidor , evolua sua carta e de seus companheiros  para ter um time cada vez melhor
                        </p>
                    </div>
                    <div className="p-4 flex justify-center items-center">
                        <div className="grid grid-cols-6 w-[60%]">
                            {
                                userData?.team?.stage?.map((card) => (
                                    <Card
                                        cardData={card}
                                        borderColor={colorizeCard(card?.overall)}
                                        key={card.id}
                                    />
                                ))
                            }
                        </div>
                        <div className="w-[40%] p-8">
                            <div className="rounded-md p-8 px-8 bg-[#1e1e1e] shadow-xl">
                                <div className="flex items-center">
                                    <img
                                        src={userData?.team?.picture}
                                        className="w-[50px]"
                                        alt=""
                                    />
                                    <b className="text-xl ml-2 italic uppercase">{userData?.team?.name}</b>
                                </div>
                                <div className="flex justify-around items-center">
                                    <div className="w-[50%]">
                                        <div className="flex items-center">
                                            <img src="/vc-icon.png" className="w-[25px] mr-1" alt="" />
                                            <h2 className="text-6xl font-extrabold text-[#f3e901] italic">3896</h2>
                                        </div>
                                        <p className="text-gray-300 mt-2 px-4 text-center rounded-md w-[140px]">
                                            Valor do Time
                                        </p>
                                    </div>
                                    <div className="w-[50%] flex justify-center">
                                        <h2 className="bg-[#dddddd28] text-center w-[100px] rounded-lg p-4 text-6xl font-bold italic">74</h2>
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