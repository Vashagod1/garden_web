import {UserInfo} from "../components";
import {UserSpecs} from "../components";
import "../styles/Profile.css"

export function Profile() {
    return (
        <div className="profile-wrapper">
            <UserInfo />
            <UserSpecs />
        </div>
    )
}
