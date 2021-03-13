import React from 'react'
import {message} from 'antd'
import BaseForm from '../components/BaseForm'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreatePaymentOrder = () => {
  // const formRef = useRef<FormInstance>()
  const createPayment = async (values: Record<string, any>) => {
      await waitTime()
      console.log(values);
      message.success('提交成功');
  } 
  return <BaseForm formType="create" onFinish={createPayment}  />
}


export default CreatePaymentOrder