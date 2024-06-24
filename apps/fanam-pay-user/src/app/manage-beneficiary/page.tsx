// "use client"

// import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
// import {BaseContainer, CreateBeneficiary, ManageMembers} from "organisms"
// import {useHandler} from "./handler"
// import styles from "./page.module.sass"

// const ManageBeneficiary = () => {
//   const {toggleNotify} = useNotifyPopup()
//   const {beneficiaryList, onNav, isSliderVisible, setIsSliderVisible, onRouteToOptions, onChangeSearch, mutate} =
//     useHandler(onSuccess, () => {})

//   function onSuccess() {
//     toggleNotify({
//       type: "success",
//       title: "Beneficiary added",
//       description: "Beneficiary added successfully",
//     })
//   }

//   return (
//     <BaseContainer
//       header={"Manage Beneficiary"}
//       addButton="Add"
//       childWrapper={styles.page_container}
//       onClick={onNav}
//       backIcon
//       stepIndex={4}>
//       <CreateBeneficiary
//         isVisible={isSliderVisible}
//         setIsVisible={setIsSliderVisible}
//         title="Add New Benificiary"
//         wrapperClass={styles.slider_card}
//         onClickCreate={mutate}
//       />
//       <ManageMembers
//         recipients={beneficiaryList}
//         title="Saved Beneficiary"
//         placeHolderName="Search beneficiary..."
//         onChangeSearch={onChangeSearch}
//         onAddButton={() => setIsSliderVisible(true)}
//       />
//     </BaseContainer>
//   )
// }

// export default ManageBeneficiary
