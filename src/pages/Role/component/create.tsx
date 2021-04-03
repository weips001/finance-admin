import React from 'react';
import { Button, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import {add} from '../service'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreateModal = () => {
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建角色"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建角色
        </Button>
      }
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        add(values)
        message.success('提交成功');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="角色名称"
          tooltip="最长为 24 位"
          placeholder="请输入角色名称"
        />

        {/* <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" /> */}
      </ProForm.Group>
      {/* <ProForm.Group>
        <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
        <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          width="xs"
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '履行完终止',
            },
          ]}
          name="unusedMode"
          label="合同约定失效效方式"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
      <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" /> */}
    </ModalForm>
  )
}
export default CreateModal
