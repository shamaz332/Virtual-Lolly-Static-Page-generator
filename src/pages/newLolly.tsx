import React, { useRef, useState } from 'react'
import { Field, Form, Formik, useFormik } from "formik"
import { Header } from '../component/Header'
import { Lolly } from '../component/lolly'
import * as Yup from "yup"
import { useMutation } from '@apollo/client'
import gql from "graphql-tag"
import Share from "../../src/component/Share"

const ADD_LOLLY = gql`
  mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!,$flavourBottom: String!) {
    createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle,flavourBottom: $flavourBottom) {
        senderName
        recipientName
        message
        lollyPath
    }
  }
  `
const DisplayingErrorMessagesSchema = Yup.object().shape({
    sugarr: Yup.string()
        .min(10, 'Short Sugar message')
        .max(30, 'Long message')
        .required('Required'),
    sender: Yup.string().required("Required").min(10, 'Short Sugar message')
        .max(30, 'Long message'),
    message: Yup.string().required('Required').min(10, 'Short Sugar message')
});



export default function newLolly() {

    const [color1, setColor1] = useState("#d52358")
    const [color2, setColor2] = useState("#e95946")
    const [color3, setColor3] = useState("#deaa43")
    const [createLolly, { data }] = useMutation(ADD_LOLLY);

    const formik = useFormik({
        initialValues: {
            sugarr: '',
            sender: '',
            message: '',
        },
        validationSchema: DisplayingErrorMessagesSchema,
        onSubmit: (values, { resetForm }) => {
            createLolly({
                variables: {
                    flavourTop: color1,
                    flavourMiddle: color2,
                    flavourBottom: color3,
                    recipientName: values.sugarr,
                    senderName: values.sender,
                    message: values.message
                }
            })

            resetForm({
                values: {
                    sugarr: ""
                    , sender: "", message: ""
                }
            })


        },
    });

    return (
        <div className="container">
            <Header />
            <div className="lollyFormDiv">
                <div>
                    <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3} />
                </div>
                {!data ? <> <div className="lollyFlavourDiv">
                <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input
                            type="color"
                            value={color1}
                            className="colorPicker"
                            name="flavourTop"
                            id="flavourTop"
                            onChange={e => {
                                setColor1(e.target.value)
                            }}
                        />
                    </label>
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input
                            type="color"
                            value={color2}
                            className="colorPicker"
                            name="flavourTop"
                            id="flavourTop"
                            onChange={e => {
                                setColor2(e.target.value)
                            }}
                        />
                    </label>
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input
                            type="color"
                            value={color3}
                            className="colorPicker"
                            name="flavourTop"
                            id="flavourTop"
                            onChange={e => {
                                setColor3(e.target.value)
                            }}
                        />
                    </label>
                </div>


                    
                        <form className="lollyFrom" onSubmit={formik.handleSubmit}>
                            <label htmlFor="firstName">To</label>
                            <br /> <input
                                id="sugarr"
                                name="sugarr"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.sugarr}
                            />

                            {formik.errors.sugarr ? <div className="error">{formik.errors.sugarr}</div> : null}
                            <br /> <label htmlFor="message">Message</label>
                            <br /> <textarea
                                id="message"
                                name="message"
                                onChange={formik.handleChange}
                                value={formik.values.message}
                            />
                            <br />
                            {formik.errors.message ? <div className="error">{formik.errors.message}</div> : null}
                            <label htmlFor="sender">From</label>
                            <br />
                            <input
                                id="sender"
                                name="sender"
                                type="sender"
                                onChange={formik.handleChange}
                                value={formik.values.sender}
                            />
                             {formik.errors.sender ? <div className="error">{formik.errors.sender}</div> : null}
              
                        <button type="submit">Freeze lolly</button>
                    </form></> : <Share link={data?.addLolly?.lollyPath} reciever={data?.addLolly?.recipientName} sender={data?.addLolly?.senderName} message={data?.addLolly?.message} />}
            </div>
        </div >
    )
}
