
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios"
import Screens from "./screens";

export default function Home() {

    const [userData, setUserData] = useState('')
    const [packData, setPackData] = useState('')
    const [activeScreen, setActiveScreen] = useState('menu')

    useEffect(() => {

        async function getUserData() {
            let url = window.location
            let userId = new URLSearchParams(url.search).get('id')
            const response = await axios.get(`http://localhost:3002/users/get-user-by-id/${userId}`)

            setUserData(response.data?.user)
        }

        async function getPacks() {
            const response = await axios.get(`http://localhost:3002/packs/get-packs`)
            setPackData(response.data?.packs)
        }

        getUserData()
        getPacks()

    }, [])

    return (
        <>
            <div className="bg-[#141414] text-white flex justify-center items-center h-svh">
                <div className="bg-[#141414] w-[100%]">
                    <div className="">
                        <SideBar
                            userTeamPic={userData?.team?.picture}
                            userTeamName={userData?.team?.name.toUpperCase()}
                            userLevel={userData?.level}
                            userCoins={userData?.coins}
                            userCredits={userData?.credits}
                            userName={userData?.name}
                            setActiveScreen={setActiveScreen}
                            activeScreen={activeScreen}
                        />
                        <Screens
                            activeScreen={activeScreen}
                            userData={userData}
                            packData={packData}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}