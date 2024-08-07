
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios"

import Menu from "./Menu";

export default function Home() {

    const [userData, setUserData] = useState('')

    useEffect(() => {

        async function getUserData() {
            let url = window.location
            let userId = new URLSearchParams(url.search).get('id')
            const response = await axios.get(`http://localhost:3002/users/get-user-by-id/${userId}`)

            setUserData(response.data?.user)
        }

        getUserData()

    }, [])

    return (
        <>
            <div className="bg-[#0f0f0f] text-white flex items-center h-svh">
                <SideBar
                    userTeamPic={userData?.team?.picture}
                    userTeamName={userData?.team?.name.toUpperCase()}
                    userLevel={userData?.level}
                    userCoins={userData?.coins}
                    userCredits={userData?.credits}
                />
                <div className="bg-[#0f0f0f] w-[100%]">
                    <div className="flex items-center px-8 py-3">
                        <h1 className="text-3xl font-bold italic">VUT</h1>
                    </div>
                    <div className="p-8 flex items-center justify-center h-[90vh]">
                        <Menu visible={true} />
                    </div>
                </div>
            </div>
        </>
    )
}