import {useState} from "react"
import {Notify, PersonalInformation, ProfileSideNav, SecuritySettings} from "organisms"
import {PROFILE_ARR} from "utils"

export const ProfileDetails = () => {
  const [selectedLabel, setSelectedLabel] = useState(PROFILE_ARR[0].label)

  const renderContent = () => {
    switch (selectedLabel) {
      case "Profile":
        return <PersonalInformation />
      case "Security Settings":
        return <SecuritySettings />
      case "Notification":
        return <Notify />

      default:
        return null
    }
  }
  return (
    <ProfileSideNav selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel}>
      {renderContent()}
    </ProfileSideNav>
  )
}
