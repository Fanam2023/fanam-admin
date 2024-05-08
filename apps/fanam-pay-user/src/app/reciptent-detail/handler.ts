import {useEffect, useState} from "react"
import {JSONObject} from "@cd-pkg/core-utils"

const useCreateReciptent = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const [data, setData] = useState({
    name: "",
    student_name: "",
    course_name: "",
    course_code: "",
    course_duration: "",
    email: "",
    address: "",
    providence: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
  })

  const {
    name,
    student_name,
    course_name,
    course_code,
    course_duration,
    email,
    address,
    providence,
    state,
    city,
    pincode,
    phone,
  } = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errName: "",
    errImage: "",
    errInput: "",
    errCouseName: "",
    errCourseCode: "",
    errCourseDuration: "",
    errEmail: "",
    errAddress: "",
    errProvidence: "",
    errPlace: "",
    errCity: "",
    errPincode: "",
    errPhone: "",
  })

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {
      errName: "",
      errInput: "",
      errImage: "",
      errCouseName: "",
      errCourseCode: "",
      errCourseDuration: "",
      errEmail: "",
      errAddress: "",
      errProvidence: "",
      errPlace: "",
      errCity: "",
      errPincode: "",
      errPhone: "",
      isValid: true,
    }
    if (!name) errState = {...errState, errName: "Please enter University Name", isValid: false}

    if (!student_name) errState = {...errState, errInput: "Please enter Student Name", isValid: false}

    if (!course_name) errState = {...errState, errCouseName: "Please enter Course Name", isValid: false}

    if (!course_code) errState = {...errState, errCourseCode: "Please enter Course Code", isValid: false}

    if (!course_duration)
      errState = {...errState, errCourseDuration: "Please enter Course Duration Code", isValid: false}

    if (!email) errState = {...errState, errEmail: "Please enter your Email", isValid: false}

    if (!address) errState = {...errState, errAddress: "Please enter University Address", isValid: false}

    if (!providence) errState = {...errState, errProvidence: "Please enter Providence", isValid: false}

    if (!state) errState = {...errState, errPlace: "Please enter Your State", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter Your City/District", isValid: false}

    if (!pincode) errState = {...errState, errPincode: "Please enter Your Pincode", isValid: false}

    if (!phone) errState = {...errState, errPhone: "Please enter Your Phone Number", isValid: false}

    return errState
  }

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onChangeData = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onSubmit = () => {
    const errState = {...onValidate(), isClicked: true}
    const {isValid} = errState
    setErrState(errState)
    if (isValid) onSuccess("Form submitted successfully!")
    else onFailure("Form submission failed. Please check your inputs.")
  }

  return {
    errState,
    onChangeData,
    onSubmit,
    data,
  }
}

export default useCreateReciptent
