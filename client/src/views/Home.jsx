import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios"

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
            <div className="text-white flex items-center h-svh">
                <SideBar
                    userTeamPic={userData?.team?.picture}
                    userTeamName={userData?.team?.name.toUpperCase()}
                    userLevel={userData?.level}
                    userCoins={userData?.coins}
                    userCredits={userData?.credits}
                />
                <div className="bg-[#0f0f0f] w-[100%] h-svh p-12 flex items-center justify-center">
                    <h1>Menu</h1>
                </div>
            </div>
        </>
    )
}